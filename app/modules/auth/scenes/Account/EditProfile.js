import React, {useState, useMemo, useCallback} from 'react';
import {
    Text,
    View,
} from 'react-native';

import {useMutation} from "@apollo/client";
import {Button} from "@rneui/themed"

import {useAuth} from "../../AuthProvider";
import {useTheme} from "../../../ThemeProvider";
import {UPDATE_USER} from "../../AuthService";

import AuthContainer from "../../components/AuthContainer";
import AuthUserImage from "../../components/AuthUserImage";
import TextBox from "../../components/AuthTextBox";

import {useUploadToCloudinary} from "me-helper-views";

import styles from "../styles";

import {API_KEY, SECRET, CLOUD_NAME} from "../../../../config"

export default function EditProfile({navigation}) {
    //0 - DECLARE PROVIDERS VARIABLES
    const {state: {currentUser}, updateCurrentUser} = useAuth();
    const {backgroundColor} = useTheme()

    //1 - DECLARE VARIABLES
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState(currentUser.name || "");
    const [username, setUsername] = useState(currentUser.username || "");
    const [image, setImage] = useState(null);

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    let config = {api_key: API_KEY, api_secret: SECRET, cloud_name: CLOUD_NAME};
    const {start, uploadedUrl, response, hasErrored, progress} = useUploadToCloudinary(config);

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    const [updateUser] = useMutation(UPDATE_USER, {
        onCompleted, onError
    });

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

    //==============================================================================================
    //UI ACTION HANDLERS
    const renderStatus = useCallback(() => {
        let color = "red"
        let text = error

        if (error || success) {
            if (success) {
                color = "green";
                text = success;
            }
            return (
                <Text style={[{marginVertical: 12, color}]}>
                    {text}
                </Text>
            )
        }

        return null;
    }, [success, error]);

    //==================================================================================================
    //4 - ACTION HANDLERS
    async function onSubmit() {
        setIsSubmitting(true);

        let data = {};

        if (name.length > 0 && name !== currentUser.name) data["name"] = name;
        if (username.length > 0 && username !== currentUser.username) data["username"] = username;

        try {
            if (!image) await updateUser({variables: data});
            else if (image) {
                let callback = async (imageUrl) => await onUpdateUser({...data, image: imageUrl});
                start(image, "image", callback);
            }
        } catch (error) {
            setSuccess(null);
            setError(error.message);
            setIsSubmitting(false);
        }
    }


    //==================================================================================================
    // DYNAMIC VARIABLES
    const disabled = useMemo(() => {
        let count = 0;

        if (name.length > 0 && name !== currentUser.name) count++;
        if (username.length > 0 && username !== currentUser.username) count++;
        if (image) count++;

        return count <= 0;

    }, [name, username, image]);


    // ==========================================================================================
    //5 - RENDER VIEW
    return (
        <AuthContainer containerStyle={[{flex: 1, backgroundColor}]}>
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
