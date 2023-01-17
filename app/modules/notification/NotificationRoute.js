import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import NotificationsScreen from "./scenes/Notifications";
import NotificationScreen from "./scenes/Notification";

import {useTheme} from "../ThemeProvider";

const Stack = createStackNavigator();

function NotificationStack() {
    const {headerStyle, headerTitleStyle, headerTintColor} = useTheme()

    return (
        <Stack.Navigator initialRouteName="Notificationss"
                         screenOptions={{headerStyle, headerTintColor, headerTitleStyle, headerBackTitle:" "}}>
            <Stack.Screen name="Notificationss" component={NotificationsScreen} options={{title:'Notifications'}}/>
            <Stack.Screen name="Notification" component={NotificationScreen}/>
        </Stack.Navigator>
    );
}

export const tabIcon = {
    name: "bell",
    color: 'rgb(130, 130, 130)',
    type: "feather"
};

export default NotificationStack;
