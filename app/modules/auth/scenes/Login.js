import React, {useState, useMemo} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {useMutation} from "@apollo/client";
import {useTheme} from "@react-navigation/native";

import {useAuth} from "../AuthProvider";
import {LOGIN} from "../AuthService";

import AuthContainer from "../components/AuthContainer";
import AuthForm from "../components/AuthForm";

import styles from "./styles";
import DIText from "../../../components/DIText";

export default function Login(props) {
    const {navigation} = props;

    //0 - DECLARE PROVIDERS VARIABLES
    const {colors} = useTheme();
    const {handleLogin} = useAuth();

    //1 - DECLARE VARIABLES
    const [email, setEmail] = useState("testuser@dropit.com");
    const [password, setPassword] = useState("testpass");
    const [error, setError] = useState(null);

    //===================================================================================================
    //3 - GRAPHQL HANDLERS
    const [login, {loading:isLoggingIn}] = useMutation(LOGIN, {onCompleted, onError});
    async function onCompleted(data) {
        await handleLogin(data.login);
    }

    function onError(error) {
        alert(error.message)
    }

    //==================================================================================================
    //4 - Action HANDLERS
    const disabled = useMemo(() => {
        return !(email.length > 0 && password.length > 0)
    }, [email, password]);


    async function onSubmit() {
        try {
            let data = {email, password};
            await login({variables: data});
        } catch (error) {
            setError(error.message)
        }
    }
    //
    const fields = [
        {
            label: "Email",
            placeholder: "Email Address",
            value: email,
            autoCapitalize: 'none',
            onChangeText: setEmail
        },
        {
            label: "Password",
            placeholder: "Password",
            value: password,
            onChangeText: setPassword,
            secureTextEntry: true
        }
    ]

    // ==========================================================================================
    //4 RENDER VIEW
    return (
        <AuthContainer containerStyle={[styles.container, {backgroundColor: colors.background}]}>
            <ScrollView style={[styles.wrapper]}>
                <View style={styles.headerContainer}>
                    <DIText bold style={styles.headerText}>Welcome!</DIText>
                    <DIText medium style={styles.subHeader}>Please sign into your account</DIText>
                </View>
                <AuthForm
                    error={error}
                    fields={fields}
                    buttonTitle={"Login"}
                    loading={isLoggingIn}
                    disabled={disabled}
                    onSubmit={onSubmit}
                    buttonStyle={{backgroundColor: colors.card}}
                    containerStyle={{marginTop: 20}}/>
                <View style={{marginTop: 20}}>
                    <DIText style={[styles.labelText, {}]} onPress={() => navigation.replace("Register")}>
                        Don't have an account?
                        <DIText style={[styles.ctaLink, {color: colors.card}]}>
                            {` Register`}
                        </DIText>
                    </DIText>
                </View>
            </ScrollView>
        </AuthContainer>
    );
};
