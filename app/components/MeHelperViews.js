import React, {useLayoutEffect, useState,
useRef} from "react";
import {
    ActivityIndicator,
    FlatList, Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";

import MasonryList from "@react-native-seoul/masonry-list";

import {ErrorView} from "me-helper-views";

import {useSetting, PUBLIC, PRIVATE} from "../modules/setting/SettingProvider";
import {RightNavButton} from "./DIHeader";

import SortView from "./SortView";
import FilterView from "./FilterView";

import {useTheme} from "../modules/ThemeProvider";

export function DIContainer(props) {
    const sortRef = props.sortRef || useRef();
    const filterRef = props.filterRef || useRef();
    const optionsRef = props.optionsRef || useRef();

    const [toBeDeleted, setToBeDeleted] = useState(null)
    const {state: {radius, orderBy, filterType}, setOrderBy, setFilterType, setInRange} = useSetting();

    const {textColor} = useTheme();

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
                    // color: textColor,
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
                // headerTitle: () => <CenterNav tabs={tabs}/>,
                headerRight: () => <RightNavButton buttons={buttons}/>,
                headerLeft: () => <Text style={{padding: 10, fontWeight: "700", fontSize: 21, color: textColor}}>
                    DropIt!</Text>,
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
                                color: textColor,
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

export function DIListView(props) {
    const {isLoggedIn, isFetching, error, onRetry, grid} = props;

    const ListEmptyComponent = () => {
        if (isFetching) return <ActivityIndicator style={[{width: "100%"}, props.activityIndicatorStyle]}
                                                  color={"white"}/>;
        if (error) return <ErrorView message={error} textStyle={{color: "#fff"}} containerStyle={[props.errorViewStyle]}
                       onPress={onRetry}/>

        if (props.ListEmptyComponent) return props.ListEmptyComponent()
    };

    if (isLoggedIn === false) return <ErrorView message={props.loggedOutText} textStyle={{color: "#fff"}}
                                                containerStyle={[props.loggedOutViewStyle]}
                                                onPress={props.onLoggedOut}/>
    else if (grid) return <MasonryList {...props}  ListEmptyComponent={ListEmptyComponent} data={isFetching ? [] : props.data}/>
    return <FlatList {...props} ListEmptyComponent={ListEmptyComponent} data={isFetching ? [] : props.data}/>
}

DIListView.defaultProps = {
    isLoggedIn: null,
    isFetching: false,
    error: null,
    grid: false,
    onRetry: null,
    onLoggedOut: null,
    errorViewStyle: {},
    loggedOutViewStyle: {},
    activityIndicatorStyle: {},
    loggedOutText: "Not Logged In!",

    data:[]
}

export function EmptyView(props) {
    return (
        <View style={[{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 14
        }, props.containerStyle]}>
            <Text style={{fontSize: 18, fontWeight: "bold", color: "#fff"}}>
                {props.title}
            </Text>
            <Text style={{fontSize: 15, color: "#aaa", marginTop: 12, textAlign: "center"}}>
                {props.message}
            </Text>
        </View>
    )
}

EmptyView.defaultProps = {
    title: "No Data to Display",
    message: "An error has occurred",
    containerStyle: {},
    textStyle: {}
}
