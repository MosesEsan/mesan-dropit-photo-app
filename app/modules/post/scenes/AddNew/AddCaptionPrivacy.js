import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
import {Image, ScrollView, StyleSheet, TextInput, useWindowDimensions, View} from "react-native";

import {Button, ListItem, Switch} from "@rneui/themed";

import {usePost} from "../../PostProvider";
import {useQueue} from "me-helper-views/QueueProvider";
import {useTheme} from "../../../ThemeProvider";

import {MiniMapWithRadius} from "../../components/MiniMap";

import styles from "../styles";
import TagPicker from "../../components/TagPicker/TagPicker";
import KeyboardAvoidingContainer from "../../../../components/KeyboardAvoidingContainer";
import RBSheet from "react-native-raw-bottom-sheet";
import TagUser from "./TagUser";
import {useMutation} from "@apollo/client";
import {UPDATE_DROP} from "../../PostService";

const MAX_LENGTH = 250;

export default function AddCaptionPrivacy(props) {
    const {navigation, route} = props;
    const params = route.params;

    const editMode = params.editMode || false;
    const drop = params.drop;
    const photo = params.drop.photo || params.drop.image || null;

    //0 - DECLARE PROVIDERS VARIABLES
    const {updateData} = usePost();
    const {backgroundColor, textColor} = useTheme();
    const {addToQueue} = useQueue();

    //1 - DECLARE VARIABLES
    const [isEditing, setIsEditing] = useState(false);

    const [isPrivate, setIsPrivate] = useState(editMode ? drop.private : false);
    const [radius, setRadius] = useState(editMode ? drop.radius : 2);
    const [caption, setCaption] = useState(editMode ? drop.caption : "");

    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);

    const [taggedUsers, setTaggedUsers] = useState([]);

    const {height: windowHeight, width: windowWidth} = useWindowDimensions();

    const [updateDrop, {loading, error}] = useMutation(UPDATE_DROP, {onCompleted, onError});

    //==================================================================================================
    //1B -NAVIGATION CONFIG
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: editMode ? "Edit Drop" : "Add Drop"
        });
    }, [navigation]);


    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        Image.getSize(photo, (width, height) => {
            const ratio = 80 / width;
            setWidth(80)
            setHeight(height * ratio)
        });
    }, []);

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    async function onCompleted(data) {
        if (data.updateDrop) {
            setIsEditing(false)
            //TODO:  Test This, why is the dat not being passed
            updateData(data.updateDrop.id)
            navigation.pop()
        }
    }

    function onError(error) {
        setIsEditing(false)
        navigation.pop()
    }

    //==================================================================================================
    //4 - ACTION HANDLERS
    const onFinish = async () => {
        if (!editMode) {
            drop['caption'] = caption;
            drop['radius'] = radius;
            drop['private'] = isPrivate;
            drop["taggedUsers"] = taggedUsers.map((user, idx) => (user.id));

            addToQueue(drop)
            navigation.pop()
        } else {
            setIsEditing(true)

            let taggedUserIds = taggedUsers.map((user, idx) => (user.id));

            let variables = {id: drop.id};
            if (caption.length > 0 && caption !== drop.caption) variables["caption"] = caption;
            if (radius !== drop.radius) variables["radius"] = radius;
            if (isPrivate !== drop.private) variables["private"] = isPrivate;
            if (taggedUserIds !== drop.taggedUsers) variables["taggedUsers"] = taggedUserIds;

            await updateDrop({variables})
        }
    }

    const onDone = (users) => {
        setTaggedUsers(users)
        refRBTagsSheet.current.close();
    }

    const renterTextArea = () => {
        return (
            <View style={newStyles.topContainer}>
                <Image source={{uri: photo}} style={{height, width}}/>
                <TextInput
                    multiline={true}
                    onChangeText={(text) => setCaption(text)}
                    placeholder={"Say something about this drop..."}
                    style={[styles.text, {flex: 1}]}
                    maxLength={MAX_LENGTH}
                    value={caption}/>
            </View>
        )
    }

    // ==========================================================================================
    //5-  RENDER VIEW
    const refRBTagsSheet = useRef();
    return (
        <View style={{flex: 1, backgroundColor}}>
            <KeyboardAvoidingContainer containerStyle={{backgroundColor}}>
                <ScrollView style={{backgroundColor}} contentContainerStyle={{paddingBottom: 80, flexGrow: 1}}>
                    {renterTextArea()}
                    <View style={newStyles.section}>
                        <MiniMapWithRadius item={drop} navigation={navigation}
                                           radius={radius}
                                           style={{flex: 1}}
                                           trackStyle={{backgroundColor: textColor}}
                                           thumbStyle={{height: 20, width: 20, backgroundColor: "#000"}}
                                           value={radius}
                                           containerStyle={[styles.sliderContainer, {padding: 14}]}
                                           onValueChange={(value) => setRadius(value)}/>
                    </View>
                    <View style={[newStyles.section]}>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Private</ListItem.Title>
                                <ListItem.Subtitle>
                                    {"Tag your friends and followers."}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <Switch value={isPrivate} onValueChange={setIsPrivate}/>
                        </ListItem>
                        {isPrivate && <TagPicker users={taggedUsers}
                            // onAdd={() => navigation.navigate('TagUsers')}
                                                 onAdd={() => refRBTagsSheet.current.open()}
                        />}
                    </View>
                </ScrollView>
            </KeyboardAvoidingContainer>
            <Button title={editMode ? "Done" : "Finish"}
                    onPress={onFinish}
                    containerStyle={[{margin: 12, marginBottom: 32}]}
                    loading={isEditing}
                    buttonStyle={[newStyles.button]}
                    disabledStyle={[newStyles.button]}
                    titleStyle={newStyles.buttonText}/>
            <RBSheet ref={refRBTagsSheet} closeOnPressMask={false} height={windowHeight / 2}>
                <TagUser onDone={onDone}/>
            </RBSheet>
        </View>
    );
};

AddCaptionPrivacy.defaultProps = {
    editMode: false
}


const newStyles = StyleSheet.create({

    section: {marginTop: 12, marginHorizontal: 8, backgroundColor: "#fff", borderRadius: 12, overflow:"hidden"},
    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#C55110",
        marginTop: 10
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 17,
        fontFamily: 'Helvetica Neue',
        textAlign: "center",
        color: "#fff",
    },

    topContainer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: 12,
    }
})
