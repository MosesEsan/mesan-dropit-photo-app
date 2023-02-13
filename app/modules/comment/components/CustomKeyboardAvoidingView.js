import React from "react";
import {KeyboardAvoidingView, StatusBar} from "react-native";
import {useHeaderHeight} from "@react-navigation/elements";

export default function CustomKeyboardAvoidingView({ children, style }) {
    const headerHeight = useHeaderHeight();

    return (
        <KeyboardAvoidingView
            style={style}
            behavior="padding"
            keyboardVerticalOffset={headerHeight + StatusBar.currentHeight}
        >
            {children}
        </KeyboardAvoidingView>
    );
}
