import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    KeyboardAvoidingView,
    View, Text, StyleSheet, Keyboard
} from 'react-native';

import {useLazyQuery, useMutation} from '@apollo/client'
import FastImage from "react-native-fast-image";
import {EmptyView} from "me-helper-views";
import moment from "moment";
import {Icon} from "@rneui/themed";

import {ADD_COMMENT, GET_COMMENTS} from "../CommentService";

import CommentBox from "../components/CommentBox";
import DIListView from "me-helper-views/MEListView";

export function Header({onClose, text}) {
    return (
        <View style={styles.header}>
            <Text style={{flex: 1, fontSize: 16, fontWeight: "700"}}>{text}</Text>
            <Icon
                size={34}
                name={'ios-close'}
                type={'ionicon'}
                color={'#000'}
                onPress={onClose}
            />
        </View>
    )
}

export default function Comments({item, onSetComments, onClose}) {
    //1 - DECLARE VARIABLES
    const [loading, setLoading] = useState(true);
    const [isSavingComment, setIsSavingComment] = useState(false);
    const [error, setError] = useState(null);

    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);

    const [getComments, {}] = useLazyQuery(GET_COMMENTS, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
        onCompleted, onError
    });

    const [addComment] = useMutation(ADD_COMMENT, {
        onCompleted: onAddCompleted, onError
    });

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        setLoading(true)

        if (item) (async () => await getData())();
    }, [item]);


    async function getData() {
        setLoading(true)
        let variables = {dropId: parseInt(item.id)}
        await getComments({variables})
    }

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    function onCompleted(data) {
        setComments(data.comments)
        setLoading(false)
    }

    function onError(error) {
        setError(error.message)
        setLoading(false)
    }

    function onAddCompleted(data) {
        setText("");
        Keyboard.dismiss()
        setIsSavingComment(false)
        let [...clone] = comments;
        clone.unshift(data.addComment);
        setComments(clone)
        onSetComments(item.id, clone.length)
    }

    //==================================================================================================
    //4 - UI HANDLERS
    //RENDER ITEM
    const renderItem = ({item}) => {
        let milliseconds = moment(parseInt(item.createdAt)).valueOf();
        const date = moment(moment(milliseconds)).fromNow()

        return (
            <View style={[styles.container, {flexDirection: "row"}]}>
                <FastImage source={{uri: item.user.image}}
                           style={styles.userImage}/>
                <View style={{flex: 1, marginLeft: 12}}>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <Text
                            style={styles.username}>
                            {item.user.name}
                        </Text>
                        <Text style={styles.divider}>•</Text>
                        <Text style={styles.date}>
                            {date}
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        {item.text}
                    </Text>
                </View>
            </View>
        )
    }

    //RENDER EMPTY
    const renderEmpty = () => {
        return (
            <EmptyView title={"No comments yet."} message={"Say something to start the conversation."}/>
        )
    };

    //==================================================================================================
    //5 - ACTION HANDLERS
    async function onAddComment() {
        if (text.length > 0) {
            setIsSavingComment(true)
            await addComment({variables: {text, dropId: item.id}});
        }
    }

    //==================================================================================================
    //6 - RENDER VIEW
    return (
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
                <Header onClose={onClose} text={`${comments.length} Comments`}/>
                <DIListView
                    activityIndicatorColor={"black"}
                    isFetching={loading}
                    error={error}
                    onRetry={getData}
                    contentContainerStyle={{flexGrow: 1,}}
                    data={comments}
                    extraData={[]}
                    initialNumToRender={10}
                    renderItem={renderItem}
                    ListEmptyComponent={renderEmpty}
                    refreshing={false}
                    onRefresh={getData}
                    keyExtractor={(item, index) => `item_${item['id'].toString()}${index.toString()}`}/>
                {
                    item &&
                    <CommentBox text={text}
                                onChangeText={(text) => setText(text)}
                                onPress={onAddComment}
                                isSavingComment={isSavingComment}/>
                }
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    divider: {
        borderColor: "transparent",
        paddingHorizontal: 4,
        fontSize: 12
    },

    username: {
        fontWeight: "bold", fontSize: 12
    },

    date: {
        color: "#aaa", fontSize: 12
    },

    userImage: {
        height: 35, width: 35, borderRadius: 50, backgroundColor: "#eee"
    },

    container: {
        paddingTop: 12,
        paddingBottom: 12, flex: 1, paddingHorizontal: 12,
    },

    header: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },

    text: {
        lineHeight: 21, fontSize: 15, marginTop: 8
    }

});
