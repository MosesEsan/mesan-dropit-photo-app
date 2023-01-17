import React, {createContext, useContext, useMemo, useReducer, useState} from 'react';
import {Alert, Linking} from "react-native";

//CREATE REDUCER
import reducer, {
    initialState,
    RETRIEVING_CURRENT_LOCATION,
    SAVE_CURRENT_LOCATION,
    SAVE_PERMISSION
} from "./LocationReducer";


import Geolocation from 'react-native-geolocation-service';
import {getDistance, isPointWithinRadius} from 'geolib';

// CONTEXT ===================================
const locationContext = createContext();
const {Provider} = locationContext;

function LocationProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    const calculateDistance = (from, to) => {
        try {
            // const dis = getPreciseDistance(from, to);
            const distance = getDistance(from, to);

            if (distance < 1000) return `${distance}m`
            else return `${distance/1000}km`

        } catch (e) {
            throw new Error(e);
        }
    };

    const checkIfWithinRadius = (point, center, radius) => {
        try {
            return isPointWithinRadius(point, center, radius * 1000);
        } catch (e) {
            throw new Error(e);
        }
    };


    const getCurrentLocation = async (onSuccess, onError) => {
        const hasLocationPermission = await checkHasLocationPermission();

        if (hasLocationPermission) {
            setIsGettingLocation(true)

            let successCallback = (position) => {
                let currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.04864195044303443, //0.0112
                    longitudeDelta: 0.040142817690068, //0.0111
                }

                dispatch({type: SAVE_CURRENT_LOCATION, currentLocation})

                onSuccess(currentLocation)
                setIsGettingLocation(false)
            }

            let errorCallback = (error) => {
                dispatch({
                    type: RETRIEVING_CURRENT_LOCATION,
                    isRetrievingLocation: false,
                    errorMessage: `Error while trying to get location: ${error}`
                })
                onError( `Error while trying to get location: ${error}`)
                setIsGettingLocation(false)
            }

            let options = {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 60000
            }

            Geolocation.getCurrentPosition(successCallback, errorCallback,options);
        } else {
            onError(`Permission to access location was denied`)
        }
    }

    const checkHasLocationPermission = async () => {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
            });
        };

        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            dispatch({type: SAVE_PERMISSION, hasLocationPermission:true})
            return true;
        }

        if (status === 'denied') {
            dispatch({type: SAVE_PERMISSION, hasLocationPermission:false})
            Alert.alert('Location permission denied');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
                '',
                [
                    {text: 'Go to Settings', onPress: openSetting},
                    {
                        text: "Don't Use Location", onPress: () => {
                        }
                    },
                ],
            );
        }

        return false;
    };


    const value = useMemo(() => {
        return {
            state, dispatch,
            getCurrentLocation,
            calculateDistance, checkIfWithinRadius
        };
    }, [state]);

    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    );
}

const useLocation = () => useContext(locationContext);
export {locationContext, useLocation}
export default LocationProvider;
