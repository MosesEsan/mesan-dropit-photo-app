import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

export default function AuthTextBox(props){
    return(
        <View style={[props.containerStyle]}>
            <Text style={[styles.labelText, props.labelStyle]}>{props.label}</Text>
            <TextInput placeholderTextColor={"#5c5858"} {...props} style={[styles.text, props.textStyle]}/>
        </View>
    )
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
    }
});
