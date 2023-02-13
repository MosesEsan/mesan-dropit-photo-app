import React from "react";
import {ActivityIndicator, FlatList} from "react-native";
import {ErrorView} from "me-helper-views";

export default function DIListView(props) {
    const {isLoggedIn, isFetching, error, onRetry, section, renderLoading} = props;

    const ListEmptyComponent = () => {
        if (isFetching){
            if(renderLoading) return renderLoading()

            return <ActivityIndicator style={[{width: "100%"}, props.activityIndicatorStyle]}
                                      color={"white"}/>
        }

        if (error) return <ErrorView message={error} textStyle={{color: "#fff"}} containerStyle={[props.errorViewStyle]}
                                     onPress={onRetry}/>

        if (props.ListEmptyComponent) return props.ListEmptyComponent()
    };

    if (isLoggedIn === false) return <ErrorView message={props.loggedOutText} textStyle={{color: "#fff"}}
                                                containerStyle={[props.loggedOutViewStyle]}
                                                onPress={props.onLoggedOut}/>
    // else if (section) return (
    // <SectionList
    //     {...props}
    //     ListEmptyComponent={ListEmptyComponent} data={isFetching ? [] : props.data}
    // />
    // )
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
    renderLoading:null,
    data:[]
}
