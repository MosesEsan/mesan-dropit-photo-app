import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, SafeAreaView, View} from 'react-native';

import moment from "moment";
import {useLazyQuery} from "@apollo/client";
import {ListItem} from "@rneui/themed";
import Toast from "react-native-toast-message";

import {useTheme} from "../../ThemeProvider";
import {GET_NOTIFICATIONS} from "../NotificationService";

import {DIListView, EmptyView} from "../../../components/MeHelperViews";

import {myFromNow} from "../../post/helper";
import FastImage from "react-native-fast-image";
import {SharedElement} from "react-navigation-shared-element";

export default function Notifications({navigation}) {
    //0 - DECLARE PROVIDERS VARIABLES
    const {backgroundColor} = useTheme();
    const [getNotifications, {refetch}] = useLazyQuery(GET_NOTIFICATIONS, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
        onCompleted, onError
    });

    //==========================================================================================
    //1 - DECLARE VARIABLES
    const [data, setData] = useState([]);
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
        const variables = {}

        if (refresh) {
            setIsRefreshing(true)
            await refetch(variables)
        } else {
            setIsFetching(true)
            setData([])
            await getNotifications({variables})
        }
    }

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    function onCompleted(data) {
        if (data && data.notifications)
            setData(data.notifications)

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
        let milliseconds = moment(parseInt(item.createdAt)).valueOf();
        const date = myFromNow(moment(milliseconds), moment(), true)

        let text = " tagged you in a drop."
        let onPress = () => navigation.navigate('Notification', {notification: item})

        if (item.type === "LIKE") text = " liked your drop"
        else if (item.type === "COMMENT") text = " left a comment on your drop"

        if (item.type !== "TAGGED") {
            onPress = () => navigation.navigate('Detail', {item, index:0, data:[item.drop], showComments:(item.type === "COMMENT")})
        }

        return (
            <ListItem containerStyle={styles.container}
                      onPress={onPress}>
                <Image source={{uri: item.drop.user.image}} style={styles.image}/>
                <ListItem.Content>
                    <Text style={{color: "#fff"}}>
                        <Text style={{color: "#fff", fontWeight: "700"}}>{item.drop.user.name}</Text>
                        <Text>{text}</Text>
                        <Text style={{color: "#ccc"}}> {date}</Text>
                    </Text>
                </ListItem.Content>
                {
                    (item.type !== "TAGGED") &&
                    <SharedElement id={`item.${item.id}.image_url`}>
                        <FastImage
                            source={{
                                uri: item.drop.image,
                                cache: FastImage.cacheControl.immutable,
                                priority: FastImage.priority.normal
                            }}
                            style={[{height: 70, width: 50}]}
                            loaderBGColor={"#ccc"}
                            resizeMode={FastImage.resizeMode.cover}>
                        </FastImage>
                    </SharedElement>
                }
            </ListItem>
        )
    };

    //4b - RENDER EMPTY
    const renderEmpty = () => {
        return (
            <EmptyView title={"No Notifications."}
                       message={"When someone tags you in a drop, likes or comments on one of your drops, you'll see it here."}/>
        )
    };

    //==================================================================================================
    //4 - ACTION HANDLERS
    function showToast(type, title, message) {
        Toast.show({
            type: type,
            text1: title,
            text2: message
        });
    }

    //==========================================================================================
    // 5 - RENDER VIEW
    return (
        <SafeAreaView style={[{flex: 1}, {backgroundColor}]}>
            <DIListView
                isFetching={isFetching}
                error={error ? error.message : null}
                onRetry={getData}

                style={{paddingBottom: 0, backgroundColor}}
                contentContainerStyle={{flexGrow: 1, paddingHorizontal: 0}}
                errorViewStyle={{backgroundColor}}

                data={data}
                extraData={data}
                initialNumToRender={10}

                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}

                keyExtractor={(item, index) => `notification_${item['id'].toString()}${index.toString()}`}
                refreshing={isRefreshing}
                onRefresh={() => getData(true)}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        marginHorizontal: 8,
        backgroundColor: "rgb(30,30,30)",
        borderRadius: 6
    },

    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: "#eee"
    }
});
