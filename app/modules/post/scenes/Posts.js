import React, {useEffect, useMemo} from 'react';
import { View} from "react-native";
import {useLazyQuery} from "@apollo/client";
import {EmptyView} from "me-helper-views";
import {useNavigation} from "@react-navigation/native";

import {usePost} from "../PostProvider";
import {useAuth} from "../../auth/AuthProvider";
import {useLocation} from "../../../components/location/LocationProvider";
import {PRIVATE, useSetting} from "../../setting/SettingProvider";

import {GET_DROPS} from "../PostService";

import DIListView from "../../../components/DIListView";
import CardContainer from "../components/Card/CardContainer";
import {CardPlaceholder} from "../components/Card/";

import {showToast} from "../../../AppUtil";
import PostsContainer from "./PostsContainer";

export default function Posts(props) {
    //DECLARE PROVIDERS VARIABLES
    const navigation = useNavigation()
    const {state: {currentLocation}, getCurrentLocation} = useLocation();
    const {state: {isLoggedIn, currentUser}, handleLogout} = useAuth();
    const {state: {radius, orderBy, filterType, showAll}} = useSetting();
    const {
        data, error,
        isFetching, isRefreshing,
        setLoading, setData, setError, update
    } = usePost();

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => {
            if (isLoggedIn && currentLocation) await getData()
        })();
    }, [isLoggedIn, currentLocation, filterType, orderBy, radius, showAll]);


    //2b - GET DATA
    async function getData(refresh = false) {
        setLoading(true, refresh);

        if (currentLocation === null){
            await getCurrentLocation(null, null)
        }else{
            const variables = {};

            variables['latitude'] = currentLocation.latitude
            variables['longitude'] = currentLocation.longitude
            variables['radius'] = radius

            variables["private"] = filterType || false;
            variables['orderBy'] = orderBy
            variables["showAll"] = showAll;

            await getDrops({variables});
        }
    }

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    const [getDrops] = useLazyQuery(GET_DROPS, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
        onCompleted, onError
    });

    async function onCompleted(data) {
        if (data.drops) {
            await setData(data.drops);
            setTimeout(() => setLoading(false), 100)
        }
    }
    function onError(error) {
        setError(error.message)
        showToast('error', 'Something went wrong.', error.message)
        setLoading(false);
    }

    //==================================================================================================
    //4 - UI HANDLERS
    // - RENDER ITEM
    const carouselData = useMemo(() => data, [data]);
    const renderItem = ({item, index}) => {
        let onPress = () => navigation.navigate('Detail', {item, index, helper:{data:carouselData, update}})
        return (
            <CardContainer item={item}
                           index={index}
                           key={`DIDrop.${item.id}.drop`}
                           user={currentUser}
                           onPress={onPress}/>
        )
    };

    //4b - RENDER EMPTY
    const renderEmpty = () => {
        let title = "No Drops Around Here"
        let message = "Increase your radius to widen your search.";
        if (filterType === PRIVATE) {
            title = "No Tagged Drops Around Here"
            message = "When someone tags you in a drop you'll see it here. Increase your radius to widen your search."
        }
        return (
            <EmptyView title={title} message={message}/>
        )
    };

    // - RENDER LOADING
    const renderLoading = () => {
        return (
            <View style={{flex:1}}>
                <CardPlaceholder/>
                <CardPlaceholder />
            </View>
        )
    }

    // ==========================================================================================
    //5-  RENDER VIEW
    return (
        <PostsContainer>
            <DIListView
                // grid={true}
                isLoggedIn={isLoggedIn}
                isFetching={isFetching}
                error={error}
                onRetry={getData}
                onLoggedOut={handleLogout}
                style={{paddingBottom: 0}}
                contentContainerStyle={{flexGrow: 1, paddingHorizontal: 0}}

                numColumns={1}
                data={data}
                extraData={data}
                initialNumToRender={10}

                renderLoading={renderLoading}
                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}
                // ListFooterComponent={renderFooter}
                keyExtractor={(item) => `drop_card${item['id'].toString()}`}
                refreshing={isRefreshing}
                onRefresh={() => getData(true)}/>
        </PostsContainer>

    );
}
