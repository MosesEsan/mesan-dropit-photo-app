import React, {useState, useMemo, useCallback} from 'react';
import {Text, View} from 'react-native';

import {useMutation} from "@apollo/client";
import {Button} from "@rneui/themed"

import {useAuth} from "../AuthProvider";
import {UPDATE_PASSWORD} from "../AuthService";

import AuthContainer from "../components/AuthContainer";
import TextBox from "../components/AuthTextBox";

import styles from "./styles";

export default function ChangePassword({navigation}) {
    const {updateCurrentUser} = useAuth();

    //1 - DECLARE VARIABLES
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [resetPassword] = useMutation(UPDATE_PASSWORD, {
        onCompleted, onError
    });

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    function onCompleted(data) {
        setIsSubmitting(false);

        setError(null);
        alert("Password Updated");
        setSuccess("Password Updated");
        updateCurrentUser(data.updateUser);
    }

    function onError(error) {
        setIsSubmitting(false);

        setSuccess(null);
        setError(error.message);
    }

    //==================================================================================================
    //4 - ACTION HANDLERS
    const disabled = useMemo(() => {
        return !(currentPassword.length > 0 && newPassword.length > 0)
    }, [currentPassword, newPassword]);

    async function onSubmit() {
        try {
            let data = {currentPassword, newPassword};
            await resetPassword({variables: data});
        } catch (error) {
            setSuccess(null);
            setError(error.message);
            setIsSubmitting(false);
        }
    }

    //==================================================================================================
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

    // ==========================================================================================
    //5 - RENDER VIEW
    return (
        <AuthContainer containerStyle={[styles.container]}>
            <View style={[styles.wrapper]}>
                <TextBox onChangeText={(text) => setCurrentPassword(text)}
                         label={"Current Password"}
                         placeholder={"Current Password"}
                         secureTextEntry={true}
                         value={currentPassword}
                         containerStyle={{marginBottom: 20}}/>

                <TextBox onChangeText={(text) => setNewPassword(text)}
                         label={"New Password"}
                         placeholder={"New Password"}
                         secureTextEntry={true}
                         value={newPassword}
                         containerStyle={{marginBottom: 20}}/>

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




