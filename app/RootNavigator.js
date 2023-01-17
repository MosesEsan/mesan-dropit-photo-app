import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, useColorScheme} from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from "@react-native-firebase/messaging";

import {DefaultTheme, DarkTheme} from '@react-navigation/native';

import {useMutation} from "@apollo/client";
import Toast from "react-native-toast-message";

import {useAuth} from "./modules/auth/AuthProvider";
import {useLocation} from "./components/location/LocationProvider";

import AuthStack from "./modules/auth/AuthRoute";

import AppStack from "./AppRoute";
import {useTheme} from "./modules/ThemeProvider";
import {REGISTER_FOR_NOTIFICATON} from "./modules/notification/NotificationService";

import getDeviceToken, {NOTIFICATION_KEY} from "./util/getDeviceToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootNavigator() {

    //1 - DECLARE VARIABLES
    const [isLoading, setIsLoading] = useState(true);

    const {state: {isLoggedIn, currentUser}, getAuthState} = useAuth();
    const {getCurrentLocation} = useLocation();
    const {
        textColor,
        backgroundColor,
        primaryColor,
    } = useTheme()

    const scheme = useColorScheme();

    let onCallback = onError = () => {
        setIsLoading(false)
    }
    const [registerForNotification] = useMutation(REGISTER_FOR_NOTIFICATON, {onCompleted: onCompleted, onError: onError});

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => {
            try {
                //Check Auth State
                await getAuthState(true);

                //If logged in, get the current location
                if (isLoggedIn) {
                    getCurrentLocation(onCallback, onCallback);
                    await registerForPushNotificationsAsync()
                    // getInitialNotification(onCallback)
                    // onNotificationOpenedApp(onCallback)
                }
            } catch (e) {
                alert(e)
            } finally {
                setIsLoading(false)
            }
        })();

    }, [isLoggedIn]);

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    async function onCompleted(data) {
        if (data.registerForNotification) {
            // Save token in Asyncstorage
            const jsonValue = JSON.stringify(true)
            await AsyncStorage.setItem(NOTIFICATION_KEY, jsonValue)
        }
    }

    function onError(error) {
        alert("failed", error.message)
    }

    //==================================================================================================
    //5 - ACTION HANDLERS
    async function registerForPushNotificationsAsync() {
        const {token, error} = await getDeviceToken()

        if (token){
            await registerForNotification({variables: {deviceToken: token}})
        }else if (error){
            alert(error)
        }
    }

    function getInitialNotification(onDone) {
        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    alert("opened from quit state")
                }
                onDone();
            });
    }

    function onNotificationOpenedApp() {
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            alert("opened from background state")
        });
    }


    const MyTheme = {
        ...DefaultTheme,
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            primary: primaryColor,
            background: backgroundColor,
            card: 'rgb(255, 255, 255)',
            text: textColor,
            // border: 'rgb(199, 199, 204)',
            // notification: 'rgb(255, 69, 58)',
        },
    };

    // We haven't finished checking for the token yet
    if (isLoading) return <ActivityIndicator style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}/>

    const RootStack = createStackNavigator();
    return (
        <SafeAreaProvider>
            <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
                <RootStack.Navigator>
                    {currentUser == null ?
                        (<RootStack.Screen name="Auth" component={AuthStack} options={{headerShown: false}}/>)
                        :
                        (<RootStack.Screen name="App" component={AppStack} options={{headerShown: false}}/>)
                    }
                </RootStack.Navigator>
            </NavigationContainer>
            <Toast/>
        </SafeAreaProvider>
    );
}

