import React, {useCallback, useMemo} from "react";
import {Button} from "@rneui/themed";
import {Image, StyleSheet, Text, View, Pressable} from "react-native";

export default function ProfileHeader(props) {
    const {backgroundColor, user, isFetching, onPress, showEdit, drops, isFollowing, navigation} = props;

    const renderButton = useCallback(() => {
        return (
            <Button title={showEdit ? "Edit Profile" : isFollowing ? "Following" : "Follow"}
                    onPress={onPress}
                    loading={isFetching}
                    containerStyle={[{marginTop: 0}]}
                    buttonStyle={[styles.button, showEdit || isFollowing || isFetching ? {backgroundColor: "rgb(53,52,52)"} : {backgroundColor: "#fff"}]}
                    disabledStyle={[styles.button]}
                    titleStyle={[styles.buttonText, showEdit || isFollowing ? {color: "#fff"} : {color: backgroundColor}]}/>
        )

    }, [isFetching, showEdit, isFollowing]);


    const onPressFollowers = () => {
        navigation.navigate('Stats', {user: user, index: 0})
    }

    const onPressFollowing = () => {
        navigation.navigate('Stats', {user: user, index: 1})
    }

    return (
        <View style={{
            backgroundColor,
            flexDirection: "row",
            paddingHorizontal: 12,
            paddingVertical: 12,
            alignItems: "center"
        }}>
            <Image source={{uri: user.image}}
                   style={{
                       marginTop: 3,
                       height: 80, width: 80,
                       backgroundColor: "#eee",
                       borderRadius: 50
                   }}/>
            <View style={{marginLeft: 30, flex: 1}}>

                {/*<View style={{}}>*/}
                {/*    <Text style={{fontSize: 17, color:"#fff", fontWeight: "700"}}>*/}
                {/*        {user.name}*/}
                {/*    </Text>*/}
                {/*    <Text style={{fontSize: 16, color:"#ccc", fontWeight: "400", marginTop: 2}}>*/}
                {/*        @mosesesan*/}
                {/*    </Text>*/}
                {/*</View>*/}

                <View style={{flexDirection: "row", marginTop: 10}}>
                    <Pressable onPress={null} style={{flex: 1}}>
                        <Text style={{fontSize: 16, color: "white", fontWeight: "700"}}>
                            {!isFetching && user.drops ? drops.length : ""}
                        </Text>
                        <Text style={{fontSize: 14, color: "#ccc", fontWeight: "400"}}>drops</Text>
                    </Pressable>
                    <Pressable onPress={onPressFollowers} style={{flex: 1}}>
                        <Text style={{fontSize: 16, color: "white", fontWeight: "700"}}>
                            {!isFetching && user.followers ? user.followers.length : ""}
                        </Text>
                        <Text style={{fontSize: 14, color: "#ccc", fontWeight: "400"}}>followers</Text>
                    </Pressable>
                    <Pressable onPress={onPressFollowing} style={{flex: 1}}>
                        <Text style={{fontSize: 16, color: "white", fontWeight: "700"}}>
                            {!isFetching && user.following ? user.following.length : ""}
                        </Text>
                        <Text style={{fontSize: 14, color: "#ccc", fontWeight: "400"}}>following</Text>
                    </Pressable>
                </View>
                <View style={{marginTop: 12}}>
                    {renderButton()}
                </View>
            </View>

        </View>
    )
}


ProfileHeader.defaultProps = {
    drops: [],
    followers: [],
    following: []
}

const styles = StyleSheet.create({
    button: {
        height: 35,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center', paddingHorizontal: 16
    },

    buttonText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "500"
    },

    error: {
        color: "red",
        marginVertical: 12
    },

    customStyles: {
        wrapper: {backgroundColor: "transparent"},
        draggableIcon: {backgroundColor: "#000"}
    }
});

