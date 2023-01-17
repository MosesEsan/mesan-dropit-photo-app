import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, ActivityIndicator, FlatList, Image, StyleSheet, View, Pressable} from 'react-native';

import {useLazyQuery, useMutation} from "@apollo/client";
import {EmptyView, ErrorView} from "me-helper-views";

//import {useNotification} from "../NotificationProvider";
import {GET_BLOCKED_USERS, UNBLOCK_USER} from "../../AccountService";

export default function Basic(props) {
    //0 - DECLARE PROVIDERS VARIABLES
    // If using Provider
    // const {state, setLoading, setData, setError} = useNotification();
    // const {data, error, isFetching, isRefreshing} = state;

    //1 - DECLARE VARIABLES
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

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
            setData([])
            await getBlockedUsers({variables})
        }
    }

    //===========================================================================================
    //3 - GRAPHQL
    //0 - GRAPHQL HOOKS
    const [getBlockedUsers, {refetch}] = useLazyQuery(GET_BLOCKED_USERS, {
        fetchPolicy: 'network-only',
        onCompleted, onError
    });

    const [unBlockUser] = useMutation(UNBLOCK_USER, {
        onCompleted: () => alert("You have unblocked the user"),
        onError: (error) => alert(error.message)
    });

    function onCompleted(data) {
        if (data && data.blockedUsers) {
            setData(data.blockedUsers)
        }
        setIsFetching(false)
        setIsRefreshing(false)
    }

    function onError(error) {
        setError(error.message)
        setIsFetching(false)
        setIsRefreshing(false)
    }

    //==============================================================================================
    //4 - ACTION HANDLERS
    //4a - RENDER ITEM
    const renderItem = ({item, index}) => {
        return (
            <Pressable onPress={() => unBlockUser({variables: {userId: item.user.id}})}>
                <View style={styles.container}>
                    <Image source={{uri: item.user.image}} style={styles.image}/>
                    <Text style={{color: "#fff", marginLeft: 14, fontSize: 17}}>{item.user.name}</Text>
                </View>
            </Pressable>
        )
    };

    //4b - RENDER EMPTY
    const renderEmpty = () => {
        if (isFetching) return <ActivityIndicator style={[{flex: 1}]}/>;

        if (error) return <ErrorView message={error} />;

        return(
            <EmptyView title={"No Blocked Users."}
                       message={"You haven't blocked any users. When your block a user, they will appear here."}
                       titleStyle={{color: "#aaa"}}
                       textStyle={{color: "#aaa"}}/>
        )
    };

    //==========================================================================================
    // 5 - RENDER VIEW
    return (
        <SafeAreaView style={[{flex:1}]}>
            <FlatList
                data={data}
                extraData={data}
                initialNumToRender={10}

                style={{paddingHorizontal: 8}}
                contentContainerStyle={{flexGrow: 1}}

                renderItem={renderItem}
                // ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmpty}


                keyExtractor={(item, index) => `item_${item['id'].toString()}${index.toString()}`}
                refreshing={isRefreshing}
                onRefresh={() => getData(true)}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        backgroundColor: "rgb(30,30,30)",
        borderRadius: 6,
        padding: 14,
        flexDirection:"row",
        alignItems: "center"
    },

    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: "#eee"
    }
});
