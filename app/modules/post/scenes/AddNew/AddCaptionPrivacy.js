import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
import {
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    useWindowDimensions,
    View
} from "react-native";

import {Button, ListItem, Switch, Header, Icon} from '@rneui/themed';

import {usePost} from "../../PostProvider";
import {useQueue} from "me-helper-views/QueueProvider";


import styles from "../styles";
import TagPicker from "../../components/TagPicker/TagPicker";
import KeyboardAvoidingContainer from "../../../../components/KeyboardAvoidingContainer";
import RBSheet from "react-native-raw-bottom-sheet";
import TagUser from "./TagUser";
import {useMutation} from "@apollo/client";
import {UPDATE_DROP} from "../../PostService";
import {useTheme} from "@react-navigation/native";
import DIText from "../../../../components/DIText";
import {BlurView} from "@react-native-community/blur";
import {DINavButton} from "../../../../components/DIHeader";
import {DIFont} from "../../../../AppConfig";

const MAX_LENGTH = 250;


export const ScrollSelector = ({options, onPress, current, label, valLabel}) => {
    return (
        <View style={[{marginTop: 20, marginRight: 0}]}>
            <DIText semibold style={{color: "#fff", marginLeft: 20}}>
                {label}
            </DIText>
            <ScrollView style={[{flexDirection: "row", marginTop: 8}]} horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                {
                    options.map((val, idx) => (
                        <Pressable onPress={() => onPress(val)}>
                            <View style={{
                                paddingHorizontal: 20,
                                borderRadius: 20, padding: 8,
                                paddingVertical: 12,
                                marginLeft: 20,
                                justifyContent: "center", alignItems: "center",
                                backgroundColor: (val === current) ? "rgba(255,255,255,1)" : "rgba(255,255,255,.3)"
                            }}>
                                <DIText medium
                                        style={{color: (val === current) ? "#000" : "#fff"}}>{val}{valLabel}</DIText>
                            </View>
                        </Pressable>
                    ))
                }
            </ScrollView>
        </View>
    )

}

export default function AddCaptionPrivacy(props) {
    const {navigation, route} = props;
    const params = route.params;

    const editMode = params.editMode || false;
    const drop = params.drop;
    const photo = params.drop.photo || params.drop.image || null;

    //0 - DECLARE PROVIDERS VARIABLES
    const {updateData} = usePost();
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

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        Image.getSize(photo, (width, height) => {
            const ratio = 170 / width;
            setWidth(170)
            setHeight(height * ratio)
        });
    }, []);

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    const [updateDrop, {loading, error}] = useMutation(UPDATE_DROP, {fetchPolicy: 'no-cache', onCompleted, onError});

    async function onCompleted(data) {
        if (data.updateDrop) {
            const updatedDrop = data.updateDrop;
            const {caption, private: isPrivate, radius} = updatedDrop;

            const retData = {caption, private: isPrivate, radius};
            setIsEditing(false)
            updateData(data.updateDrop.id, retData)
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


    //==================================================================================================
    //4 - UI ACTION HANDLERS
    const renterTextArea = () => {
        return (
            <View style={[]}>
                <View style={{alignItems: "center", paddingTop: 12}}>
                    <Image source={{uri: photo}} style={{
                        height, width, borderRadius: 12,
                    }}/>
                </View>
                <TextInput
                    multiline={true}
                    placeholderTextColor={"#fff"}
                    onChangeText={(text) => setCaption(text)}
                    placeholder={"Say something about this drop..."}
                    style={[styles.text]}
                    maxLength={MAX_LENGTH}
                    value={caption}/>
            </View>
        )
    }


    // ==========================================================================================
    //5-  RENDER VIEW
    const refRBTagsSheet = useRef();
    return (

        <ImageBackground style={{flex: 1,}} source={{uri: photo}}>
            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={100}
                reducedTransparencyFallbackColor="white"
            />

            {/*<Overlay/>*/}
            <View style={{flexDirection: "row", width: "100%", paddingVertical:12 }}>
                <View style={{flex: 1, alignItems: "flex-start", paddingLeft:12}}>
                    <DINavButton button={{
                        ...{
                            type: "ionicon",
                            name: "ios-close",
                            size: 34,
                            color: "#FFF",
                            onPress: () => navigation.goBack(),
                            containerStyle: {}
                        }
                    }}/>
                </View>

                <View style={{flex: 1, alignItems: "flex-end", paddingRight:12}}>
                    <Button title={editMode ? "Update" : "Publish"}
                            onPress={onFinish}
                            containerStyle={[{}]}
                            loading={isEditing}
                            disabled={true}
                            buttonStyle={[newStyles.button,]}
                            disabledStyle={[newStyles.button]}
                            titleStyle={newStyles.buttonText}/>
                </View>
            </View>

            <KeyboardAvoidingContainer>
                <ScrollView contentContainerStyle={{paddingBottom: 80, flexGrow: 1}}>
                    {renterTextArea()}



                    <ScrollSelector
                        options={[1, 2, 3, 4, 5]}
                        label={"Discovery Radius:"}
                        valLabel={"km"}
                        current={radius} onPress={setRadius}/>
                    <View style={[styles.section]}>
                        <ListItem bottomDivider containerStyle={{backgroundColor: "transparent", paddingHorizontal: 0}}>
                            <ListItem.Content>
                                <DIText style={{color: "#fff"}}>Private</DIText>
                                <DIText style={{color: "#fff"}}>
                                    {"Tag your friends and followers."}
                                </DIText>
                            </ListItem.Content>
                            <Switch value={isPrivate} onValueChange={setIsPrivate}
                                    trackColor={"blue"}/>
                        </ListItem>
                        {isPrivate && <TagPicker users={taggedUsers} onAdd={() => refRBTagsSheet.current.open()}
                        />}
                    </View>
                </ScrollView>
            </KeyboardAvoidingContainer>
            <RBSheet ref={refRBTagsSheet} closeOnPressMask={false} height={windowHeight / 2}>
                <TagUser onDone={onDone}/>
            </RBSheet>
        </ImageBackground>
    );
};

AddCaptionPrivacy.defaultProps = {
    editMode: false
}

const newStyles = StyleSheet.create({
    button: {
        width: 80,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#ffffff",
        // marginTop: 10
    },

    buttonText: {
        fontSize: 13,
        fontFamily: DIFont.semibold,
        textAlign: "center",
        color: "#000000",
    }
})
