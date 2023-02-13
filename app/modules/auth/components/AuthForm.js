import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from "@rneui/themed";

import AuthTextBox from "./AuthTextBox";

export default function AuthForm(props){
    return(
        <View style={[props.containerStyle]}>
            {
                props.fields.map((field, idx) => {
                    return(
                        <AuthTextBox
                            key={`auth_text${idx}_box`}
                            {...field}
                            labelStyle={props.labelStyle}
                            containerStyle={{marginBottom: ((idx + 1) === props.fields.length) ? 0 :20}}/>
                    )
                })
            }
            {props.error && <Text style={[styles.error]}>{props.error}</Text>}
            <Button title={props.buttonTitle}
                    onPress={props.onSubmit}
                    loading={props.loading}
                    disabled={props.disabled}
                    containerStyle={[{marginTop: 20}]}
                    buttonStyle={[styles.button, props.buttonStyle]}
                    disabledStyle={[styles.button, props.buttonStyle]}
                    titleStyle={styles.buttonText}/>
        </View>
    )
}

AuthForm.defaultProps ={
    fields: [],
    error: null,
    onSubmit: null,
    disabled: false,
    loading: false,
    buttonTitle: "Submit",
    labelStyle: {},
    buttonStyle: {},
}

AuthTextBox.defaultProps = {
    label: "",
    labelStyle: {},
    containerStyle: {},
    textStyle: {}
}

const styles = StyleSheet.create({
    error:{
        color: "red",
        marginVertical: 12
    },

    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        marginTop:10
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 17,
        fontFamily: 'Helvetica Neue',
        textAlign:"center",
        color: "#fff",
    }
});
