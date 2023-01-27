import React from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import DIText from "../../../components/DIText";
import AnimatedSplash from "react-native-animated-splash-screen";

export default function AuthSplash(props) {
    return (
        <AnimatedSplash
            translucent={true}
            isLoaded={props.isLoaded}
            logoImage={require("../../../assets/images/app-logo.png")}
            backgroundColor={"#0E0E0E"}
            logoHeight={150}
            logoWidth={150}>
            {props.children}
        </AnimatedSplash>
    )
    return (
        <View style={[styles.container]}>
            <DIText bold style={{fontSize: 36, color: "#ffffff"}}>
                DropIt!
            </DIText>
            <ActivityIndicator style={[{marginTop: 20}]}/>
        </View>
    )
}

AuthSplash.defaultProps = {
    isLoaded: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
        backgroundColor: "#0E0E0E"
    }
})
