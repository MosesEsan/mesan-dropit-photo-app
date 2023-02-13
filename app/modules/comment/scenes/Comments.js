import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    View, Text, StyleSheet, Keyboard, Platform
} from 'react-native';

import {useLazyQuery, useMutation} from '@apollo/client'
import {useTheme} from "@react-navigation/native";
import {EmptyView} from "me-helper-views";
import {Icon} from "@rneui/themed";

import {ADD_COMMENT, GET_COMMENTS} from "../CommentService";

import DIListView from "../../../components/DIListView";

import {CommentHeader, CommentItem, CommentInput, CustomKeyboardAvoidingView} from "../components";
import useCRUD from "me-helper-views/hooks/useCRUD";

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

export default function Comments({navigation, route}) {
    const {item} = route.params;

    const {colors} = useTheme();

    //1 - DECLARE VARIABLES
    const [loading, setLoading] = useState(true);
    const [isSavingComment, setIsSavingComment] = useState(false);
    const [error, setError] = useState(null);

    const [text, setText] = useState("");
    const {data: comments, setData: setComments, create, destroy} = useCRUD([])

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        if (item) {
            (async () => await getData())();
        } else navigation.goBack()
    }, [item]);

    async function getData() {
        setLoading(true)
        let variables = {dropId: parseInt(item.id)}
        await getComments({variables})
    }

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    const [getComments, {}] = useLazyQuery(GET_COMMENTS, {
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
        onCompleted, onError
    });

    function onCompleted(data) {
        setComments(data.comments)
        setLoading(false)
    }

    function onError(error) {
        alert("err")
        setError(error.message)
        setLoading(false)
    }

    const [addComment] = useMutation(ADD_COMMENT, {onCompleted: onAddCompleted, onError});
    function onAddCompleted(data) {
        setText("");
        Keyboard.dismiss()
        setIsSavingComment(false)
        create(data.addComment)
    }

    //==================================================================================================
    //4 - UI HANDLERS
    //RENDER HEADER
    const renderHeader = () => {
        return <CommentHeader item={item}/>
    }

    //RENDER ITEM
    const renderItem = ({item}) => {
        return <CommentItem item={item}/>
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
        <SafeAreaView style={{flex: 1, backgroundColor: "transparent"}}>
            <CustomKeyboardAvoidingView
                                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                  style={Platform.OS === 'ios' && {flex: 1}}
                                  keyboardVerticalOffset={30}>
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
                        ListHeaderComponent={renderHeader}
                        ListEmptyComponent={renderEmpty}
                        refreshing={false}
                        onRefresh={getData}
                        style={{   flex: 1}}
                        keyExtractor={(item, index) => `item_${item['id'].toString()}${index.toString()}`}/>
                    {
                        item &&
                        <CommentInput text={text}
                                      containerStyle={{backgroundColor: colors.secondary}}
                                      onChangeText={(text) => setText(text)}
                                      onPress={onAddComment}
                                      isSavingComment={isSavingComment}/>
                    }
            </CustomKeyboardAvoidingView>
         </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    divider: {
        borderColor: "transparent",
        paddingHorizontal: 4,
        fontSize: 12,
        color: "#fff", lineHeight: 21, marginTop: 0
    },

    username: {
        fontSize: 14, color: "#fff",
    },

    date: {
        color: "#aaa", fontSize: 12, lineHeight: 22
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
        color: "#fff",
        lineHeight: 21, fontSize: 14,
        marginTop: 4
    }

});
