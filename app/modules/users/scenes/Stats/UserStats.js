import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {useLazyQuery} from "@apollo/client";

import {GET_USER_FOLLOWERS} from "../../UserService";

import UserItem from "../../components/UserItem";
import {DIListView} from "../../../../components/MeHelperViews";
import {EmptyView} from "me-helper-views";
import {useTheme} from "@react-navigation/native";
import {showToast} from "../../../../AppUtil";

export default function Followers(props) {
    const {user} = props.route.params;
    const type = props.type || null;

    //0 - DECLARE PROVIDERS VARIABLES
    const {colors} = useTheme()

    //1 - DECLARE VARIABLES
    const [data, setData] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);

    //==========================================================================================
    // 2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => getData())();
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
    const [getUser, {refetch}] = useLazyQuery(GET_USER_FOLLOWERS, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
        onCompleted, onError
    });

    function onCompleted(resp) {
        if (resp && resp.user) {
            const result = resp['user'];
            const stats = result.user[type];
            let key = (type === "followers") ? 'follower' : 'user'

            const data = stats.map((stat) => stat[key])
            const followingUserIds = result.following.map((follow) => follow.userId)

            setData(data)
            setFollowing(followingUserIds)
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
        let title = ""
        let message = "";

        if (type === "followers") {
            title = "No Followers"
            message = "This user has no followers."
        } else if (type === "following") {
            title = "No Users"
            message = "This user is not following anyone."
        }
        return (
            <EmptyView title={title} message={message}/>
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
        <SafeAreaView style={[{flex: 1, backgroundColor:colors.background }]}>
            <DIListView
                isFetching={isFetching}
                error={error}
                activityIndicatorStyle={{backgroundColor:colors.background }}
                errorViewStyle={{backgroundColor:colors.background }}
                data={data || []}
                extraData={data || []}
                initialNumToRender={10}
                style={{paddingHorizontal: 0, flex: 1, backgroundColor:colors.background }}
                contentContainerStyle={{flexGrow: 1}}
                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}
                keyExtractor={(item, index) => `followers_${item['id'].toString()}${index.toString()}`}
                refreshing={isRefreshing}
                onRefresh={() => getData(true)}/>
        </SafeAreaView>
    );
};
