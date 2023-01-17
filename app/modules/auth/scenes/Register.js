import React, {useState, useMemo} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {useMutation} from "@apollo/client";
import {Button} from "@rneui/themed";

import {useAuth} from "../AuthProvider";
import {REGISTER} from "../AuthService";

import AuthContainer from "../components/AuthContainer";
import TextBox from "../components/AuthTextBox";

import styles from "./styles";

export default function Register(props) {
    const {navigation} = props;

    //1 - DECLARE VARIABLES
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const {handleLogin} = useAuth();

    const [signup, {loading:isRegistering}] = useMutation(REGISTER, {
        onCompleted, onError
    });

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    async function onCompleted(data) {
        await handleLogin(data.signup);
    }

    function onError(error) {
        setError(error.message)
    }

    //==================================================================================================

    const disabled = useMemo(() => {
        return !(email.length > 0 && password.length > 0)
    }, [email, password]);


    const onPress = async () => {
        await onSubmit()
    }

    async function onSubmit() {
        try {
            let data = {email, password, name};
            await signup({variables: data});
        } catch (error) {
            setError(error.message)
        }
    }

    //==================================================================================================

    return (
        <AuthContainer containerStyle={[styles.container]}>
            <ScrollView style={[styles.wrapper]}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Create new account</Text>
                    <Text style={styles.subHeader}>Please fill in the form to continue</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <TextBox onChangeText={(text) => setName(text)}
                             label={"Name"}
                             placeholder={"Name"}
                             value={name}
                             containerStyle={{marginBottom: 20}}/>
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

                    {error && <Text style={[{color: "red", marginVertical: 12}]}>{error}</Text>}

                    <Button title={"REGISTER"}
                            onPress={onPress}
                            loading={isRegistering}
                            disabled={disabled}
                            containerStyle={[{marginTop: 20}]}
                            buttonStyle={[styles.button]}
                            disabledStyle={[styles.button]}
                            titleStyle={styles.buttonText}/>
                </View>

                <View style={{marginTop: 20}}>
                    <Text style={[styles.labelText, {}]} onPress={() => navigation.navigate("Login")}>
                        Already have an account? <Text style={styles.ctaLink}>Login</Text>
                    </Text>
                    <Text style={[styles.labelText, {marginTop: 40}]}>
                        By continuing, you agree to the <Text style={{fontWeight: "500"}}>
                        Terms of Services</Text> & <Text style={{fontWeight: "500"}}>Privacy Policy</Text>.
                    </Text>
                </View>
            </ScrollView>
        </AuthContainer>
    );
};
