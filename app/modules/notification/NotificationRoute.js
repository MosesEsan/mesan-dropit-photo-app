import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

import NotificationsScreen from "./scenes/Notifications";
import NotificationScreen from "./scenes/Notification";

// import {useTheme} from "../ThemeProvider";

const Stack = createStackNavigator();

function NotificationStack() {
    // const {headerStyle, headerTitleStyle, headerTintColor} = useTheme()
    const { colors } = useTheme();

    return (
        <Stack.Navigator initialRouteName="Notifications"
                         screenOptions={{
                             headerStyle: {
                                 backgroundColor: colors.background,
                                 backgroundColor: 'transparent',
                             },
                              headerBackTitle:" ",
                             headerTintColor: '#fff',
                             headerTitleStyle: {
                                 fontWeight: 'bold',
                             },
                         }}
        >
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
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
