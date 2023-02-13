import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, Text} from 'react-native';

import {useLazyQuery} from "@apollo/client";
import {EmptyView, MEListView} from "me-helper-views";

import {GET_USERS} from "../UserService";

import UserItem from "../components/UserItem";
import {showToast} from "../../../AppUtil";
import {useTheme} from "@react-navigation/native";

export default function Users(props) {

    //0 - DECLARE PROVIDERS VARIABLES
    const  {colors} = useTheme()

    //==========================================================================================
    //1 - DECLARE VARIABLES
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    const [isRefreshing, setIsRefreshing] = useState(true);
    const [isFetching, setIsFetching] = useState(true);
    const [following, setFollowing] = useState([]);

    //==========================================================================================
    // 2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => getData())();
    }, []);

    //2b - GET DATA
    async function getData(refresh=false) {
        const variables = {}

        if (refresh) {
            setIsRefreshing(true)
            await refetch(variables)
        } else {
            setIsFetching(true)
            setUsers([])
            await getUsers({variables})
        }
    }

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    const [getUsers, {refetch}] = useLazyQuery(GET_USERS, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
        onCompleted, onError
    });
    function onCompleted(data) {
        if (data && data.users) {
            const result = data.users;
            const {users, following} = result;
            const ids = following.map((follow) => follow.userId.toString())
            setUsers(users)
            setFollowing(ids)
        }
        setIsFetching(false)
        setIsRefreshing(false)
    }

    function onError(error) {
        setError(error.message)
        showToast('error', 'Something went wrong.', error.message)

        setIsFetching(false)
        setIsRefreshing(false)
    }

    //==================================================================================================
    //4 - UI HANDLERS
    //4a - RENDER ITEM
    const renderItem = ({item, index}) => {
        return (
            <UserItem {...props} item={item}
                      following={() => isFollowing(item.id)}
                      onError={(error) => showToast('error', 'Something went wrong.', error.message)}/>
        )
    };

    //4b - RENDER EMPTY
    const renderEmpty = () => {
        return (
            <EmptyView title={"No Users"} message={""}/>
        )
    };

    //==================================================================================================
    //5 - ACTION HANDLERS
    const isFollowing = useCallback((id) => {
        return following.includes(id.toString())
    }, [following])

    //==========================================================================================
    // 6 - RENDER VIEW
    return (
        <SafeAreaView style={[{flex: 1}]}>
            <MEListView
                isFetching={isFetching}
                error={error}
                activityIndicatorStyle={{backgroundColor:colors.background}}
                errorViewStyle={{backgroundColor:colors.background}}
                data={users || []}
                extraData={users || []}
                initialNumToRender={10}
                style={{paddingHorizontal: 0, flex:1}}
                contentContainerStyle={{flexGrow: 1}}
                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}
                keyExtractor={(item, index) => `user_${item['id'].toString()}${index.toString()}`}
                refreshing={isRefreshing}
                onRefresh={() => getData(true)}/>
        </SafeAreaView>
    );
};
