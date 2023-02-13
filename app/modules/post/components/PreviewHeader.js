import {StyleSheet, View} from "react-native";
import {DINavButton} from "../../../components/DIHeader";
import {Button} from "@rneui/themed";
import React from "react";
import {DIFont} from "../../../AppConfig";

export default function PreviewHeader({containerStyle = {}, navigation, title, onPress, loading, disabled}){
    return(
        <View style={[{flexDirection: "row", width: "100%", paddingVertical:12 }, containerStyle]}>
            <View style={{flex: 1, alignItems: "flex-start", paddingLeft:12}}>
                <DINavButton button={{
                    ...{
                        type: "ionicon",
                        name: "ios-close",
                        size: 34,
                        color: "#FFF",
                        onPress: () => navigation.goBack(),
                        containerStyle: {}
                    }
                }}/>
            </View>

            <View style={{flex: 1, alignItems: "flex-end", paddingRight:12}}>
                <Button title={title}
                        onPress={onPress}
                        containerStyle={[{}]}
                        loading={loading}
                        disabled={disabled}
                        buttonStyle={[styles.button,]}
                        disabledStyle={[styles.button]}
                        titleStyle={styles.buttonText}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#ffffff",
        // marginTop: 10
    },

    buttonText: {
        fontSize: 13,
        fontFamily: DIFont.semibold,
        textAlign: "center",
        color: "#000000",
    }
})
