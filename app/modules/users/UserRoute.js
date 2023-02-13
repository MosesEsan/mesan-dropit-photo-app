import React from 'react';
import {createSharedElementStackNavigator} from "react-navigation-shared-element";

import UsersScreen from "./scenes/Users";

import UserContainerScreen from "./scenes/Stats/StatsContainer";
import UserPostsScreen from "./scenes/Posts/UserPosts";
import UserProfileScreen from "./scenes/User";

import {AccountStack} from "../auth/AuthRoute";

const SEStack = createSharedElementStackNavigator();

function UsersStack() {
    return (
        <SEStack.Navigator screenOptions={{
            headerStyle: {backgroundColor: 'transparent'},
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }, headerBackTitle:" "
        }}>
            <SEStack.Screen name="AllUsers" component={UsersScreen} options={{title:'Follow Users'}}/>
        </SEStack.Navigator>
    );
}

export function UserStack() {
    return (
        <SEStack.Navigator initialRouteName="Profile"
                           screenOptions={{
                               headerStyle: {backgroundColor: 'transparent',},
                               headerTintColor: '#fff',
                               headerTitleStyle: {
                                   fontWeight: 'bold',
                               }, headerBackTitle:" "
                           }}>
            <SEStack.Screen name="Profile" component={UserProfileScreen}/>
            <SEStack.Screen name="Stats" component={UserContainerScreen} options={{title:"Followers"}}/>
            <SEStack.Screen name="UserPosts" component={UserPostsScreen} options={{title:""}}/>
            <SEStack.Screen name="Account" component={AccountStack} options={{headerShown: false}}/>
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

