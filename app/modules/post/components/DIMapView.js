import React, {useRef, useImperativeHandle, forwardRef, useState, useEffect} from 'react';
import {
    StyleSheet,
    Animated,
    Dimensions,
    View,
    Text,
    Alert,
    ActivityIndicator,
} from 'react-native';

import {Button} from "@rneui/themed";
import MapView from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import {showLocation, getApps} from 'react-native-map-link';

import Styles from '../components/AppStyles';
import MapStyles from './MapStyles';
import Directions from "../../../components/react-native-maps-navigation-master/src/modules/Directions";
import DirectionCard, {formatDuration} from "./DirectionCard";
import {useTheme} from "../../ThemeProvider";

const {width, height} = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function DIMapView(props, parentRef) {
    const {
        origin,
        destination,
        apikey,
        initialRegion,
        initialCamera,
        renderMarker,
        item,
        navigation
    } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [routes, setRoutes] = useState({});
    const [routeSelected, setRouteSelected] = useState(null);
    const [mode, setMode] = useState('DRIVING');

    const _map = useRef();

    const {
        textColor,
    } = useTheme()
    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => {
            try {
                const directionsCoder = new Directions(apikey);
                let routes = await directionsCoder.fetchWithAxioss(origin, destination)
                setRoutes(routes)
                setRouteSelected(Object.values(routes)[0][0])
                setIsLoading(false)
            } catch (e) {
                Alert.alert('Direction Failure', 'Failed to get directions.',
                    [
                        {text: "OK", onPress: () => navigation.goBack()}
                    ])
            }
        })();
    }, []);

    //==================================================================================================
    //3 - ACTION HANDLERS
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

    const onStartNavigation = async () => {
        try {
            const options = {
                latitude: destination.latitude,
                longitude: destination.longitude,
                directionsMode: routeSelected.mode
            }
            await showLocation(options)
        } catch (e) {
            alert(e)
        }
    }

    //==================================================================================================
    //5 - UI HANDLERS
    const renderFooter = () => {
        return (
            <View style={[styles.dropContainer, {flex: 1}]}>
                <DirectionCard item={item}
                               routes={routes}
                               setRouteSelected={setRouteSelected}
                               routeSelected={routeSelected}/>
                <View style={styles.directionsFooter}>
                    {
                        routeSelected &&
                        <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                            <View style={{flex: 1, marginRight: 12}}>
                                <Text style={{fontWeight: "600", fontSize: 26, color: textColor}}>
                                    {formatDuration(routeSelected.duration.value)}
                                </Text>
                                <Text style={{color: "#bbb", fontSize: 15, opacity: 0.8}}>
                                    {routeSelected.distance.text}
                                </Text>
                            </View>
                            <Button title={"Start"}
                                    onPress={onStartNavigation}
                                    containerStyle={[styles.buttonContainer]}
                                    icon={{name: 'location-arrow', type: 'font-awesome', size: 19, color: '#fff'}}
                                    buttonStyle={[styles.button, {backgroundColor:textColor}]}/>
                        </View>
                    }
                </View>
            </View>
        )
    }

    useImperativeHandle(parentRef, () => ({onAnimateToRegion}))

    //==========================================================================================
    // 6 - RENDER VIEW
    if (isLoading) return <ActivityIndicator style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}/>

    return (
        <View style={[styles.mapContainer]}>
            <View style={{flex: 1, height: height}}>
                <MapView
                    ref={_map}
                    loadingEnabled
                    loadingBackgroundColor="white"
                    rotateEnabled={false}
                    style={Styles.map}
                    customMapStyle={MapStyles}
                    showsUserLocation={true}
                    // followsUserLocation={true}
                    initialCamera={{...initialCamera,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,}}
                    initialRegion={{
                        ...initialRegion,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}>
                    {[destination].map((marker, index) => (
                        renderMarker(marker, index)
                    ))}
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={apikey}
                        strokeWidth={6}
                        strokeColor={textColor}
                        optimizeWaypoints={true}
                        mode={routeSelected.travelMode}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)

                        }}
                        onError={(errorMessage) => {
                            // console.log('GOT AN ERROR');
                        }}
                    />
                </MapView>
            </View>
            {renderFooter()}
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
    },

    dropContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: "#000000", backgroundColor: "transparent",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
    },

    directionsFooter:{
        backgroundColor: "#fff",
        flex: 1,
        borderRadius: 15,
        overflow: "hidden",
        paddingLeft: 15,
        paddingVertical: 30,
        paddingBottom: 60,
        paddingRight: 10
    },

    buttonContainer:{

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginRight: 6,
    },

    button:{
        backgroundColor: "rgb(64,112,128)", flex: 1,
        height: 50,
        width: 140
    }
});
