import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {StyleSheet, Platform, Dimensions, FlatList,} from 'react-native';

import LinearGradient from "react-native-linear-gradient";

const {width} = Dimensions.get("window");

export const BOTTOM_PADDING = 40;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

function Carousel(props, parentRef) {
    const {data, renderItem, renderFooter, onEndReached} = props;

    const scrollTo = ({x=0, y =0, animated=true}) => {
        listRef.current.scrollToOffset({x, y, animated});
    };

    useImperativeHandle(parentRef, () => ({scrollTo}));

    const listRef = useRef();
    return (
        <LinearGradient colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.4)"]} style={[styles.scrollView]}>
            <FlatList
                ref={listRef}
                data={data}
                extraData={data}
                initialNumToRender={10}
                horizontal={true}
                style={{paddingHorizontal: 8}}
                contentContainerStyle={{flexGrow: 1, paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0}}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                keyExtractor={(item, index) => `scroll_card${item['id'].toString()}${index.toString()}`}
                onEndReached={onEndReached}
                onEndReachedThreshold={0}/>
        </LinearGradient>
    );
}

const PhotoCarousel = forwardRef(Carousel);
export default PhotoCarousel;

PhotoCarousel.defaultProps = {
    data: [],
    renderItem: null,
    renderFooter: null,
    onEndReached: null
}

const styles = StyleSheet.create({
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 10,
        paddingBottom: BOTTOM_PADDING,
        shadowColor: "#000000", backgroundColor: "transparent",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});
