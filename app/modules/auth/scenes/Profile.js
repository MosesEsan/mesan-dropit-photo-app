import React, {useState} from 'react';
import { SafeAreaView,  StyleSheet, ScrollView} from 'react-native';

import {useMutation} from "@apollo/client";

import AuthUserImage from "../components/AuthUserImage";

import {UPDATE_USER} from "../AuthService";
import {useAuth} from "../AuthProvider";

export default function Profile({navigation}) {
//1 - DECLARE VARIABLES
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const {updateUser:updateUserState} = useAuth();

    const [updateUser] = useMutation(UPDATE_USER, {onCompleted, onError})

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    function onCompleted(data) {
        updateUserState(data.updateUser);
        setIsUploading(false)
    }

    function onError(error) {
        alert(error.message)
        setError(error.message)
        setIsUploading(false)
    }

    //==================================================================================================
    //4 - ACTION HANDLERS
    async function onDone(imageUrl) {
        setIsUploading(true);
        try {
            await updateUser({variables: {image:imageUrl}});
        } catch (error) {
            setError(error)
        } finally {
            setIsUploading(false)
        }
    }

    //==========================================================================================
    //5 - RENDER VIEW
    return (
        <SafeAreaView style={[{flex: 1, backgroundColor: "#1C0284"}]}>
            <ScrollView>
                <AuthUserImage onDone={onDone}
                               isUploading={isUploading}
                               baseUrl={""}
                               enableUpload={true}/>
            </ScrollView>
        </SafeAreaView>
    );
};












