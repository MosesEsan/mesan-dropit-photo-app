import messaging from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const NOTIFICATION_KEY = '@push_notification';

export default async function getDeviceToken(){
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
};

