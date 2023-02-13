import React, {useState, useMemo, useCallback} from 'react';
import {Text, View} from 'react-native';

import {useMutation} from "@apollo/client";

import {useAuth} from "../../AuthProvider";
import {UPDATE_PASSWORD} from "../../AuthService";

import AuthContainer from "../../components/AuthContainer";
import AuthForm from "../../components/AuthForm";

import styles from "../styles";
import {useTheme} from "@react-navigation/native";

export default function ChangePassword({navigation}) {
    //0 - DECLARE PROVIDERS VARIABLES
    const {updateCurrentUser} = useAuth();
    const {colors} = useTheme()

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
        setIsSubmitting(true);
        try {
            let data = {currentPassword, newPassword};

            console.log(data)
            await resetPassword({variables: data});
        } catch (error) {
            setSuccess(null);
            setError(error.message);
            setIsSubmitting(false);
        }
    }

    //==================================================================================================
    const fields = [
        {
            label: "Current Password",
            placeholder: "Current Password",
            value: currentPassword,
            autoCapitalize: 'none',
            onChangeText: setCurrentPassword,
            secureTextEntry: true
        },
        {
            label: "New Password",
            placeholder: "New Password",
            value: newPassword,
            onChangeText: setNewPassword,
            secureTextEntry: true
        }
    ]

    // ==========================================================================================
    //5 - RENDER VIEW
    return (
        <AuthContainer containerStyle={[{flex: 1, backgroundColor:colors.background}]}>
            <View style={[styles.wrapper]}>
                <AuthForm
                    error={error}
                    fields={fields}
                    buttonTitle={"Save"}
                    loading={isSubmitting}
                    disabled={disabled}
                    onSubmit={onSubmit}
                    buttonStyle={{backgroundColor: colors.card}}
                    containerStyle={{marginTop: 20}}/>
            </View>
        </AuthContainer>
    );
};




