import React, {useEffect} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import PostStack, {CreateStack, PictureViewScreen} from "./modules/post/PostRoute";
import UsersStack, {UserStack} from "./modules/users/UserRoute";

import messaging from "@react-native-firebase/messaging";
import {useAuth} from "./modules/auth/AuthProvider";
import DirectionsScreen from "./modules/post/scenes/Directions";
import NotificationStack from "./modules/notification/NotificationRoute";
import {showToast} from "./AppUtil";
import CommentsScreen from "./modules/comment/scenes/Comments";
import TagUserScreen from "./modules/post/scenes/AddNew/TagUser";
import {DIScreenOptions} from "./AppConfig";

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
            showToast('info', remoteMessage.notification.title, remoteMessage.notification.body)
        });

        return unsubscribe;
    }, [isLoggedIn]);


    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        alert("from background")
        console.log('Message handled in the background!', remoteMessage);
    });

    return (
        <Stack.Navigator >
            <Stack.Group>

                <Stack.Screen name="Home" component={PostStack} options={{headerShown: false}}/>

                <Stack.Screen name="Detail" component={PictureViewScreen} options={detailOptions}/>
                {/*<Stack.Screen name="Comments" component={CommentsScreen} options={{headerShown: true}}/>*/}
                <Stack.Screen name="Directions" component={DirectionsScreen} options={{headerShown: false}}/>

                <Stack.Screen name="Users" component={UsersStack} options={{headerShown: false}}/>
                <Stack.Screen name="User" component={UserStack} options={{headerShown: false}}/>

                <Stack.Screen name="Notifications" component={NotificationStack} options={{headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name="MyProfile" component={UserStack} options={{headerShown: false, gestureEnabled: false}}/>
            </Stack.Group>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Create" component={CreateStack} options={{headerShown: false}}/>
                <Stack.Screen name="Comments" component={CommentsScreen} options={DIScreenOptions}/>
                <Stack.Screen name="TagUser" component={TagUserScreen} options={DIScreenOptions}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}
