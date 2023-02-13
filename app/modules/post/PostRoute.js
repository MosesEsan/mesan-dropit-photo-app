import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from "react-navigation-shared-element";

// LIST
import PostsScreen from "./scenes/Posts";
import MapViewScreen from "./scenes/MapView";

export {default as PictureViewScreen} from "./scenes/PictureView";

// CREATE
import AddNewScreen from "./scenes/AddNew/AddNew";
import AddCaptionPrivacyScreen from "./scenes/AddNew/AddCaptionPrivacy";
import TagUserScreen from "./scenes/AddNew/TagUser";

import {DIScreenOptions} from "../../AppConfig";

const SEStack = createSharedElementStackNavigator();
const Stack = createStackNavigator();

function PostStack() {
    return (
        <SEStack.Navigator initialRouteName="Posts" screenOptions={DIScreenOptions}>
            <SEStack.Screen name="Posts" component={PostsScreen} />
            <SEStack.Screen name="MapView" component={MapViewScreen} options={{headerShown: false}}/>
        </SEStack.Navigator>
    );
}

// CREATE
export function CreateStack() {
    return (
        <Stack.Navigator screenOptions={DIScreenOptions}>
            <Stack.Group>
                <Stack.Screen name="AddNew" component={AddNewScreen} options={{headerShown: false}}/>
                <Stack.Screen name="AddCaptionPrivacy" component={AddCaptionPrivacyScreen}  options={{headerShown: false}}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="TagUsers" component={TagUserScreen} options={{title:"Followers", headerBackTitle: " "}}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}


export const tabIcon = {
    name: 'home-outline',
    color: 'rgb(130, 130, 130)',
    type: 'ionicon',
};


export default PostStack;

