import React, {useMemo} from 'react';

import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {useAuth} from "../modules/auth/AuthProvider";
import FastImage from "react-native-fast-image";

export default function NavUserImage(props) {
    const {state: {currentUser}} = useAuth();

    //=====================
    const source = useMemo(() => {
        if (currentUser && currentUser.image !== null) return {uri: `${currentUser.image}`}
        else return require('./profile-placeholder.png');
    }, [currentUser]);

    return(
        <UserImageComponent source={source}
                            onPress={props.onPress}
                            containerStyle={[{marginLeft:6},props.containerStyle]}/>
    )
}

export function UserImageComponent(props) {
    const { containerStyle, imageStyle, source} = props;

    return(
        <View style={[styles.container, containerStyle]}>
            <TouchableHighlight onPress={props.onPress} underlayColor="rgba(0, 0, 0, 0)">
                <FastImage style={[styles.image, imageStyle]} source={source}/>
            </TouchableHighlight>
        </View>
    )
}

UserImageComponent.defaultProps ={
    props:null,
    style:{},
    containerStyle:{},
    imageStyle:{}
}

NavUserImage.defaultProps ={
    large: false,
    enableUpload: false,
    photoURL:null,
    onPress:null,
    onDone:null,
    isUploading:false,
    imageStyle:{}
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: 44,
        minWidth: 44,
        marginRight: 2
    },

    image:{
        height: 23,
        minWidth: 23,
        borderRadius: 100/2,
        backgroundColor: "#eee"
    }
});

