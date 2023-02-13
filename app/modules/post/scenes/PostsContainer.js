import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {View} from 'react-native';

import {FloatingAction} from "react-native-floating-action";
import {QueueView} from "me-helper-views";
import {useQueue} from "me-helper-views/QueueProvider";
import {Icon} from '@rneui/themed';
import {useNavigation, useTheme} from "@react-navigation/native";

import {usePost} from "../PostProvider";
import {useAuth} from "../../auth/AuthProvider";
import {PRIVATE, useSetting} from "../../setting/SettingProvider";

import {ASC, DATE, DESC} from "../../../AppConfig";
import {ADD_DROP} from "../PostService";

import {DINavButton, DINavButtons, DINavTitle} from "../../../components/DIHeader";
import NavUserImage from "../../../components/NavUserImage";
import SortView from "../../../components/SortView";

import {showError} from "../../../AppUtil";
import {getNavButtons} from "../PostConfig";
import {API_KEY, SECRET, CLOUD_NAME} from "../../../AppConfig"

let config = {api_key: API_KEY, api_secret: SECRET, cloud_name: CLOUD_NAME};

export default function PostsContainer(props) {
    //DECLARE PROVIDERS VARIABLES
    const {colors} = useTheme()
    const navigation = useNavigation()
    const {addData} = usePost();
    const {queue, removeFromQueue} = useQueue();
    const {state: {isLoggedIn}, handleLogout} = useAuth();
    const {state: {orderBy, filterType, showAll}, setOrderBy, setFilterType, setShowAll} = useSetting();

    const sortRef = props.sortRef || useRef();
    //==================================================================================================
    //NAVIGATION CONFIG
    useLayoutEffect(() => {
        if (navigation) {
            let buttons = getNavButtons(navigation);
            navigation.setOptions({
                headerTitle: () => <DINavTitle/>,
                headerLeft: () => <DINavButtons buttons={[buttons[1], buttons[2]]}/>,
                headerRight: () => (
                    <View style={{flexDirection: "row"}}>
                        <DINavButton button={buttons[0]}/>
                        <NavUserImage onPress={() => navigation.navigate("MyProfile")}/>
                    </View>
                ),
            });
        }
    }, [navigation]);

    //==================================================================================================
    //MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => {
            if (!isLoggedIn) await handleLogout();
        })();
    }, [isLoggedIn]);

    //==================================================================================================
    //ACTION HANDLERS
    async function onAddCompleted(data, id) {
        await addData(data);
        removeFromQueue(id)
    }

    let onSort = (type) => {
        if (type !== orderBy) setOrderBy(type)
    };

    const onPressItem = (name) => {
        if (name === "map") {
            navigation.navigate('Home', {screen: 'MapView'})
        } else if (name === "sort-oldest") {
            onSort({[DATE]: ASC})
        } else if (name === "sort-newest") {
            onSort({[DATE]: DESC})
        } else if (name === "tagged") {
            setFilterType(!filterType)
        } else if (name === "all") {
            setShowAll(!showAll)
        } else if (name === "radius") {
            sortRef.current.open()
        }
    }

    // ==========================================================================================
    //5-  RENDER VIEW
    const actions = [
        {
            text: "Change Radius",
            icon: <Icon name={'map-marker-radius'} type={'material-community'} color={"#fff"} size={19}/>,
            name: "radius",
            position: 1,
            buttonSize: 45,
            textBackground: "transparent",
            textStyle: {fontSize: 15, fontWeight: "700", color: "#fff"}
        },

        // {
        //     text: "View on Map",
        //     icon: <Icon name={'map'} type={'material-community'} color={"#fff"} size={19}/>,
        //     name: "map",
        //     position: 2,
        //     buttonSize: 45,
        //     textBackground: "transparent",
        //     textStyle: {fontSize: 15, fontWeight: "700", color: "#fff"}
        // },

        {
            text: (filterType === PRIVATE) ? "Show All" : "Tagged Only",
            icon: <Icon name={(filterType === PRIVATE) ? 'public' : 'user-tag'}
                        type={(filterType === PRIVATE) ? 'material-community' : "font-awesome-5"} color={"#fff"}
                        size={19}/>,
            name: "tagged",
            position: 3,
            buttonSize: 45,
            textBackground: "transparent",
            textStyle: {fontSize: 15, fontWeight: "700", color: "#fff"}
        },
        {
            text: showAll ? "Within Radius" : "Without Radius",
            icon: <Icon name={showAll ? 'eye-off' : 'eye'} type={'material-community'} color={"#fff"} size={19}/>,
            name: "all",
            position: 3,
            buttonSize: 45,
            textBackground: "transparent",
            textStyle: {fontSize: 15, fontWeight: "700", color: "#fff"}
        }
    ];


    return (
        <View style={[{flex: 1}, props.containerStyle]}>
            <QueueView
                cloudinaryConfig={config}
                queue={queue[0]}
                mutation={ADD_DROP}
                textColor={colors.card}
                onCompleted={onAddCompleted}
                onError={(error) => showError("", error.message)}
                containerStyle={{backgroundColor: colors.secondary}}/>
            {
                props.children
            }
            <FloatingAction
                actions={actions}
                tintColor={colors.card}
                overlayColor={"rgba(68, 68, 68, 0.8)"}
                distanceToEdge={16}
                floatingIcon={<Icon name={'settings'} type={'feather'} color={"#fff"} size={19}/>}
                onPressItem={onPressItem}/>
            <SortView ref={sortRef} height={245} onClose={() => sortRef.current.close()}/>
        </View>
    );
}
