import React, {useEffect} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {CreateStack, PictureViewScreen} from "./modules/post/PostRoute";
import {UserStack} from "./modules/users/UserRoute";

import AppTabs from "./AppTabs";
import messaging from "@react-native-firebase/messaging";
import {Alert} from "react-native";
import {useAuth} from "./modules/auth/AuthProvider";
import Toast from "react-native-toast-message";
import DirectionsScreen from "./modules/post/scenes/Directions";

const detailOptions = {
    headerShown: false,
    headerBackTitleVisible: false,
    cardStyleInterpolator: ({current: {progress}}) => {
        return {
            cardStyle: {
                opacity: progress
            }
        };
    }
};

const Stack = createStackNavigator();
export default function AppStack() {
    const {state: {isLoggedIn}} = useAuth();

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        //FOREGROUND
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Toast.show({
                type: 'info',
                text1: remoteMessage.notification.title,
                text2: remoteMessage.notification.body
            });
        });

        return unsubscribe;
    }, [isLoggedIn]);


    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        alert("from background")
        console.log('Message handled in the background!', remoteMessage);
    });

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="AppTabs" component={AppTabs}  options={{headerShown: false}}/>
                <Stack.Screen name="Detail" component={PictureViewScreen} options={detailOptions}/>
                <Stack.Screen name="User" component={UserStack} options={{headerShown: false}}/>
                <Stack.Screen name="Directions" component={DirectionsScreen} options={{headerShown: false}}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Create" component={CreateStack} options={{headerShown: false}}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}
