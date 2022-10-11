import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//IMPORT SCENES
import RegisterScreen from "./scenes/Register";
import LoginScreen from "./scenes/Login";

import EditProfileScreen from "./scenes/EditProfile";
import ChangePasswordScreen from "./scenes/ChangePassword";
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
        <Stack.Navigator initialRouteName="EditProfile">
            <Stack.Screen name="EditProfile" component={EditProfileScreen}
                          options={(props) => options(props, 'Edit Profile')}/>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}
                              options={(props) => options(props, 'Change Password')}/>
        </Stack.Navigator>
    );
}

export default AuthStack;
