import React, {useEffect, useState} from 'react';
import {useColorScheme} from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {DefaultTheme, DarkTheme} from '@react-navigation/native';

import Toast from "react-native-toast-message";

import {useAuth} from "./modules/auth/AuthProvider";
import {useLocation} from "./components/location/LocationProvider";

import AuthStack from "./modules/auth/AuthRoute";
import AuthSplash from "./modules/auth/components/AuthSplash";

import AppStack from "./AppRoute";
import useNotification from "./hooks/useNotification";
import {DIColors} from "./AppConfig";

export default function RootNavigator() {
    const [status, setStatus] = useState("")

    const scheme = useColorScheme();
    const {getCurrentLocation} = useLocation();
    const {state: {isLoggedIn, currentUser}, isCheckingStatus, setIsCheckingStatus, getAuthState} = useAuth();
    const [registerForPushNotifications, getInitialNotification, onNotificationOpenedApp] = useNotification();

    //1 - DECLARE VARIABLES
    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => {
            try {
                console.log("Checking Auth State")
                setStatus("Checking Auth State")
                //Check Auth State
                await getAuthState(true);

                //If logged in, get the current location
                if (isLoggedIn) {
                    console.log("Getting current location. Please Wait...")
                    setStatus("Getting current location. Please Wait...")
                    let onCallback = () => {
                        console.log("Current Location Secured!!")
                        setIsCheckingStatus(false)
                    }
                    getCurrentLocation(onCallback, () => {
                        console.log("An error occurred when getting location.")
                        alert("An error occurred")
                        setIsCheckingStatus(false)
                    });
                    await registerForPushNotifications()
                    // getInitialNotification(onCallback)
                    // onNotificationOpenedApp(onCallback)
                }
            } catch (e) {
                alert(e)
            } finally {
                setTimeout(() => {
                    setIsCheckingStatus(false)
                }, 1000)
            }
        })();

    }, [isLoggedIn]);

    const MyTheme = {
        ...DefaultTheme,
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            ...DIColors
        },
    };

    const RootStack = createStackNavigator();
    return (
        <AuthSplash isLoaded={!isCheckingStatus}>
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
        </AuthSplash>
    );
}

