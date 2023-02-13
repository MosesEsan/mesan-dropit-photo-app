import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useLazyQuery} from "@apollo/client";

import {GET_USER} from "../../UserService";
import {useAuth} from "../../../auth/AuthProvider";

import {useLocation} from "../../../../components/location/LocationProvider";
import ScrollCard from "../../../post/components/Card/ScrollCard";
import CustomMarker from "../../../post/components/CustomMarker";
import DIMapView from "../../../post/components/DIMap";
import {RightNavButton} from "../../../../components/DIHeader";
import {useTheme} from "@react-navigation/native";

export default function UserDrops(props) {
    const {navigation, route} = props;

    //0 - DECLARE PROVIDERS VARIABLES
    const {state: {isLoggedIn, currentUser}, handleLogout} = useAuth();
    const {state: {currentLocation}} = useLocation()
    const {colors:{background}} = useTheme()

    //1 - DECLARE VARIABLES
    const [user, setUser] = useState(route.params.user);
    const [data, setData] = useState([]);

    const [isFetching, setIsFetching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [getUser, {error, refetch}] = useLazyQuery(GET_USER, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
        onCompleted, onError
    });

    //==========================================================================================
    let buttons = [
        {
            name: "settings-outline",
            size: 24,
            onPress: () => sortRef.current.open(),
            color: "#fff",
            type: "ionicon"
        }
    ]

    const sortRef = useRef();
    const mapRef = useRef();

    //==========================================================================================
    // 2 - MAIN CODE BEGINS HERE

    useLayoutEffect(() => navigation.setOptions({
            headerTitle: route.params.user.name,
            headerRight: () => {
                return <RightNavButton buttons={buttons}/>
            }
        }),
        [navigation]);

    useEffect(() => {
        (async () => await getData())();
    }, []);


    //2b - GET DATA
    async function getData(refresh = false) {
        const variables = {id: user.id}

        if (refresh) {
            setIsRefreshing(true)
            await refetch(variables)
        } else {
            setIsFetching(true)
            setData([])
            await getUser({variables})
        }
    }

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    async function onCompleted(resp) {
        if (resp && resp.user) {
            const result = resp['user'];
            const user = result.user;

            setUser(user)
            const drops = user.drops;
            setData(drops)
        }

        setIsFetching(false)
        setIsRefreshing(false)
    }

    function onError(error) {
        alert(error.message)
        setIsRefreshing(false)
    }

    //==================================================================================================
    //4 - UI HANDLERS
    // - RENDER ITEM
    const renderItem = ({item, index}) => {
        return  <ScrollCard item={item}
                            index={index}
                            navigation={navigation}
                            cardStyle={{marginHorizontal: 8}}
                            onPress={() => mapRef.current.onAnimateToRegion(item)}/>

    };

    const renderFooter = () => {
        return null
    }

    const renderMarker = ({item, index, scaleStyle, onScrollToMarker}) => {
        return (
            <CustomMarker index={index}
                          item={item}
                          imageStyle={scaleStyle}
                          onPress={(e) => onScrollToMarker(e)}
                          navigation={navigation}
                          key={`UserCM.${item.id}.item`}/>
        )
    }

    //==========================================================================================
    // 6 - RENDER VIEW
    return (
        <SafeAreaView style={[{flex: 1, backgroundColor:background}]}>
            <DIMapView ref={mapRef}
                       data={data}
                       initialRegion={currentLocation}
                       initialCamera={{
                           altitude: 15000,
                           center: {
                               latitude: currentLocation.latitude,
                               longitude: currentLocation.longitude,
                           },
                           heading: 0,
                           pitch: 0,
                           zoom: 11,
                       }}
                       renderItem={renderItem}
                       renderFooter={renderFooter}
                       renderMarker={renderMarker}
                       onEndReached={null}/>
        </SafeAreaView>
    );
}
