import React, {useEffect, useRef, useState} from "react";
import {
    Image,
    StyleSheet,
    View,
    Animated,
    useWindowDimensions,
    Platform,
    TextInput,
    ImageBackground, ScrollView
} from "react-native";

import {ListItem, Switch} from "@rneui/themed";

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DIFont} from "../../../../AppConfig";
import {ScrollSelector} from "../../scenes/AddNew/AddCaptionPrivacy";
import DIText from "../../../../components/DIText";
import TagPicker from "../TagPicker/TagPicker";
import {BlurView} from "@react-native-community/blur";
import PreviewHeader from "../PreviewHeader";
import {useNavigation} from "@react-navigation/native";
import {generateUUID} from "../../../../AppUtil";
import {useLocation} from "../../../../components/location/LocationProvider";
import {useQueue} from "me-helper-views/QueueProvider";
import {KeyboardAvoidingContainer} from "me-helper-views";


export default function Preview({path}) {
    //0 - DECLARE PROVIDERS VARIABLES
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const {height: windowHeight, width: windowWidth} = useWindowDimensions();

    const {clearQueue, addToQueue} = useQueue();
    const {state: {hasLocationPermission}, getCurrentLocation} = useLocation();

    const totalInsets = insets.top + insets.bottom;

    //1 - DECLARE VARIABLES
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);

    const [previewMode, setPreviewMode] = useState(true);
    const [isGettingDropLocation, setIsGettingDropLocation] = useState(null);
    const [taggedUsers, setTaggedUsers] = useState([]);

    const [caption, setCaption] = useState("");
    const [radius, setRadius] = useState(2);
    const [isPrivate, setIsPrivate] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    const scaleAnimation = new Animated.Value(windowHeight);
    const containerMarginAnimation = new Animated.Value(0);

    const containerHeightAnimation = new Animated.Value(windowHeight - insets.top);
    const imageHeightAnimation = new Animated.Value(windowHeight - insets.top);
    const imageWidthAnimation = new Animated.Value(windowWidth);

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        clearQueue()
        Image.getSize(path, (width, height) => {
            const ratio = 170 / width;
            setWidth(170)
            setHeight(height * ratio)
        });
    }, []);

    const minimisedContainerHeight = height + 40;

    const onNext = () => {
        Animated.parallel([
            Animated.timing(containerHeightAnimation, {
                toValue: minimisedContainerHeight,
                useNativeDriver: false,
            }),
            Animated.timing(containerMarginAnimation, {
                toValue: 68,
                useNativeDriver: false,
            }),
            Animated.timing(imageHeightAnimation, {
                toValue: height,
                useNativeDriver: false,
            }),
            Animated.timing(imageWidthAnimation, {
                toValue: width,
                useNativeDriver: false,
            }),
            Animated.timing(scaleAnimation, {
                toValue: minimisedContainerHeight + 68,
                useNativeDriver: false,
            })
        ]).start(() => setDropLocation());
    };

    const setDropLocation = () => {
        setPreviewMode(false)
        if (!hasLocationPermission) {
            alert("DropIt! does not have location access.")
        } else {
            setIsGettingDropLocation(true)
            let onSuccess = (location) => {
                setCurrentLocation(location)
                setIsGettingDropLocation(false)
            }
            getCurrentLocation(onSuccess, error => {
                setIsGettingDropLocation(false)
                alert("DropIt! was unable to retrieve your curre" +
                    "nt location .")
            },);
        }
    }

    // Container animation style
    const containerStyle = {
        marginTop: containerMarginAnimation,
        height: containerHeightAnimation,
    };

    const animatedStyle = {
        top: scaleAnimation,
        // position: "relative"
    };

    // Image animation style
    const imageStyle = {
        height: imageHeightAnimation,
        width: imageWidthAnimation,
    };

    //==================================================================================================
    //4 - ACTION HANDLERS


    const onFinish = async () => {
        let drop = {
            id: generateUUID(),
            photo: path,
            ...currentLocation
        };
        drop['caption'] = caption;
        drop['radius'] = radius;
        drop['private'] = isPrivate;
        drop["taggedUsers"] = taggedUsers.map((user, idx) => (user.id));

        addToQueue(drop)
        navigation.pop()
    }

    //==================================================================================================
    //RENDER
    if (path) {
        return (
            <ImageBackground style={{flex: 1,}} source={{uri: path}}>
                <BlurView style={styles.absolute} blurType="light" blurAmount={100}
                          reducedTransparencyFallbackColor="white"/>
                <KeyboardAvoidingContainer>
                    <ScrollView contentContainerStyle={{flexGrow:1, paddingBottom: 300}}>
                        <Animated.View style={[styles.container, {width: windowWidth,}, containerStyle]}>
                            <Animated.Image source={{uri: path}} style={[styles.image, imageStyle]}/>
                        </Animated.View>

                        <Animated.View style={[{width: windowWidth}, styles.bottomContainer, animatedStyle]}>
                            <TextInput
                                multiline={true}
                                placeholderTextColor={"#fff"}
                                onChangeText={(text) => setCaption(text)}
                                placeholder={"Say something about this drop..."}
                                style={[styles.textInput]}
                                maxLength={250}
                                value={caption}/>
                            <View style={[styles.section]}>
                                <ListItem bottomDivider
                                          containerStyle={{backgroundColor: "transparent", paddingHorizontal: 0}}>
                                    <ListItem.Content>
                                        <DIText style={{color: "#fff"}}>Private</DIText>
                                        <DIText style={{color: "#fff"}}>
                                            {"Tag your friends and followers."}
                                        </DIText>
                                    </ListItem.Content>
                                    <Switch value={isPrivate} onValueChange={setIsPrivate}
                                            trackColor={"blue"}/>
                                </ListItem>
                                {isPrivate && <TagPicker users={taggedUsers} onAdd={() => navigation.navigate("TagUser")}/>}
                            </View>
                            <ScrollSelector
                                options={[1, 2, 3, 4, 5]}
                                label={"Discovery Radius:"}
                                valLabel={"km"}
                                current={radius} onPress={setRadius}/>


                        </Animated.View>
                    </ScrollView>
                </KeyboardAvoidingContainer>
                <PreviewHeader navigation={navigation}
                               containerStyle={{position: "absolute"}}
                               title={previewMode ? "Next" : "Publish"}
                               onPress={previewMode ? onNext : onFinish}
                               disabled={(!previewMode && (isGettingDropLocation || caption.length === 0))}/>
            </ImageBackground>
        )
    }

    return null;
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 16,
        flex: 1, overflow: "hidden"
    },

    previewWrapper: {
        borderRadius: 16,
        flex: 1,
        // overflow: "hidden",

    },

    container: {
        borderRadius: 16,
        // flex:1,
        justifyContent: "center",
        alignItems: 'center',
    },


    image: {
        borderRadius: 16,
        // flex:1,

    },

    toolBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        alignItems: "flex-start",
    },


    bottomContainer: {
        position: "absolute",
        left: 0,
        top: 10, flex: 1
    },

    buttonContainer: {
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 35 : 0,
        paddingHorizontal: 8,
        // width: width
    },

    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#fff",
        marginTop: 10
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 17,
        textAlign: "center",
        color: "#000"
    },

    textInput: {
        fontSize: 14,
        fontFamily: DIFont.semibold,
        lineHeight: 20,
        color: "#FFF",
        padding: 16,
        paddingTop: 16,
        flex: 1,

        // borderWidth:StyleSheet.hairlineWidth, borderColor:"#ccc",
        borderRadius: 12, marginHorizontal: 20,
        backgroundColor: "rgba(255,255,255,.3)",
        marginTop: 20,
    },


    section: {
        marginTop: 20,
        marginHorizontal: 20,
        overflow: "hidden"
    },
    absolute: {
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});
