import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from "react-navigation-shared-element";

import UsersScreen from "./scenes/Users";
import {useTheme} from "../ThemeProvider";

import UserContainerScreen from "./scenes/Stats/StatsContainer";
import UserPostsScreen from "./scenes/Posts/UserPosts";
import UserProfileScreen from "./scenes/User";

import {AccountStack} from "../auth/AuthRoute";

const SEStack = createSharedElementStackNavigator();
const Stack = createStackNavigator();

function UsersStack() {
    const {headerStyle, headerTitleStyle, headerTintColor} = useTheme()

    return (
        <SEStack.Navigator screenOptions={{headerStyle, headerTintColor, headerTitleStyle, headerBackTitle:" "}}>
            <SEStack.Screen name="AllUsers" component={UsersScreen} options={{title:'Follow Users'}}/>
        </SEStack.Navigator>
    );
}

export function UserStack() {
    const {headerStyle, headerTitleStyle, headerTintColor} = useTheme()

    return (
        <SEStack.Navigator initialRouteName="Profile" screenOptions={{headerStyle, headerTintColor, headerTitleStyle, headerBackTitle:" "}}>
            <SEStack.Screen name="Profile" component={UserProfileScreen}/>
            <SEStack.Screen name="Stats" component={UserContainerScreen} options={{title:"Followers"}}/>
            <SEStack.Screen name="UserPosts" component={UserPostsScreen} options={{title:""}}/>
            <SEStack.Screen name="Account" component={AccountStack} options={{title:"Settings"}}/>
        </SEStack.Navigator>
    );
}

export const tabIcon = {
    name: "users",
    color: 'rgb(130, 130, 130)',
    type: "feather"
};

export const profileTabIcon = {
    name: "user",
    color: 'rgb(130, 130, 130)',
    type: "feather"
};


export default UsersStack;

