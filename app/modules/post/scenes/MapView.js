import React, {useEffect, useRef} from 'react';

import {useAuth} from "../../auth/AuthProvider";
import {useMap} from "../MapProvider";
import {usePost} from "../PostProvider";
import {useLocation} from "../../../components/location/LocationProvider";
import {useSetting} from "../../setting/SettingProvider";

import DIMapView from "../components/DIMap";
import DIHeader from "../../../components/DIHeader";
import CustomMarker from "../components/CustomMarker";
import ScrollCard, {EmptyCard} from "../components/Card/ScrollCard";
import {DIContainer} from "../../../components/MeHelperViews";

import {PRIVATE} from "./Posts";

export default function DIIMapView(props) {
    const {navigation} = props;

    const {state: {currentLocation}} = useLocation()
    const {newMarker, hasNewMarker, removeNewMarker} = useMap()

    const {state: {currentUser}} = useAuth();
    const {state:{data, isFetching, isFetchingMore, nextPage}} = usePost();
    const {state: {filterType}} = useSetting();

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        if (newMarker !== null) {
            onAnimateToRegion(newMarker)
            removeNewMarker()
        }
    }, [hasNewMarker]);


    let buttons = [
        {
            name: 'add-circle-outline',
            size: 30,
            onPress: () => navigation.navigate('Create'),
            color: "#000",
            type: "ionicon",
        },
        {
            name: filterType === PRIVATE ? "user-tag" : "public",
            size: 24,
            onPress: () => filterRef.current.open(),
            color: "#000",
            type: filterType === PRIVATE ? "font-awesome-5" : "materialicon"
        },
        {
            name: "settings-outline",
            size: 24,
            onPress: () => sortRef.current.open(),
            color: "#000",
            type: "ionicon"
        }
    ]

    const sortRef = useRef();
    const filterRef = useRef();
    const optionsRef = useRef();
    const mapRef = useRef();

    //==================================================================================================
    //4 - UI HANDLERS
    // - RENDER ITEM
    const renderItem = ({item, index}) => {
        return  <ScrollCard item={item}
                            index={index}
                            navigation={navigation}
                            cardStyle={{marginHorizontal: 8}}
                            data={data}
                            onPress={() => mapRef.current.onAnimateToRegion(item)}/>
    };

    const renderFooter = () => {
        if (nextPage != null) return <EmptyCard cardStyle={{marginHorizontal: 8}}/>
        else return null
    }

    const renderMarker = ({item, index, scaleStyle, onScrollToMarker}) => {
        return (
            <CustomMarker index={index}
                          item={item}
                          imageStyle={scaleStyle}
                          onPress={(e) => onScrollToMarker(e)}
                          navigation={navigation}
                          key={`CM.${item.id}.item`}/>
        )
    }

    //==================================================================================================
    //5 - ACTION HANDLERS
    let onEndReached = () => {
        //if not currently fetching more and theres a next page
        if (!isFetchingMore && nextPage) {
            // onFetchMore()
        }
    }

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

    //==========================================================================================
    // 6 - RENDER VIEW
    return (
        <DIContainer containerStyle={{ flex: 1}}
                     navigation={navigation}
                     sortRef={sortRef}
                     filterRef={filterRef}
                     optionsRef={optionsRef}>
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
                       onEndReached={onEndReached}/>
            <DIHeader onPressLeft={() => navigation.goBack()} buttons={buttons} containerStyle={{borderRadius:50, backgroundColor:"#fff"}}/>
        </DIContainer>
    );
}
