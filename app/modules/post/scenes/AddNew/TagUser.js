import React, {useEffect, useState, useMemo, useLayoutEffect} from "react";
import {Pressable, Text, View} from "react-native"

import {useLazyQuery} from "@apollo/client";
import {MEListView, EmptyView} from "me-helper-views";


import {GET_FOLLOWERS} from "../../../users/UserService";

import TagUserItem from "../../components/TagPicker/TagUserItem";
import {useTheme} from "@react-navigation/native";
import {getNavButtons} from "../../PostConfig";
import {DINavButton, DINavButtons, DINavTitle} from "../../../../components/DIHeader";
import NavUserImage from "../../../../components/NavUserImage";

export default function TagUser({navigation, onDone}){
    //1 - DECLARE VARIABLES
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [followers, setFollowers] = useState([]);

    const {colors} = useTheme();

    const [getFollowers, {loading: isFetching, error}] = useLazyQuery(GET_FOLLOWERS, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
        onCompleted, onError
    });
    //==================================================================================================
    //NAVIGATION CONFIG
    useLayoutEffect(() => {
        navigation.setOptions({headerTitle: "Select Users to Tag",});
    }, [navigation]);

    //==========================================================================================
    // 2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => getData())();
    }, []);

    //2b - GET DATA
    async function getData() {
        await getFollowers({variables: {}})
    }

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    function onCompleted(data) {
        let allFollowers = data.followers.map((obj, idx) => obj.follower);
        setFollowers(allFollowers)
    }

    function onError(error) {
        alert(error.message)
    }

    //==================================================================================================
    //4 - ACTION HANDLERS
    const onSelectUser = (val, user) => {
        let [...clone] = selectedUsers;
        const index = clone.findIndex((obj) => obj.id === user.id);
        if (index !== -1) {
            clone = clone.filter((obj) => obj.id !== user.id);
        }else clone.push(user)

        setSelectedUsers(clone)
    }

    const checkedUsers = useMemo(() => {
        return selectedUsers.map((user, idx) => (user.id));
    }, [selectedUsers]);

    //==================================================================================================
    //4 - UI ACTION HANDLERS
    const renderItem = ({item, index}) => {
        return (
            <TagUserItem key={`icon_user_${index}`} item={item} index={index} onSelectUser={onSelectUser}
            checked={checkedUsers.includes(item.id)}/>
        )
    };

    // onDone(selectedUsers)
    //4b - RENDER EMPTY
    const renderEmpty = () => {
        return <EmptyView title={"No Followers"} message={"You currently have no followers."}/>
    };

    //==========================================================================================
    // 5 - RENDER VIEW
    return (
        <View style={{flex:1, backgroundColor:colors.background}}>
            <MEListView
                isFetching={isFetching}
                error={error}
                data={followers}
                extraData={followers}
                initialNumToRender={10}

                style={{paddingHorizontal: 0, backgroundColor:colors.background}}
                contentContainerStyle={{flexGrow: 1}}

                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}

                keyExtractor={(item, index) => `follower_${item.id.toString()}${index.toString()}`}
                refreshing={false}/>
        </View>

    )
}
