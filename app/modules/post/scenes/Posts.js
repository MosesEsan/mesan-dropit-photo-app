import React, {useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';

import {useLazyQuery, useMutation} from "@apollo/client";
import Toast from "react-native-toast-message";

import {useTheme} from "../../ThemeProvider";
import {usePost} from "../PostProvider";
import {useAuth} from "../../auth/AuthProvider";
import {useLocation} from "../../../components/location/LocationProvider";
import {PRIVATE, useSetting} from "../../setting/SettingProvider";

import {ADD_DROP, DELETE_DROP, GET_DROPS} from "../PostService";

import {EmptyView, QueueView} from "me-helper-views";

import {DIContainer, DIListView} from "../../../components/MeHelperViews";
import CardContainer,{EmptyCard} from "../components/Card/CardContainer";

import {useQueue} from "me-helper-views/QueueProvider";

import {API_KEY, SECRET, CLOUD_NAME} from "../../../config"
let config = {api_key:API_KEY, api_secret:SECRET, cloud_name:CLOUD_NAME};

export default function Posts({navigation}) {
    //1 - DECLARE VARIABLES
    const [toBeDeleted, setToBeDeleted] = useState(null)
    const {state: {currentLocation}} = useLocation();
    const {state: {isLoggedIn, currentUser}, handleLogout} = useAuth();
    const {state: {radius, orderBy, filterType, showAll}} = useSetting();

    const {backgroundColor, secondaryColor, textColor} = useTheme();
    const {state, setLoading, setIsFetchingMore, setData, setError, addData, updateData, deleteData} = usePost();

    const {data, error, isFetching, isFetchingMore, isRefreshing, nextPage} = state;

    const {queue, removeFromQueue} = useQueue();

    const [getDrops, {refetch}] = useLazyQuery(GET_DROPS, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
        onCompleted, onError
    });
    const [deleteDrop] = useMutation(DELETE_DROP, {onCompleted: onDeleteCompleted, onError: onDeleteError});


    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => {
            if (!isLoggedIn) await handleLogout();
            else if (isLoggedIn && currentLocation) await getData()
        })();
    }, [isLoggedIn, currentLocation, filterType, orderBy, radius, showAll]);

    //2b - GET DATA
    async function getData(refresh = false) {
        setLoading(true, refresh);
        const variables = {};

        variables['latitude'] = currentLocation.latitude
        variables['longitude'] = currentLocation.longitude
        variables['radius'] = radius

        variables["private"] = filterType;
        variables['orderBy'] = orderBy
        variables["showAll"] = showAll;

        // if (refresh) await refetch(variables)
        if (refresh) await getDrops({variables})
        else {
            await getDrops({variables})
        }
    }

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    async function onCompleted(data) {
        if (data.drops) {
            await setData(data.drops);
            setTimeout(() => setLoading(false), 300)
        }
    }

    function onError(error) {
        setError(error.message)
        showToast('error', 'Something went wrong.', error.message)
        setLoading(false);
    }

    async function onDeleteCompleted(data) {
        if (data.deleteDrop) {
            deleteData(data.deleteDrop.id)
        }
    }

    function onDeleteError(error) {
        alert(error.message)
        showToast('error', 'Something went wrong.', error.message)
    }

    //==================================================================================================
    //4 - UI HANDLERS
    // - RENDER ITEM
    //TODO : Refactor
    const renderItem = ({item, i: index}) => {
        return (
            <CardContainer item={item}
                     index={index}
                     navigation={navigation}
                     key={`DIDrop.${item.id}.drop`}
                     user={currentUser}
                     currentLocation={currentLocation}
                     onOptions={onOptions}
                     onLike={onLike}
                     data={data}
                     onError={(error) => showToast('error', 'Something went wrong.', error.message)}
            />
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

    // - RENDER FOOTER
    const renderFooter = () => {
        if (nextPage != null) return <EmptyCard cardStyle={{marginHorizontal: 8}}/>
        else return null
    }

    //==================================================================================================
    //5 - ACTION HANDLERS
    function showToast(type, title, message) {
        Toast.show({
            type: type,
            text1: title,
            text2: message
        });
    }

    const onEdit = (drop) => {
        navigation.navigate('Create', {
            screen: 'AddCaptionPrivacy',
            params: {editMode: true, drop}
        })
    };

    const onDelete = (id) => {
        Alert.alert(
            'Delete Item',
            "Are you sure you want to delete this item?",
            [
                {text: 'Delete', onPress: () => deleteDrop({variables: {id}})},
                {text: 'Cancel', style: 'cancel'}
            ],
            {cancelable: true},
        );
    };

    const onOptions = (id) => {
        setToBeDeleted(id)
        // refRBOptionsSheet.current.open()
    };

    // CREATE
    async function onAddCompleted(data, id) {
        if (filterType === data.private) addData(data)
        removeFromQueue(id)
    }

    function onAddError(error) {
        setError(error.message)
        Toast.show({
            type: 'error',
            text1: 'Something went wrong.',
            text2: error.message
        });
    }

    const onLike = (id, likes) => {
        updateData(id, {likes:likes})
    }

    // ==========================================================================================
    //5-  RENDER VIEW
    return (
        <DIContainer containerStyle={{backgroundColor, flex: 1}}
                     navigation={navigation}
                     onEdit={onEdit}
                     onDelete={onDelete}>
            <DIListView
                grid={true}
                isLoggedIn={isLoggedIn}
                isFetching={isFetching}
                error={error}
                onRetry={getData}
                onLoggedOut={handleLogout}
                style={{paddingBottom: 0, backgroundColor}}
                contentContainerStyle={{flexGrow: 1, paddingHorizontal: 0}}

                numColumns={2}
                data={data}
                extraData={data}
                initialNumToRender={10}

                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}
                ListHeaderComponent={
                <QueueView
                    cloudinaryConfig={config}
                    queue={queue[0]}
                    mutation={ADD_DROP}
                    textColor={textColor}
                    onCompleted={onAddCompleted} onError={onAddError}
                    containerStyle={{backgroundColor: secondaryColor}}/>}
                ListFooterComponent={renderFooter}

                keyExtractor={(item, index) => `drop_card${item['id'].toString()}`}
                refreshing={isRefreshing}
                onRefresh={() => getData(true)}/>

        </DIContainer>
    );
}
