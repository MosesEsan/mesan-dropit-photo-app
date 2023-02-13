import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    useWindowDimensions,
    ScrollView,
    StyleSheet
} from 'react-native';

import FastImage from "react-native-fast-image";
import MapView from "react-native-map-clustering";
import {Button, Icon} from "@rneui/themed"
import {useLazyQuery} from "@apollo/client";
import moment from "moment";

import CustomMarker from "../../post/components/CustomMarker";

import {useLocation} from "../../../components/location/LocationProvider";
import {useAuth} from "../../auth/AuthProvider";


import CardContainer from "../../post/components/Card/CardContainer";
import {GET_DROP} from "../../post/PostService";
import {RightNavButton} from "../../../components/DIHeader";
import {MetaContainer} from "../../post/scenes/Directions";
import {convertDate} from "../../../AppUtil";

export default function Directions({navigation, route}) {
    //1 - DECLARE VARIABLES
    const {notification} = route.params;
    const {height: windowHeight} = useWindowDimensions();

    const {colors} = useTheme()

    const [drop, setDrop] = useState(null);
    const {state: {currentLocation}} = useLocation();
    const {state: {currentUser},} = useAuth();

    const [getDrop] = useLazyQuery(GET_DROP, {onCompleted, onError});

    //==================================================================================================
    //1B -NAVIGATION CONFIG
    useLayoutEffect(() => {
            let buttons = [
                {
                    name: 'bell-alert',
                    size: 23,
                    onPress: () => alert("Set Alert"),
                    color: "#fff",
                    type: "material-community"
                },
                {
                    name: 'location',
                    size: 24,
                    onPress: () => alert("Get Directions Coming Soon"),
                    color: "#fff",
                    type: "ionicon"
                }
            ]

            navigation.setOptions({
                headerRight: () => <RightNavButton buttons={buttons}/>
            });

    }, [navigation]);

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => await getData())();
    }, []);


    //2b - GET DATA
    async function getData() {
        const variables = {id:notification.drop.id}
        await getDrop({variables})
    }

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    async function onCompleted(data) {
        if (data.drop) setDrop(data.drop);
    }

    function onError(error) {
        alert(error.message)
    }

    //==========================================================================================
    // 5 - RENDER VIEW
    let milliseconds = moment(parseInt(notification.drop.createdAt)).valueOf();
    const date = convertDate(notification.drop.createdAt)
    return (
        <SafeAreaView style={[{flex: 1, backgroundColor: colors.background}]}>
            <ScrollView>
                <View style={{height: windowHeight * .55}}>
                    <CardContainer item={notification.drop} large={true} currentLocation={currentLocation}
                             user={currentUser}/>
                </View>

                <MetaContainer item={notification.drop} date={date}/>
                {
                    drop &&
                    <View style={{ flexDirection: "row", paddingHorizontal: 12, paddingBottom: 20}}>
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <Icon
                                size={20}
                                // name={'check-circle'}
                                name={'user-tag'}
                                type={'font-awesome-5'}
                                color={'#fff'}
                                // onPress={onSave}
                                containerStyle={{
                                    flex: null,
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    marginRight: 8
                                }}
                                iconStyle={{paddingHorizontal: 0}}/>
                            <Text style={{color: "#fff"}}>{drop.taggedUsers.length} Users</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <Icon
                                size={20}
                                name={'comment-text'}
                                type={'material-community'}
                                color={'#fff'}
                                // onPress={onSave}
                                containerStyle={{
                                    flex: null,
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    marginRight: 8
                                }}
                                iconStyle={{paddingHorizontal: 0}}/>
                            <Text style={{color: "#fff"}}>{notification.drop.likes.length} Likes</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <Icon
                                size={20}
                                name={'comment-text'}
                                type={'material-community'}
                                color={'#fff'}
                                // onPress={onSave}
                                containerStyle={{
                                    flex: null,
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    marginRight: 8
                                }}
                                iconStyle={{paddingHorizontal: 0}}/>
                            <Text style={{color: "#fff"}}>{drop.comments} Comments</Text>
                        </View>
                    </View>
                }
                <MapView
                    style={{height: 200}}
                    initialRegion={{
                        latitude: notification.drop.latitude,
                        longitude: notification.drop.longitude,
                        latitudeDelta: 0.04864195044303443,
                        longitudeDelta: 0.040142817690068
                    }}
                    initialCamera={{
                        altitude: 15000,
                        center: {
                            latitude: notification.drop.latitude,
                            longitude: notification.drop.longitude,
                            latitudeDelta: 0.04864195044303443,
                            longitudeDelta: 0.040142817690068
                        },
                        heading: 0,
                        pitch: 0,
                        zoom: 11,
                    }}
                    loadingEnabled
                    loadingBackgroundColor="white"
                    rotateEnabled={false}>
                    <CustomMarker item={notification.drop} navigation={navigation} key={`NF.${notification.id}.item`}/>
                </MapView>
            </ScrollView>
        </SafeAreaView>
    );
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
})




