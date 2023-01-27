import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//IMPORT SCENES
import RegisterScreen from "./scenes/Register";
import LoginScreen from "./scenes/Login";
import TermsAndConditionScreen, {PrivacyPolicy as PrivacyPolicyScreen} from "./scenes/T&C";

import EditProfileScreen from "./scenes/Account/EditProfile";
import ChangePasswordScreen from "./scenes/Account/ChangePassword";
import BlockedUserScreen from "./scenes/Account/BlockedUser";
import AccountSettingsScreen from "./scenes/Account/AccountSettings";

// SCREEN OPTIONS
const screenOptions = {
    headerStyle: {
        backgroundColor: 'transparent',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }, headerBackTitle:" "
}

//Create Routes Stack
const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
            <Stack.Screen name="TermsAndCondition" component={TermsAndConditionScreen} options={{title:"Terms And Condition", headerBackTitle: " "}}/>
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{title:"Privacy Policy", headerBackTitle: " "}}/>
        </Stack.Navigator>
    );
}
export function AccountStack() {
    return (
        <Stack.Navigator initialRouteName="AccountSettings" screenOptions={screenOptions}>
            <Stack.Screen name="AccountSettings" component={AccountSettingsScreen}/>
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{title:"Edit Profile"}}/>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{title:"Change Password"}}/>
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
