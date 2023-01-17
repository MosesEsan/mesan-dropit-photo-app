import React, {useState} from "react";
import {Image, StyleSheet} from "react-native";

import {Button, ListItem} from "@rneui/themed";
import {useMutation} from "@apollo/client";

import {useTheme} from "../../ThemeProvider";
import {FOLLOW_USER} from "../UserService";


export default function UserItem({navigation, item, following, onError: onFollowError}) {
    //1 - DECLARE VARIABLES
    const [isFollowing, setIsFollowing] = useState(following);

    const {backgroundColor, textColor} = useTheme()

    const [followUser, {loading}] = useMutation(FOLLOW_USER, {onError});

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    function onError(error) {
        setIsFollowing(!isFollowing)
        onFollowError(error.message)
    }

    //==================================================================================================
    //4 - ACTION HANDLERS
    const onPress = async () => {
        setIsFollowing(!isFollowing)
        await followUser({variables: {userId: item.id, value: !isFollowing}});
    }

    //==========================================================================================
    // 5 - RENDER VIEW
    return (
        <ListItem onPress={() => navigation.navigate("User", {screen:"Profile", params: {user: item}})} containerStyle={styles.container}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <ListItem.Content>
                <ListItem.Title style={{color: "#fff"}}>{item.name}</ListItem.Title>
            </ListItem.Content>
            <Button title={isFollowing ? "Following" : "Follow"}
                    onPress={onPress}
                    loading={loading}
                    disabled={loading}
                    containerStyle={[{marginTop: 0}]}
                    buttonStyle={[styles.button, {borderColor: textColor}, isFollowing ? {backgroundColor: textColor} : {backgroundColor: backgroundColor}]}
                    disabledStyle={[{backgroundColor: backgroundColor}]}
                    loadingStyle={[{backgroundColor: backgroundColor}]}
                    titleStyle={[styles.buttonText, isFollowing ? {color: "#fff"} : {color: textColor}]}/>
        </ListItem>
    )
}

UserItem.defaultProps = {
    following: false,
    navigation: null,
    item:null,
    onError: null
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        marginHorizontal: 8,
        backgroundColor: "rgb(30,30,30)",
        borderRadius: 6
    },

    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: "#eee"
    },

    button: {
        borderWidth: 2,
        height: 37,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center', paddingHorizontal: 16
    },

    buttonText: {
        fontSize: 13,
        color: "#fff",
        fontWeight: "500"
    }
});
