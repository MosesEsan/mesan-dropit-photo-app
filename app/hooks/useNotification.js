import React from 'react';

import {useMutation} from "@apollo/client";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {REGISTER_FOR_NOTIFICATON} from "../modules/notification/NotificationService";

export const NOTIFICATION_KEY = '@push_notification';

export default function useNotification() {
    async function getDeviceToken(){
        let token = null;
        let error = null;

        const value =  await AsyncStorage.getItem(NOTIFICATION_KEY);
        if(value === null) {
            //Get the existing Notifications permission
            const existingStatus = await messaging().hasPermission();
            let finalStatus = existingStatus;

            //If no permission was previously granted, request for permission
            if (existingStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
                finalStatus = await messaging().requestPermission();
            }

            const granted =
                finalStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                finalStatus === messaging.AuthorizationStatus.PROVISIONAL;

            // Get the token that uniquely identifies this device
            if (granted) token = await messaging().getToken();
            else error = 'Failed to get push token for push notification!'

            console.log("===existingStatus===")
            console.log(`existingStatus: ${existingStatus}`)
            console.log(`finalStatus: ${finalStatus}`)
            console.log(`granted: ${granted}`)
            console.log(`token: ${token}`)
            console.log("======")
        }

        return {token, error}
    }

    const registerForPushNotifications = async () => {
        alert("called")
        const {token, error} = await getDeviceToken()

        if (token){
            await registerForNotification({variables: {deviceToken: token}})
        }else if (error){
            alert(error)
        }
    }

    const [registerForNotification] = useMutation(REGISTER_FOR_NOTIFICATON, {onCompleted, onError});
    async function onCompleted(data) {
        if (data.registerForNotification) {
            // Save token in Asyncstorage
            const jsonValue = JSON.stringify(true)
            await AsyncStorage.setItem(NOTIFICATION_KEY, jsonValue)
        }
    }

    function onError(error) {
        alert("failed", error.message)
    }

    function getInitialNotification(onDone) {
        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    alert("opened from quit state")
                }
                onDone();
            });
    }

    function onNotificationOpenedApp() {
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            alert("opened from background state")
        });
    }


    return [registerForPushNotifications, getInitialNotification, onNotificationOpenedApp];
}
