import React, {useLayoutEffect, useState,
useRef} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,

    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";


import {useSetting, PUBLIC, PRIVATE} from "../modules/setting/SettingProvider";

import SortView from "./SortView";
import FilterView from "./FilterView";
import {useTheme} from "@react-navigation/native";


export function DIContainer(props) {
    const sortRef = props.sortRef || useRef();
    const filterRef = props.filterRef || useRef();
    const optionsRef = props.optionsRef || useRef();

    const [toBeDeleted, setToBeDeleted] = useState(null)
    const {state: {radius, orderBy, filterType}, setOrderBy, setFilterType, setInRange} = useSetting();

    const {colors} = useTheme();

    //==================================================================================================
    //1B -NAVIGATION CONFIG
    useLayoutEffect(() => {
        if (props.navigation) {
            let buttons = [
                {
                    name: 'map-marker-circle',
                    size: 30,
                    onPress: () => props.navigation.navigate('Post', {screen: 'MapView'}),
                    color: "#fff",
                    type: "material-community"
                },
                {
                    name: filterType === PRIVATE ? "user-tag" : "public",
                    size: 24,
                    onPress: () => filterRef.current.open(),
                    color: "#fff",
                    type: filterType === PRIVATE ? "font-awesome-5" : "materialicon"
                },
                {
                    name: "settings-outline",
                    size: 24,
                    onPress: () => sortRef.current.open(),
                    color: "#fff",
                    type: "ionicon"
                }
            ]
            props.navigation.setOptions({
            });
        }

    }, [props.navigation, filterType]);

    let onSort = (type) => {
        if (type !== orderBy) setOrderBy(type)
        sortRef.current.close()
    };

    const onButtonPress = (index) => {
        optionsRef.current.close()
        if (toBeDeleted) {
            if (index === 0) props.onEdit(toBeDeleted)
            else if (index === 1) props.onDelete(toBeDeleted.id)
        }
        setToBeDeleted(null)
    };

    let onFilterType = (type) => {
        setFilterType(type)
    };

    return (
        <SafeAreaView style={[{flex: 1}, props.containerStyle]}>
                {props.children}
                <FilterView
                    ref={filterRef}
                    onClose={() => filterRef.current.close()}
                    buttons={[
                        {
                            title: "Public",
                            icon: {
                                name: "public",
                                size: 24,
                                color: "#bbb",
                                type: "materialicon"
                            },
                            onPress: () => {
                                onFilterType(PUBLIC)
                                filterRef.current.close()
                            }
                        },
                        {
                            title: "Tagged",
                            icon: {
                                name: "user-tag",
                                size: 24,
                                color: colors.text,
                                type: "font-awesome-5"
                            },
                            onPress: () => {
                                onFilterType(PRIVATE)
                                filterRef.current.close()
                            }
                        }
                    ]}/>

                <SortView ref={sortRef} height={375} onSort={onSort} onClose={() => sortRef.current.close()}/>
        </SafeAreaView>
    );
}

DIContainer.defaultProps = {
    containerStyle: {}
}

export function KeyboardAvoidingContainer(props) {
    return (
        <SafeAreaView style={[{flex: 1}, props.containerStyle]}>
            <KeyboardAvoidingView keyboardVerticalOffset={0} behavior="padding" style={{flex: 1}}>
                <TouchableWithoutFeedback onLongPress={Keyboard.dismiss} accessible={false}>
                    {props.children}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

KeyboardAvoidingContainer.defaultProps = {
    containerStyle: {}
}
