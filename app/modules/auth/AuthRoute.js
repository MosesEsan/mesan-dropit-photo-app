import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//IMPORT SCENES
import RegisterScreen from "./scenes/Register";
import LoginScreen from "./scenes/Login";

import EditProfileScreen from "./scenes/Account/EditProfile";
import ChangePasswordScreen from "./scenes/Account/ChangePassword";
import BlockedUserScreen from "./scenes/Account/BlockedUser";
import AccountSettingsScreen from "./scenes/Account/AccountSettings";

import {useTheme} from "../ThemeProvider";

//Create Routes Stack
const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export function AccountStack() {
    const  {options} = useTheme()
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} options={{headerShown: false, title:'Account Settings'}}/>
            <Stack.Screen name="EditProfile" component={EditProfileScreen}
                          options={(props) => options(props, 'Edit Profile')}/>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}
                          options={(props) => options(props, 'Change Password')}/>
            <Stack.Screen name="BlockedUser" component={BlockedUserScreen} options={{headerShown: false, title:"Blocked Users"}}/>
        </Stack.Navigator>
    );
}

export const tabIcon = {
    icon: "user",
    color: 'rgb(130, 130, 130)',
    type: "feather",
    style: {flex: 1}
};


export default AuthStack;
