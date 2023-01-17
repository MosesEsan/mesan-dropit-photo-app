import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";

import {RNCamera} from "react-native-camera";
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {NavButton} from "../NavButton";
import {CameraToolBar} from "./CameraToolBar";

const CAMERA_BACK = RNCamera.Constants.Type.back
const CAMERA_FRONT = RNCamera.Constants.Type.front

const MAX_ZOOM = 7; // iOS only

export default function CameraView({setPicture, onCancel, containerStyle, cameraStyle}) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [isGettingCameraPermission, setIsGettingCameraPermission] = useState(null);

    const [type, setType] = useState(CAMERA_BACK);
    const [flash, setFlash] = useState(false);
    const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);

    let camera;

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => {
            setIsGettingCameraPermission(true)
            check(PERMISSIONS.IOS.CAMERA)
                .then((result) => {
                    if (result === RESULTS.DENIED) {
                        requestCameraPermission()
                    } else {
                        setHasCameraPermission(result === RESULTS.GRANTED);
                        setIsGettingCameraPermission(false)
                    }
                })
                .catch((error) => {
                    alert(error)
                    setHasCameraPermission(false);
                    setIsGettingCameraPermission(false)
                })
        })();
    }, []);

    //==================================================================================================
    //5 - ACTION HANDLERS
    const requestCameraPermission = () => {
        request(PERMISSIONS.IOS.CAMERA).then((result) => {
            setHasCameraPermission(result === RESULTS.GRANTED);
            setIsGettingCameraPermission(false)
        });
    }

    const toggleFlash = () => {
        setFlash(!flash)
        if (flashMode === RNCamera.Constants.FlashMode.off)
            setFlashMode(RNCamera.Constants.FlashMode.on)
        else
            setFlashMode(RNCamera.Constants.FlashMode.off)
    }

    const switchFacing = () => {
        setType(type === CAMERA_BACK ? CAMERA_FRONT : CAMERA_BACK);
    }

    const onTakePicture = async () => {
        if (camera) {
            const options = {quality: 0.5, base64: true};
            const photo = await camera.takePictureAsync(options)
            setFlashMode(RNCamera.Constants.FlashMode.off);
            setPicture(photo.uri)
        }
    }

    // ==========================================================================================
    //5-  RENDER VIEW
    if (isGettingCameraPermission || !hasCameraPermission) {
        let title = isGettingCameraPermission ? "Camera Access Permission" : "Camera Access"
        let message = isGettingCameraPermission ? "DropIt! is checking the camera permission." : "DropIt! does not have drop access."
        return (
            <StatusView title={title} message={message} onCancel={onCancel}/>
        )
    }

    return (
            <View style={[styles.wrapper, containerStyle]}>
                <View style={styles.toolBar}>
                    <NavButton
                        size={34}
                        name={'ios-close'}
                        type={'ionicon'}
                        color={'#FFF'}
                        onPress={onCancel}
                        style={{height: 54}}/>
                </View>

                <RNCamera
                    style={[{flex: 1, borderRadius: 16}, cameraStyle]}
                    type={type}
                    maxZoom={MAX_ZOOM}
                    flashMode={flashMode}
                    captureAudio={false}
                    ref={(r) => {camera = r}}>
                    <CameraToolBar
                        flashMode={flashMode}
                        switchFacing={switchFacing}
                        toggleFlash={toggleFlash}
                        onTakePicture={onTakePicture}/>
                </RNCamera>
            </View>
    );
}

CameraView.defaultProps = {
    containerStyle: {},
    cameraStyle: {}
}

function StatusView({title, message, onCancel}) {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "#fff", fontWeight: "bold", fontSize: 18}}>
                {title}
            </Text>
            <Text style={{color: "#fff", fontWeight: "500", fontSize: 18, marginTop: 10}}>
                {message}
            </Text>
            <Text style={{color: "#fff"}} onPress={onCancel}>Close</Text>
        </View>
    )
}

export function Preview({path, onClose}) {
    if (path) {
        return (
            <View style={{flex: 1}}>
                <View style={styles.previewWrapper}>
                    <View style={styles.toolBar}>
                        <NavButton
                            size={34}
                            name={'ios-close'}
                            type={'ionicon'}
                            color={'#FFF'}
                            onPress={onClose}
                            style={{height: 54}}/>
                    </View>
                    <Image source={{uri: path}} style={styles.image}/>
                </View>
            </View>
        )
    }

    return null;
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 16,
        flex: 1, overflow: "hidden"
    },

    previewWrapper: {
        borderRadius: 16,
        flex: 1,
        overflow: "hidden",
    },

    image:{
        flex:1
    },

    toolBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        alignItems: "flex-end",
    }
});
