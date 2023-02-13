import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from "@rneui/themed";

import DIText from "../../../components/DIText";

export default function AuthTextBox(props){
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(props.secureTextEntry);

    //==================================================================================================
    // ACTION HANDLERS
    const onShowPassword = () => {
        setIsSecureTextEntry(!isSecureTextEntry);
    };

    return(
        <View style={[styles.container, props.containerStyle]}>
            <DIText style={[styles.labelText, props.labelStyle]}>{props.label}</DIText>

            <View style={[styles.textInputContainer]}>
                <TextInput
                    placeholderTextColor={'#5c5858'}
                    {...props}
                    secureTextEntry={isSecureTextEntry}
                    keyboardType={props.numeric ? 'numeric' : 'default'}
                    style={[styles.text, props.textStyle, {flex: 1, height: 50}]}
                />
                {props.secureTextEntry && (
                    <TouchableOpacity onPress={onShowPassword} activeOpacity={1}>
                        <View
                            style={styles.center}>
                            <Icon
                                size={18}
                                name={!isSecureTextEntry ? 'ios-eye-off-outline' : 'ios-eye-outline'}
                                type="ionicon"
                                containerStyle={[]}
                                color="#aaa"
                            />
                        </View>
                    </TouchableOpacity>
                )}
            </View>

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
    container: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },

    labelText: {
        fontSize: 16,
        lineHeight: 21,
        marginBottom: 12,
        color:"#fff"
    },

    textInputContainer: {
        flexDirection: 'row',
        overflow:"hidden",

        borderRadius: 10,
        shadowColor: '#000000',
        shadowRadius: 0,
        shadowOffset: {
            height: 1,
            width: 1,
        },
    },

    text: {
        fontSize: 16,
        fontFamily: 'Helvetica Neue',
        paddingHorizontal: 16,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: "gray",
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
    },


});
