import React, {useState} from "react";
import {Platform, StyleSheet, View} from "react-native";
import Geolocation from "react-native-geolocation-service";

import {useLocation} from "../../../../components/location/LocationProvider";

import CameraView, {Preview} from "../../components/Camera/Camera";
import {generateUUID} from "../../helper";
import {Button} from "@rneui/themed";

export default function AddNew({navigation}) {
    const [picture, setPicture] = useState(null);
    const [isGettingDropLocation, setIsGettingDropLocation] = useState(null);

    const {state: {hasLocationPermission}} = useLocation();

    const submitPicture = async () => {
        if (picture) {
            if (!hasLocationPermission) {
                alert("DropIt! does not have location access.")
            } else {
                setIsGettingDropLocation(true)

                //TODO: Move this out of here
                Geolocation.getCurrentPosition(
                    position => {
                        // Center the map on the location we just fetched.
                        let currentLocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }

                        setIsGettingDropLocation(false)
                        let drop = {
                            id: generateUUID(),
                            photo: picture,
                            ...currentLocation
                        };

                        navigation.replace('AddCaptionPrivacy', {drop})
                    },
                    error => {
                        alert("DropIt! was unable to retrieve your current location .")
                    },
                    {enableHighAccuracy: true, timeout: 20000, maximumAge: 60000},
                );
            }
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: "#000000"}]}>
            {
                picture ?
                    <Preview path={picture} onClose={() => setPicture(null)}/>
                    : <CameraView setPicture={setPicture} onCancel={() => navigation.goBack()}/>

            }
            {picture !== null &&
                // <View style={styles.bottomContainer}>
                    <Button title={"Add Caption"}
                            loading={false}
                            onPress={submitPicture}
                            containerStyle={styles.buttonContainer}
                            buttonStyle={[styles.button]}
                            titleStyle={styles.buttonText}/>
                // </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    wrapper: {
        borderRadius: 16,
        flex: 1,
        overflow: "hidden"
    },

    buttonContainer: {
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 35 : 0,
        paddingHorizontal: 8,
        // width: width
    },

    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#fff",
        marginTop: 10
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 17,
        fontFamily: 'Helvetica Neue',
        textAlign: "center",
        color: "#000"
    }
});
