import React from "react";
import {
    Animated,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from "react-native";


import {Icon} from "@rneui/themed";
import {RNCamera} from "react-native-camera";

export function CameraToolBar({flashMode, switchFacing, toggleFlash, disabled, onTakePicture}){
    return (
        <View style={styles.bottomContainer}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name={flashMode === RNCamera.Constants.FlashMode.off ? "flash-off" : "flash"} size={26}
                      color={ flashMode === RNCamera.Constants.FlashMode.off ? "white" : "yellow"}
                      type={'ionicon'}
                      containerStyle={styles.flashButton} onPress={toggleFlash}/>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <TouchableWithoutFeedback
                    disabled={disabled}
                    onPress={onTakePicture}>
                    <Animated.View style={[styles.captureButton]}>
                        <Animated.View style={[styles.captureButtonInner]}></Animated.View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name={"camera-reverse-outline"} size={31} color="#bbb" type={'ionicon'}
                      containerStyle={styles.flashButton} onPress={switchFacing}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingBottom: 25,

        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },

    flashButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    captureButton: {
        width: 80,
        height: 80,
        borderWidth: 4,
        borderColor: '#FFF',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    captureButtonInner: {
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: 'white',
        opacity: 1,
    }
});

