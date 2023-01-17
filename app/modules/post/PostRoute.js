import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// LIST
import PostsScreen from "./scenes/Posts";
import MapViewScreen from "./scenes/MapView";
import CommentsScreen from "./scenes/Comments";
import DirectionsScreen from "./scenes/Directions";


export {default as PictureViewScreen} from "./scenes/PictureView";

// CREATE
import AddNewScreen from "./scenes/AddNew/AddNew";
import AddCaptionPrivacyScreen from "./scenes/AddNew/AddCaptionPrivacy";
import TagUserScreen from "./scenes/AddNew/TagUser";

import {createSharedElementStackNavigator} from "react-navigation-shared-element";
import {useTheme} from "../ThemeProvider";

const SEStack = createSharedElementStackNavigator();
const Stack = createStackNavigator();

function PostStack() {
    const {options} = useTheme()

    return (
        <SEStack.Navigator initialRouteName="Posts">
            <SEStack.Screen name="Posts" component={PostsScreen}
                            options={(props) => options(props, '')}/>
            <SEStack.Screen name="MapView" component={MapViewScreen}
                            options={{headerShown: false}}/>
            {/*<SEStack.Screen name="Directions" component={DirectionsScreen}*/}
            {/*                options={(props) => options(props, 'Directions')}/>*/}
            <SEStack.Screen name="Comments" component={CommentsScreen} options={{headerShown: true}}/>
        </SEStack.Navigator>
    );
}

// CREATE
export function CreateStack() {
    const {options} = useTheme()
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="AddNew" component={AddNewScreen} options={{headerShown: false}}/>
                <Stack.Screen name="AddCaptionPrivacy" component={AddCaptionPrivacyScreen}
                              options={(props) => options(props, 'Add Drop')}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="TagUsers" component={TagUserScreen}
                              options={(props) => options(props, 'Followers')}/>
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

