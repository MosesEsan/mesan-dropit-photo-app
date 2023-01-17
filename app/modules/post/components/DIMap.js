import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import {StyleSheet, Platform, Animated, Dimensions, View} from 'react-native';

import MapView from "react-native-map-clustering";

import PhotoCarousel from "../components/PhotoCarousel";

const {width, height} = Dimensions.get("window");
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const CARD_WIDTH = width * 0.4;

function DIMapView(props, parentRef) {
    const {
        data,
        renderItem,
        renderFooter,
        renderMarker,
        onEndReached,
        initialRegion,
        initialCamera
    } = props;

    let mapAnimation = new Animated.Value(0);

    const _map = useRef();
    const carouselRef = useRef();

    //==================================================================================================
    //3 - ACTION HANDLERS
    const onScrollToMarker = ((event) => {
        const markerID = event._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') x = x - SPACING_FOR_CARD_INSET;

        carouselRef.current.scrollTo({x: x, y: 0, animated: true});
    });


    const onAnimateToRegion = ((marker) => {
        _map.current.animateToRegion(
            {
                ...marker,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068
            },
            350
        );
    });

    const interpolations = data.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return {scale};
    });


    //==========================================================================================

    useImperativeHandle(parentRef, () => ({onAnimateToRegion}))

    //==========================================================================================
    // 6 - RENDER VIEW
    return (
        <View style={[styles.mapContainer]}>
            <MapView
                style={styles.map}
                ref={_map}
                initialRegion={initialRegion}
                initialCamera={initialCamera}
                loadingEnabled
                loadingBackgroundColor="white"
                rotateEnabled={false}>
                {data.map((item, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return renderMarker({item, index, scaleStyle, onScrollToMarker})
                })}
            </MapView>
            <PhotoCarousel ref={carouselRef}
                           data={data}
                           renderItem={renderItem}
                           renderFooter={renderFooter}
                           onEndReached={onEndReached}/>
        </View>
    );
}

export default forwardRef(DIMapView);

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0
    },

    map: {
        height: height - 130,
        flex: 1
    }
});
