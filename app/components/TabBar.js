import React, {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {createNavigationContainerRef} from "@react-navigation/native";

import {useTheme} from "../modules/ThemeProvider";
import {useAuth} from "../modules/auth/AuthProvider";

import FloatingActionBar from "./FloatingActionBar/FloatingActionBar";

export const navigationRef = createNavigationContainerRef();

export default function TabBar({navigation}) {
    //1 - DECLARE VARIABLES
    const [currentIndex, setCurrentIndex] = useState(0);

    const {textColor, backgroundColor} = useTheme();
    const {state: { currentUser}} = useAuth();

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        //TODO: Link it to the notifications
        return navigation.addListener('focus', () => {
            const route = navigationRef.getCurrentRoute();

            // let routeName = event.data.state.routes[0].name
            if (route && route['name'] === "Posts") {
                setCurrentIndex(0)
            } else if (route && route['name'] === "Users") {
                setCurrentIndex(1)
            }else if (route && route['name'] === "Notifications") {
                setCurrentIndex(3)
            }else if (route && route['name'] === "Profile") {
                setCurrentIndex(4)
            }
        });
    }, [navigation]);


    // ==========================================================================================
    //3-  RENDER VIEW
    return (
        <FloatingActionBar
            items={[
                {
                    icon: 'home-outline',
                    color: 'rgb(130, 130, 130)',
                    activeColor: textColor,
                    type: 'ionicon',
                    style: styles.iconStyle
                    // activeBackgroundColor: 'rgb(224, 243, 255)',
                },
                {
                    icon: "users",
                    color: 'rgb(130, 130, 130)',
                    type: "feather",
                    activeColor: textColor,
                    style: styles.iconStyle
                },
                {
                    icon: 'add-circle-outline',
                    size: 40,
                    color: '#fff',
                    activeColor: textColor,
                    type: 'ionicon',
                    style: styles.iconStyle
                },
                {
                    icon: "bell",
                    color: 'rgb(130, 130, 130)',
                    type: "feather",
                    activeColor: textColor,
                    style: styles.iconStyle
                },
                {
                    icon: "user",
                    color: 'rgb(130, 130, 130)',
                    type: "feather",
                    activeColor: textColor,
                    style: styles.iconStyle
                },
            ]}
            position="bottom"
            onPress={index => {
                if (index === 0) navigation.navigate('Posts')
                else if (index === 1) navigation.navigate('User')
                else if (index === 2) navigation.navigate('Create')
                else if (index === 3) navigation.navigate('Notification')
                else if (index === 4)
                navigation.navigate("Profile", {
                    screen: "MyProfile",
                    params: {user: currentUser}
                })
            }}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            style={[styles.container, {backgroundColor}]}/>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12
    },
    iconStyle: {
        flex: 1,
    }
});
