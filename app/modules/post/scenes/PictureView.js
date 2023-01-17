import React, {createContext, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import RBSheet from "react-native-raw-bottom-sheet";
import Carousel from 'react-native-reanimated-carousel';

import {useAuth} from "../../auth/AuthProvider";
import {usePost} from "../PostProvider";
import {useLocation} from "../../../components/location/LocationProvider";

import {REPORT_DROP} from "../PostService";

import Comments, {Header} from "./Comments";
import CardContainer from "../components/Card/CardContainer";
import {Button, CheckBox, Icon, ListItem} from "@rneui/themed";
import {useMutation} from "@apollo/client";
import {useTheme} from "../../ThemeProvider";

const {width, height} = Dimensions.get("window");
const PAGE_WIDTH = width;

export function PictureView(props) {
    //0 - DECLARE PROVIDERS VARIABLES
    const {deleteData} = usePost();
    const {state: {currentLocation}} = useLocation();
    const {state: {currentUser}} = useAuth();
    const {data, setData, setComments, onDeleteItem} = usePictureView();
    const {secondaryColor, textColor} = useTheme();

    //1 - DECLARE VARIABLES
    const {index} = props.route.params;
    const refRBSheetProfile = useRef();
    const refRBSheetReport = useRef();
    const insets = useSafeAreaInsets();

    const [item, setItem] = useState(null)
    const [isReporting, setIsReporting] = useState(false)
    const [reported, setReported] = useState(false)

    const [report] = useMutation(REPORT_DROP, {fetchPolicy: 'network-only', onCompleted, onError});

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        let data = props.route.params.data
        setData(data)
    }, []);

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    async function onCompleted(data) {
        if (data.report) {
            setIsReporting(false)
            deleteData(data.report.dropId)
            onDeleteItem(data.report.dropId)
            Alert.alert(
                "Drop Reported",
                "Thank you for letting us know. Your feedback helps keep our platform safe. We will review and take the necessary action.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

        }
    }

    function onError(error) {
        setIsReporting(false)
        alert(error.message)
    }

    //==================================================================================================
    //4 - ACTION HANDLERS
    const onComment = (drop) => {
        setItem(drop)
        refRBSheetProfile.current.open()
    }

    const onReport = (drop) => {
        setItem(drop)
        refRBSheetReport.current.open()
    }

    const onCloseReport = () => {
        setItem(null)
        refRBSheetReport.current.close()
    }

    const onClose = () => {
        setItem(null)
        refRBSheetProfile.current.close()
    }

    const reportDrop = async (reason) => {
        setIsReporting(true)
        await report({variables: {dropId: item.id, reason}});
        setItem(null)
        refRBSheetReport.current.close()
    }

    //==================================================================================================
    //5 - RENDER VIEW
    const PAGE_HEIGHT = height - insets.top - insets.bottom;
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "black"}}>
            <Carousel
                style={{
                    width: PAGE_WIDTH,
                    height: PAGE_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black',
                }}
                defaultIndex={index}
                vertical={true}
                width={PAGE_WIDTH}
                height={PAGE_HEIGHT}
                data={data}
                loop={false}
                scrollAnimationDuration={1000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({item, index}) => {
                    return (
                        <CardContainer item={item}
                                 index={index}
                                 navigation={props.navigation}
                                 key={`PIDrop.${item.id}.drop`}
                                 user={currentUser}
                                 currentLocation={currentLocation}
                                 preview={true}
                                 comments={item.comments}
                                 onComment={() => onComment(item)}
                                 onReport={() => onReport(item)}
                        />
                    )
                }}
            />
            <RBSheet
                ref={refRBSheetProfile}
                closeOnPressMask={false}
                height={(height / 2) + 165}
                keyboardAvoidingViewEnabled={true}
                onClose={() => setItem(null)}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                    },
                    wrapper: {backgroundColor: "transparent"},
                    draggableIcon: {backgroundColor: "#000"}
                }}>
                <Comments item={item}
                          onSetComments={setComments}
                          onClose={onClose}/>
            </RBSheet>
            <RBSheet
                ref={refRBSheetReport}
                closeOnPressMask={true}
                height={(height / 2) + 75}
                keyboardAvoidingViewEnabled={true}
                onClose={() => setItem(null)}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                    },
                    wrapper: {backgroundColor: "transparent"},
                    draggableIcon: {backgroundColor: "#000"}
                }}>
                <ReportView isReporting={isReporting}
                            onClose={onCloseReport}
                            reported={reported}
                            onReport={reportDrop}/>
            </RBSheet>
        </SafeAreaView>
    )
}


export default function Details(props) {
    return <PictureViewProvider>
        <PictureView {...props}/>
    </PictureViewProvider>
}

function ReportView({isReporting, reported, onReport, onClose}){
    const [reason, setReason] = useState(null)
    if (reported){
        return(
            <View style={{borderWidth: 1, borderColor: "red", justifyContent:"center"}}>
                <Text>Thank you for letting us know</Text>
                <Text>Your feedback helps keep our platform safe. We will review and take the necessary
                    action.</Text>
            </View>
        )
    }

    const onPress = async () => {
        await onReport(reason)
    }

    return(
        <View style={{flex: 1}}>
            <Header text={"Report Drop"} onClose={onClose}/>
            <View style={{padding: 12}}>
                <Text style={{fontSize: 23, fontWeight: "bold", marginBottom: 20}}>
                    Please select a
                    problem</Text>
                {
                    ["Nudity", "Violence", "Harassment", "Spam", "Something else"].map((item, index) => {
                        return (
                            <ListItem
                                bottomDivider
                                key={`report_drop_${index}`}
                                containerStyle={styles.containerStyle}>
                                <ListItem.Content>
                                    <ListItem.Title
                                        style={{fontSize: 17, color: "#000"}}>
                                        {item}
                                    </ListItem.Title>
                                </ListItem.Content>
                                <CheckBox
                                    center
                                    uncheckedIcon="circle-o"
                                    checkedIcon="dot-circle-o"
                                    checked={reason === item}
                                    containerStyle={{margin: 0, marginRight: 0}}
                                    onPress={() => setReason(item)}
                                />
                            </ListItem>
                        )
                    })
                }
            </View>
            <Button title={"Report"}
                    disabled={reason === null || isReporting}
                    onPress={onPress}
                    containerStyle={[{margin: 12}]}
                    loading={isReporting}
                    buttonStyle={[styles.button]}
                    disabledStyle={[styles.button]}
                    titleStyle={styles.buttonText}/>
        </View>
    )
}


// CONTEXT ==================================
const pictureViewContext = createContext();
const {Provider} = pictureViewContext;

function PictureViewProvider(props) {
    //1 - DECLARE VARIABLES
    const [data, setData] = useState([]);

    const onSetComments = (id, comments) => {
        let [...clone] = data;

        const index = clone.findIndex((obj) => obj.id === id);
        if (index !== -1) {
            clone[index]['comments'] = comments
        }

        setData(clone)
    }

    const onDeleteItem = (id) => {
        let [...clone] = data;

        clone = clone.filter((obj) => obj.id !== id);
        setData(clone)
    }

    const value = useMemo(() => {
        return {data, setData, setComments: onSetComments, onDeleteItem};
    }, [data]);

    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    );
}

const usePictureView = () => useContext(pictureViewContext);


Details.sharedElements = route => {
    const {item} = route.params;
    return [
        {
            id: `item.${item.id}.image_url`,
            animation: 'fade-out', //move, fade, fade-in, and fade-out
            // resize: 'clip'
        }
    ];
};


const styles = StyleSheet.create({

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
    },
    containerStyle: {
    padding: 0,
        paddingLeft: 0,
    paddingRight: 0,
}
})
