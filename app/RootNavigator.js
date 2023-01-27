import React, {useEffect} from 'react';
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

export default function RootNavigator() {

    const scheme = useColorScheme();
    const {getCurrentLocation} = useLocation();
    const {state: {isLoggedIn, currentUser, isCheckingStatus}, setCheckStatus, getAuthState} = useAuth();
    const [registerForPushNotifications, getInitialNotification, onNotificationOpenedApp] = useNotification();

    //1 - DECLARE VARIABLES
    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        (async () => {
            try {
                //Check Auth State
                await getAuthState(true);

                //If logged in, get the current location
                if (isLoggedIn) {
                    let onCallback = () => setCheckStatus(false)
                    getCurrentLocation(onCallback, onCallback);
                    await registerForPushNotifications()
                    // getInitialNotification(onCallback)
                    // onNotificationOpenedApp(onCallback)
                }
            } catch (e) {
                alert(e)
            } finally {
                setTimeout(() => {
                    setCheckStatus(false)
                }, 1000)
            }
        })();

    }, [isLoggedIn]);

    const MyTheme = {
        ...DefaultTheme,
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            primary: "#121212",
            secondary: "#191919",
            background: "#0E0E0E",
            white: '#ffffff',
            card: '#5162FF',
            text: "#1C1C1C",
            border: '#B5B5B5',
            // notification: 'rgb(255, 69, 58)',
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

