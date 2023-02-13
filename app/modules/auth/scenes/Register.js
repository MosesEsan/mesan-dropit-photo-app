import React, {useState, useMemo} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {useMutation} from "@apollo/client";

import {useAuth} from "../AuthProvider";
import {REGISTER} from "../AuthService";

import AuthContainer from "../components/AuthContainer";
import AuthForm from "../components/AuthForm";

import styles from "./styles";
import {useTheme} from "@react-navigation/native";
import DIText from "../../../components/DIText";

export default function Register(props) {
    const {navigation} = props;

    //0 - DECLARE PROVIDERS VARIABLES
    const {colors} = useTheme();
    const {handleLogin} = useAuth();

    //1 - DECLARE VARIABLES
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    const [signup, {loading:isRegistering}] = useMutation(REGISTER, {onCompleted, onError});
    async function onCompleted(data) {
        await handleLogin(data.signup);
    }

    function onError(error) {
        setError(error.message)
    }

    //==================================================================================================
    //4 - Action HANDLERS
    const disabled = useMemo(() => {
        return !(email.length > 0 && password.length > 0)
    }, [email, password]);

    async function onSubmit() {
        try {
            let data = {email, password, name};
            await signup({variables: data});
        } catch (error) {
            setError(error.message)
        }
    }

    const fields = [
        {
            label: "Name",
            placeholder: "Enter your name",
            value: name,
            onChangeText: setName
        },
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
    //==================================================================================================
    return (
        <AuthContainer containerStyle={[styles.container, {backgroundColor: colors.background}]}>
            <ScrollView style={[styles.wrapper]}>
                <View style={styles.headerContainer}>
                    <DIText bold style={styles.headerText}>Create new account</DIText>
                    <DIText medium style={styles.subHeader}>Please fill in the form to continue</DIText>
                </View>
                <AuthForm
                    error={error}
                    fields={fields}
                    buttonTitle={"REGISTER"}
                    onSubmit={onSubmit}
                    loading={isRegistering}
                    disabled={disabled}
                    labelStyle={{fontFamily:'Poppins-Regular'}}
                    buttonStyle={{backgroundColor: colors.card}}
                    containerStyle={{marginTop: 20}}/>
                <View style={{marginTop: 20}}>
                    <DIText style={[styles.labelText, {}]}>
                        Already have an account?
                        <DIText style={[styles.ctaLink, {color: colors.card}]}  onPress={() => navigation.replace("Login")}>
                            {` Login`}
                        </DIText>
                    </DIText>
                    <DIText style={[styles.labelText, {marginTop: 40}]}>
                        {`By continuing, you agree to the `}
                        <DIText medium
                                onPress={() => navigation.navigate('TermsAndCondition')}>
                            {`Terms of Services `}
                        </DIText> &
                        <DIText medium
                                onPress={() => navigation.navigate('PrivacyPolicy')}>
                            {` Privacy Policy.`}
                        </DIText>
                    </DIText>
                </View>
            </ScrollView>
        </AuthContainer>
    );
};
