import React, {useState} from "react";
import {StyleSheet, TextInput, View, ActivityIndicator, Image, Text, Animated} from "react-native";

import {Icon} from "@rneui/themed";
// import {LinearGradient} from 'expo-linear-gradient';

export const CloseIcon = ({onPress}) => (
    <Icon
        name='close'
        type='evilicon'
        size={44}
        color='#fff'
        containerStyle={{
            position: 'absolute',
            top: 0,
            right: 0, width: 64, paddingLeft: 20, paddingTop: 20, paddingBottom: 5,
            zIndex: 4,
        }}
        style={{}}
        onPress={onPress}
    />
);

export function MessageBox(props) {
    const {item, text, setText, onPress, isSaving} = props;
    const colors = ["transparent", "rgba(0, 0, 0, 0.1)",
        "rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.5)",
        "rgba(0, 0, 0, 0.6)"];
    return (
        // <View style={{position: 'absolute', bottom: 0, right: 0, left: 0}}>
            <View style={{paddingVertical: 0, borderWidth:1, flex:1}} colors={colors}>
                <View style={{
                    flexDirection: "row",
                    // paddingBottom: 8,
                    paddingHorizontal: 10,
                    alignItems:"center"
                }}>
                    <View style={[styles.textContainer]}>
                        <TextInput
                            multiline={true}
                            onChangeText={(text) => setText(text)}
                            placeholder={"Add a comment..."} placeholderTextColor={"#fff"}
                            style={[styles.text]}
                            maxLength={200}
                            value={text}/>
                    </View>

                    {/*<View style={styles.sendIconContainer}>*/}
                    {/*    {*/}
                    {/*        isSaving ?*/}
                    {/*            <ActivityIndicator size="small" color="#fff"/>*/}
                    {/*            :*/}
                    {/*            <Icon*/}
                    {/*                name='send'*/}
                    {/*                type='material-community'*/}
                    {/*                size={24}*/}
                    {/*                color='red'*/}
                    {/*                style={{}}*/}
                    {/*                onPress={onPress}*/}
                    {/*            />*/}
                    {/*    }*/}
                    {/*</View>*/}
                </View>

            </View>
    );
}


const styles = StyleSheet.create({

    textContainer: {
        flex: 1,
    },

    sendIconContainer: {
        width: 50, height: 45, marginLeft: 10, justifyContent: "center"
    },

    text: {
        borderRadius: 45 / 2,
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'Helvetica Neue',
        color: "#fff",
        paddingHorizontal: 16,
        paddingTop: 9,
        paddingBottom: 8,
        height: 45,
        backgroundColor: "#ccc",
        borderWidth: 1,
        borderColor: "white",

    },
});
