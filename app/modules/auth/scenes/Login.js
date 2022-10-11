import React, {useState, useMemo} from 'react';
import { View,Text} from 'react-native';

import {useMutation} from "@apollo/client";
import {Button} from "@rneui/themed";

import {useAuth} from "../AuthProvider";
import {LOGIN} from "../AuthService";

import AuthContainer from "../components/AuthContainer";
import TextBox from "../components/AuthTextBox";

import styles from "./styles";

export default function Login(props) {
    const {navigation} = props;

    //1 - DECLARE VARIABLES
    const [email, setEmail] = useState("mosesesan@hotmail.com");
    const [password, setPassword] = useState("graphpasswordql");
    const [error, setError] = useState(null);

    const {handleLogin} = useAuth();

    const [login, {loading:isLoggingIn}] = useMutation(LOGIN, {
        onCompleted, onError
    });

    //===================================================================================================
    //3 - GRAPHQL HANDLERS
    async function onCompleted(data) {
        console.log(data.login)
        console.log(data.login.token)
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

    // ==========================================================================================
    //4 RENDER VIEW
    return (
        <AuthContainer containerStyle={[styles.container]}>
            <View style={[styles.wrapper]}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Welcome!</Text>
                    <Text style={styles.subHeader}>Please sign into your account</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <TextBox onChangeText={(text) => setEmail(text)}
                             label={"Email"}
                             placeholder={"Email Address"}
                             value={email}
                             containerStyle={{marginBottom: 20}}/>
                    <TextBox onChangeText={(text) => setPassword(text)}
                             label={"Password"}
                             placeholder={"Password"}
                             secureTextEntry={true}
                             value={password}/>

                    {error && <Text style={[styles.error]}>{error}</Text>}

                    <Button title={"Login"}
                            onPress={onSubmit}
                            loading={isLoggingIn}
                            disabled={disabled}
                            containerStyle={[{marginTop: 20}]}
                            buttonStyle={[styles.button]}
                            disabledStyle={[styles.button]}
                            titleStyle={styles.buttonText}/>
                </View>

                <View style={{marginTop: 20}}>
                    <Text style={[styles.labelText, {}]} onPress={() => navigation.navigate("Register")}>
                        Don't have an account? <Text style={styles.ctaLink}>Register</Text>
                    </Text>
                </View>
            </View>
        </AuthContainer>
    );
};
