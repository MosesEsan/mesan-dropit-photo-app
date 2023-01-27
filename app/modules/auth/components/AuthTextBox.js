import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {Button} from "@rneui/themed";

export default function AuthTextBox(props){
    return(
        <View style={[props.containerStyle]}>
            <Text style={[styles.labelText, props.labelStyle]}>{props.label}</Text>
            <TextInput placeholderTextColor={"#5c5858"} {...props} style={[styles.text, props.textStyle]}/>
        </View>
    )
}

export function AuthForm(props){
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
    labelText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "500",
        marginBottom: 12,
        color:"#fff"
    },

    text: {
        fontSize: 16,
        fontFamily: 'Helvetica Neue',
        paddingHorizontal: 16,
        height: 60,
        backgroundColor: "rgb(241, 245, 249)",
        borderRadius: 10,
        borderColor: "gray",
    },

    error:{
        color: "red",
        marginVertical: 12
    },


    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#C55110",
        marginTop:10
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 17,
        fontFamily: 'Helvetica Neue',
        textAlign:"center",
        color: "#fff",
    },
});
