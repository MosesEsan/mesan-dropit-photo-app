import React from "react";
import {StyleSheet} from "react-native";

import {Button} from "@rneui/themed";

export default function DIButton({title, onPress}){
return(
    <Button title={title}
            onPress={onPress}
            containerStyle={[{
                margin: 12,
                marginBottom: 32,
                // position: "absolute", left: 0, bottom: 0, right: 0
            }]}
            buttonStyle={[newStyles.button]}
            disabledStyle={[newStyles.button]}
            titleStyle={newStyles.buttonText}/>
)
}


const newStyles = StyleSheet.create({
    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#C55110",
        marginTop: 10
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 17,
        fontFamily: 'Helvetica Neue',
        textAlign: "center",
        color: "#fff",
    }
})
