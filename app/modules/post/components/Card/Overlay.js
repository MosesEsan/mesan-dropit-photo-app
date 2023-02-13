import React, {useRef} from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback, View} from "react-native";

import LinearGradient from "react-native-linear-gradient";

let topColors = ["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.3)",
    "rgba(0, 0, 0, 0.1)", "transparent",];

let bottomColors = ["transparent", "rgba(0, 0, 0, 0.1)",
    "rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.5)",
    "rgba(0, 0, 0, 0.6)"]

export default function Overlay(props) {
    const {disableTap, renderHeader, renderFooter} = props;

    const animation = useRef(new Animated.Value(0)).current;
    const controlsOpacity = useRef(new Animated.Value(1)).current;
    const metadataOpacity = useRef(new Animated.Value(1)).current;

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    const animatedStyle = {
        backgroundColor: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]
        })
    }

    const opacityStyle = {
        opacity: controlsOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })
    }

    const metadataOpacityStyle = {
        opacity: metadataOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })
    }

    async function onPressView() {
        const newOpacity = 1 ? (controlsOpacity._value === 0) : 0
        _showHideControls(newOpacity)
    }

    const _showHideControls = (toValue) => {
        Animated.timing(controlsOpacity, {
            toValue,
            duration: 200,
            useNativeDriver: false // Add This line
        }).start()
    }

    const buttonRef = useRef();
    const viewProps = {animation: 'fadeIn', duration:600, delay:300}
    const viewStyle = [StyleSheet.absoluteFillObject, animatedStyle, opacityStyle]

    const TopHeader = () => {
        return(
            <View style={[styles.floating, styles.top]}>
                <LinearGradient style={[{flex: 1}]} colors={topColors}>
                    {renderHeader && renderHeader()}
                </LinearGradient>
            </View>
        )
    }

    const Footer = () => {
        return(
            <Animated.View style={[styles.floating, styles.bottom, metadataOpacityStyle]}>
                <LinearGradient style={{flex: 1}} colors={bottomColors}>
                    {renderFooter && renderFooter()}
                </LinearGradient>
            </Animated.View>
        )
    }

    if (!disableTap) {
        return (
            <TouchableWithoutFeedback onPress={onPressView} accessible={false} style={{flex: 1}}>
                <Animated.View ref={buttonRef} {...viewProps} style={viewStyle}>
                    <TopHeader/>
                    <Footer/>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <View style={[styles.floating, styles.top, styles.bottom, !props.large && {borderRadius: 8}]}>
            <TopHeader/>
            <Footer/>
        </View>
    );
}

Overlay.defaultProps = {
    disableTap: false,
    renderHeader: null,
    renderFooter: null,
    onPress: null
}

const styles = StyleSheet.create({
    floating: {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: "transparent",
    },

    top: {
        top: 0,
    },

    bottom: {
        bottom: 0,
    }
});
