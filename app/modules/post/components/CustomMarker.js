import React from "react";
import {StyleSheet, Animated} from "react-native";

import {Marker} from "react-native-maps";
import FastImage from "react-native-fast-image";

import {OutOfRangeView} from "./Card/Card";

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const CustomMarker = ({item, onPress, imageStyle, index}) => {
    let coordinate = {latitude: item.latitude, longitude: item.longitude}
    return (
        <Marker key={index} coordinate={coordinate} onPress={onPress}>
            <Animated.View style={styles.container}>
                <AnimatedFastImage
                    source={{
                        uri: item.image,
                        cache: FastImage.cacheControl.immutable,
                        priority: FastImage.priority.normal
                    }}
                    style={[styles.marker, imageStyle]}
                    loaderBGColor={"#ccc"}
                    resizeMode={FastImage.resizeMode.cover}/>
                {
                    item.in_range === false &&
                    <OutOfRangeView item={item} showSubtitle={false} tiny={true}/>
                }

            </Animated.View>
        </Marker>)
};

export default CustomMarker;


const size = 45;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#007bff",
        borderRadius: 8,
        elevation: 10,
        borderWidth: 2,
        borderColor: "white", overflow: "hidden",
        width: size,
        height: size,
    },

    marker: {
        width: size,
        height: size,
        backgroundColor: "grey"
    },
});
