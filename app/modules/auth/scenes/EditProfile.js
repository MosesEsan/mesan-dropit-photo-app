import React, {useState, useMemo, useCallback} from 'react';
import {
    Text,
    View,
} from 'react-native';

import {useMutation} from "@apollo/client";
import {Button} from "@rneui/themed"

import {useAuth} from "../AuthProvider";
import {useTheme} from "../../ThemeProvider";
import {UPDATE_USER} from "../AuthService";

import AuthContainer from "../components/AuthContainer";
import AuthUserImage from "../components/AuthUserImage";
import TextBox from "../components/AuthTextBox";

import {useUploadToCloudinary} from "../../drop/useUploadToCloudinary";

import styles from "./styles";

export default function EditProfile({navigation}) {
    const {state:{currentUser}, updateCurrentUser} = useAuth();

    //1 - DECLARE VARIABLES
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState(currentUser.name || "");
    const [username, setUsername] = useState(currentUser.username || "");
    const [image, setImage] = useState(null);

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const {start, uploadedUrl, response, hasErrored, progress} = useUploadToCloudinary();

    const [updateUser] = useMutation(UPDATE_USER, {
        onCompleted, onError
    });

    const  {backgroundColor} = useTheme()

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    function onCompleted(data) {
        setIsUploading(false)
        setIsSubmitting(false);

        setError(null);
        setSuccess("Profile Updated");
        updateCurrentUser(data.updateUser);
    }

    function onError(error) {
        setIsUploading(false)
        setIsSubmitting(false);

        setSuccess(null);
        setError(error.message);
    }

    //==================================================================================================
    //4 - ACTION HANDLERS
    async function onSubmit() {
        setIsSubmitting(true);

        let data = {};

        if (name.length > 0 && name !== currentUser.name) data["name"] = name;
        if (username.length > 0 && username !== currentUser.username) data["username"] = username;

        try {
            if (!image) await onUpdateUser(data)
            else if (image) {
                let callback = async (imageUrl) => await onUpdateUser({...data, image:imageUrl});
                start(image, "image", callback);
            }
        } catch (error) {
            setSuccess(null);
            setError(error.message);
            setIsSubmitting(false);
        }
    }

    const onUpdateUser = async (data) => {
        await updateUser({variables: data});
    }

    //==================================================================================================
    const disabled = useMemo(() => {
        let count = 0;

        if (name.length > 0 && name !== currentUser.name) count++;
        if (username.length > 0 && username !== currentUser.username) count++;
        if (image) count++;

        return count <= 0;

    }, [name, username, image]);


    const renderStatus = useCallback(() => {
        let color = "red"
        let text = error

        if (error || success){
            if (success){
                color = "green";
                text = success;
            }
            return(
                <Text style={[{marginVertical: 12, color}]}>
                    {text}
                </Text>
            )
        }

        return null;
    }, [success, error]);

    // ==========================================================================================
    //5 - RENDER VIEW
    return (
        <AuthContainer containerStyle={[{flex:1, backgroundColor}]}>
                    <View style={[styles.wrapper, {padding: 25}]}>
                        <AuthUserImage onDone={setImage}
                                       isUploading={isUploading}
                                       enableUpload={true}/>
                        <TextBox onChangeText={(text) => setName(text)}
                                 label={"Name"}
                                 placeholder={"Name"}
                                 value={name}
                                 containerStyle={{marginBottom: 20}}/>
                        <TextBox onChangeText={(text) => setUsername(text)}
                                 label={"Username"}
                                 placeholder={"Username (Optional)"}
                                 value={username}/>
                        {renderStatus()}
                        <Button title={"Save"}
                                onPress={onSubmit}
                                loading={isSubmitting}
                                disabled={disabled}
                                containerStyle={[{marginTop: 20}]}
                                buttonStyle={[styles.button]}
                                disabledStyle={[styles.button]}
                                titleStyle={styles.buttonText}/>
                    </View>
        </AuthContainer>
    );
};




