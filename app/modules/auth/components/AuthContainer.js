import React from 'react';
import {SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';

export default function AuthContainer(props) {
    return (
        <SafeAreaView style={[{ flex: 1}, props.containerStyle]}>
            <KeyboardAvoidingView keyboardVerticalOffset={0} behavior="padding" style={{flex: 1}}>
                <TouchableWithoutFeedback onLongPress={Keyboard.dismiss} accessible={false}>
                    {props.children}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

AuthContainer.defaultProps = {
    containerStyle: {}
}
