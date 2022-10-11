import React, {useState, useMemo} from 'react';

import {StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import {useAuth} from "../AuthProvider";

export default function AuthUserImage(props) {
    const {onDone, isUploading, enableUpload, onPress, style, imageStyle} = props;
    const [image, setImage] = useState(null);

    const {state: {currentUser}} = useAuth();

    const pickImage = async () => {
        const options = {
            mediaType: 'mixed',
            quality: 1,
        }

        const result = await launchImageLibrary(options);
        if (result?.assets && result?.assets.length > 0){
            const assets = result.assets
            const uri = assets[0]['uri']
            setImage(uri);
            await onDone(uri)
        }
    };

    //=====================

    const source = useMemo(() => {
        if (image !== null) return {uri: image}
        else if (currentUser && currentUser.image !== null) return {uri: `${currentUser.image}`}
        else return require('./profile-placeholder.png');
    }, [currentUser, image]);

    const onButtonPress = async () => {
        if (enableUpload) await pickImage();
        else if (onPress) onPress();
    };

    return(
        <View style={styles.container}>
            <TouchableHighlight onPress={onButtonPress} disabled={isUploading} underlayColor="rgba(0, 0, 0, 0)">
                <View style={[style]}>
                    <Image style={[styles.image, imageStyle]} source={source}/>
                </View>
            </TouchableHighlight>
        </View>
    )
}

AuthUserImage.defaultProps ={
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
        justifyContent: "center"
    },

    image:{
        height: 100,
        width: 100,
        borderRadius: 100/2,
        backgroundColor: "#eee"
    }
});

