import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    useWindowDimensions,
    ScrollView,
    StyleSheet, ActivityIndicator, Alert
} from 'react-native';

import FastImage from "react-native-fast-image";
import {Icon} from "@rneui/themed"
import moment from "moment";

import {OutOfRangeView} from "../components/Card/Card";
import CustomMarker from "../components/CustomMarker";

import {myFromNow} from "../helper";
import {useTheme} from "../../ThemeProvider";
import DIHeader from "../../../components/DIHeader";
import DIMapView from "../components/DIMapView";
import {useLocation} from "../../../components/location/LocationProvider";
import {Marker} from "react-native-maps";

const GOOGLE_MAPS_APIKEY = "AIzaSyCkvKoGcVo1cvi-Gc5DYSHHgy8oBs3xQeU"

export default function DIDirections({navigation, route}) {
    //1 - DECLARE VARIABLES
    const {item} = route.params;

    const {backgroundColor} = useTheme()

    //1 - DECLARE VARIABLES
    const [isLoading, setIsLoading] = useState(true);
    const [currentLocation, setCurrentLocation] = useState(null);

    const destination = {latitude: item.latitude, longitude: item.longitude};
    const {getCurrentLocation} = useLocation();

    //==================================================================================================
    //1B -NAVIGATION CONFIG


    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => {
            await getCurrentLocation(async (currentLocation) => {
                setCurrentLocation(currentLocation)
                setIsLoading(false)
            }, () => {
                Alert.alert('Location Failure', 'Unable to get current location.',
                    [
                        { text: "OK", onPress: () => navigation.goBack() }
                    ])
            });
        })();
    }, []);

    //==================================================================================================
    const renderMarker = (marker, index) => {
        if (marker === currentLocation){
            return(
                <Marker
                    key={`11${index}`}
                    coordinate={marker}
                    title={marker.title}
                    description={marker.description}
                />
            )
        }

        return (
            <CustomMarker index={`22${index}`}
                          item={item}
                          navigation={navigation}
                          key={`CM.${item.id}.item`}/>
        )
    }

    //==========================================================================================

    const renderFooter = () => {
        return(


            <View
                // colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.4)"]}
                            style={[styles.dropContainer, {flex:1, padding: 10}]}>

                    <View style={{flex:1, flexDirection:"row", borderRadius: 12, overflow:"hidden"}}>
                        <View style={{borderTopLeftRadius: 12, borderBottomLeftRadius: 12, overflow:"hidden"}}>
                            <FastImage
                                source={{
                                    uri: item.image,
                                    cache: FastImage.cacheControl.immutable,
                                    priority: FastImage.priority.normal
                                }}
                                style={{height: 140, width: 120, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, }}
                                loaderBGColor={"#ccc"}
                                resizeMode={FastImage.resizeMode.cover}>
                            </FastImage>
                            {
                                item['in_range'] === false &&
                                <OutOfRangeView item={item} showSubtitle={false} preview={false}/>
                            }
                        </View>

                        {/*<View style={{borderWidth:1, borderColor:"purple",  flex:1, backgroundColor:"#fff", padding: 8}}>*/}


                            <View style={{flex: 1, backgroundColor:"#fff", padding: 10}}>
                                        <View style={{
                                            // paddingVertical: 10,
                                            flex: 1,
                                            flexDirection: "row",
                                            // paddingHorizontal: 12,
                                            alignItems: "center"
                                        }}>
                                            <FastImage source={{uri: item.user.image}}
                                                       style={{height: 30, width: 30, borderRadius: 50, backgroundColor: "#eee"}}/>
                                            <Text style={{marginLeft: 8, color: "#000", fontWeight: "bold"}}>
                                                {item.user.name}
                                            </Text>
                                            {/*<Text style={{marginLeft: 8, color: "#ccc"}}>*/}
                                            {/*    {date}*/}
                                            {/*</Text>*/}
                                        </View>
                                <Text style={{color: "#000", fontWeight: "400", marginTop: 8}}>
                                    {item.caption}
                                </Text>
                                {/*<View style={{flexDirection: "row", marginTop: 12}}>*/}
                                {/*    <View style={{flex: 1, flexDirection: "row", alignItems: "flex-end"}}>*/}
                                {/*        <Icon*/}
                                {/*            size={18}*/}
                                {/*            name={'heart'}*/}
                                {/*            type={'material-community'}*/}
                                {/*            color={'#505A5B'}*/}
                                {/*            containerStyle={{*/}
                                {/*                flex: null,*/}
                                {/*                alignItems: "flex-start",*/}
                                {/*                justifyContent: "center",*/}
                                {/*                marginRight: 8*/}
                                {/*            }}*/}
                                {/*            iconStyle={{paddingHorizontal: 0}}/>*/}
                                {/*        /!*<Text style={{color: "#fff"}}>{likes.length} Likes</Text>*!/*/}
                                {/*        <Text style={{color: "#505A5B"}}>20</Text>*/}
                                {/*    </View>*/}

                                {/*    <View style={{flex: 1, flexDirection: "row", paddingHorizontal: 12, alignItems: "center"}}>*/}
                                {/*        <Icon*/}
                                {/*            size={18}*/}
                                {/*            name={'comment-text'}*/}
                                {/*            type={'material-community'}*/}
                                {/*            color={'#505A5B'}*/}
                                {/*            containerStyle={{*/}
                                {/*                flex: null,*/}
                                {/*                alignItems: "flex-start",*/}
                                {/*                justifyContent: "center",*/}
                                {/*                marginRight: 8*/}
                                {/*            }}*/}
                                {/*            iconStyle={{paddingHorizontal: 0}}/>*/}
                                {/*        /!*<Text style={{color: "#fff"}}>{comments} Comments</Text>*!/*/}
                                {/*        <Text style={{color: "#505A5B"}}>12</Text>*/}
                                {/*    </View>*/}
                                {/*</View>*/}
                                <View style={{flexDirection: "row", marginTop: 12}}>
                                    <View style={{flex: 1, flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor:"rgb(229,244,249)",
                                        borderWidth:1.5, borderColor:"rgb(64,112,128)", borderRadius: 50, height: 34, marginRight: 6
                                    }}>
                                        <Icon
                                            size={17}
                                            name={'car'}
                                            type={'material-community'}
                                            color={'rgb(49,101, 118)'}
                                            containerStyle={{
                                                flex: null,
                                                alignItems: "flex-start",
                                                justifyContent: "center",
                                                marginRight: 6,
                                            }}
                                            iconStyle={{paddingHorizontal: 0}}/>
                                        {/*<Text style={{color: "#fff"}}>{likes.length} Likes</Text>*/}
                                        <Text style={{color: "rgb(49,101, 118)", fontWeight:"600"}}>20 Mins</Text>
                                    </View>

                                    <View style={{flex: 1, flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderWidth:1.5, borderColor:"#ccc", borderRadius: 50, height: 34, marginLeft: 6}}>
                                        <Icon
                                            size={20}
                                            name={'walk'}
                                            type={'material-community'}
                                            color={'#505A5B'}
                                            containerStyle={{
                                                flex: null,
                                                alignItems: "flex-start",
                                                justifyContent: "center",
                                                marginRight: 8
                                            }}
                                            iconStyle={{paddingHorizontal: 0}}/>
                                        {/*<Text style={{color: "#fff"}}>{comments} Comments</Text>*/}
                                        <Text style={{color: "#505A5B", fontWeight:"600"}}>1 hr</Text>
                                    </View>
                                </View>


                        {/*        <View style={{flex: 1, flexDirection: "row", alignItems: "center", marginVertical: 12, borderWidth:1, borderColor:"green"}}>*/}


                                </View>
                        {/*    </View>*/}

                        {/*</View>*/}
                        {/*{*/}
                        {/*    item['in_range'] === false &&*/}
                        {/*    <OutOfRangeView item={item} showSubtitle={false} preview={false}/>*/}
                        {/*}*/}
                    </View>


            </View>
        )
    }
    //==========================================================================================
    // 5 - RENDER VIEW
    let milliseconds = moment(parseInt(item.createdAt)).valueOf();
    const date = myFromNow(moment(milliseconds), moment())
    const mapRef = useRef();

    if (isLoading) return <ActivityIndicator style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}/>

    if (currentLocation){
        return (
            <SafeAreaView style={[{flex: 1, backgroundColor}]}>
                <DIMapView ref={mapRef}
                           origin={currentLocation}
                           destination={destination}
                           apikey={GOOGLE_MAPS_APIKEY}
                           initialRegion={{
                               latitude: currentLocation.latitude,
                               longitude: currentLocation.longitude,
                               latitudeDelta: 0.04864195044303443,
                               longitudeDelta: 0.040142817690068
                           }}
                           navigation={navigation}
                           initialCamera={{
                               altitude: 15000,
                               center: {
                                   latitude: item.latitude,
                                   longitude: item.longitude,
                               },
                               heading: 0,
                               pitch: 0,
                               zoom: 11,
                           }}
                           renderMarker={renderMarker}
                           item={item}
                />
                <DIHeader onPressLeft={() => navigation.goBack()} buttons={[]} containerStyle={{borderRadius:50, backgroundColor:"#fff"}}/>

                {/*<ScrollView contentContainerStyle={{paddingBottom: 0}}>*/}
                {/*    <View style={{height: windowHeight * .55}}>*/}
                {/*        <Card item={item} showSubtitle={false}/>*/}
                {/*    </View>*/}

                {/*    <MetaContainer item={item} date={date}/>*/}
                {/*    <MapView*/}
                {/*        style={{height: 200}}*/}
                {/*        initialRegion={{*/}
                {/*            latitude: item.latitude,*/}
                {/*            longitude: item.longitude,*/}
                {/*            latitudeDelta: 0.04864195044303443,*/}
                {/*            longitudeDelta: 0.040142817690068*/}
                {/*        }}*/}
                {/*        initialCamera={{*/}
                {/*            altitude: 15000,*/}
                {/*            center: {*/}
                {/*                latitude: item.latitude,*/}
                {/*                longitude: item.longitude,*/}
                {/*                latitudeDelta: 0.04864195044303443,*/}
                {/*                longitudeDelta: 0.040142817690068*/}
                {/*            },*/}
                {/*            heading: 0,*/}
                {/*            pitch: 0,*/}
                {/*            zoom: 11,*/}
                {/*        }}*/}
                {/*        loadingEnabled*/}
                {/*        loadingBackgroundColor="white"*/}
                {/*        rotateEnabled={false}>*/}
                {/*        <CustomMarker item={item} navigation={navigation} key={`CM.${item.id}.item`}/>*/}
                {/*    </MapView>*/}
                {/*</ScrollView>*/}
                {/*<Button title={"Take Me There"}*/}
                {/*        onPress={() => alert("Coming Soon")}*/}
                {/*        containerStyle={[{margin: 12}]}*/}
                {/*        buttonStyle={[styles.button]}*/}
                {/*        disabledStyle={[styles.button]}*/}
                {/*        titleStyle={styles.buttonText}/>*/}
            </SafeAreaView>
        );
    }

    return null;
};


const styles = StyleSheet.create({
    metaContainer: {
        flex: 1,
        flexDirection: "row",
        paddingRight: 12,
        alignItems: "center"
    },

    location: {
        color: "#969594",
        borderColor: "transparent", fontSize: 14
    },

    date: {
        backgroundColor: "white", borderRadius: 4,
        justifyContent: "center", alignItems: "center",
        height: 35, width: 40,
    },

    caption: {
        flex: 1,
        flexDirection: "row",
        paddingRight: 12,
        marginTop: 15
    },

    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#C55110",
        marginTop: 10
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 17,
        fontFamily: 'Helvetica Neue',
        textAlign: "center",
        color: "#fff",
    },

    dropContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        // paddingTop: 10,
        // paddingBottom: BOTTOM_PADDING,
        shadowColor: "#000000", backgroundColor: "transparent",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
    }
})



export const MetaContainer = ({item, date}) => {
    return(
        <View style={{margin: 12, marginVertical: 20}}>
            <View style={styles.metaContainer}>
                <FastImage source={{uri: item.user.image}}
                           style={{height: 50, width: 50, borderRadius: 50, backgroundColor: "#eee"}}/>
                <View style={{marginLeft: 12}}>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{color: "#fff", fontWeight: "bold"}}>
                            {item.user.name}
                        </Text>
                        <Text style={{marginLeft: 8, color: "#ccc"}}>
                            {date}
                        </Text>
                    </View>
                    <View style={{flexDirection: "row", marginTop: 6}}>
                        <Icon
                            name='location-pin'
                            type='entypo'
                            size={16}
                            color='#969594'
                            containerStyle={{justifyContent: "center", alignItems: "center", marginLeft: -4}}/>
                        <Text style={styles.location}>
                            {item.city ? `${item.city}, ${item.country}` : item.distance_long}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.caption}>
                <Text style={{color: "#fff", fontWeight: "500"}}>
                    {item.caption}
                </Text>
            </View>
        </View>
    )
}



