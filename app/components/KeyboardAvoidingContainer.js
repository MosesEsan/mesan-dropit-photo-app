import React from "react";
import {Keyboard, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback} from "react-native";

export default function KeyboardAvoidingContainer(props) {
    return (
        <SafeAreaView style={[{flex: 1}, props.containerStyle]}>
            <KeyboardAvoidingView keyboardVerticalOffset={0} behavior="padding" style={{flex: 1}}>
                <TouchableWithoutFeedback onLongPress={Keyboard.dismiss} accessible={false}>
                    {props.children}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
