import React from "react";
import {StyleSheet} from "react-native";

import {Button} from "@rneui/themed";
import DIListView from "./DIListView";

export default function DIButton({title, onPress, containerStyle}){
return(
    <Button title={title}
            onPress={onPress}
            containerStyle={[{
                // margin: 12,
                // marginBottom: 32,
            }, containerStyle]}
            buttonStyle={[newStyles.button]}
            disabledStyle={[newStyles.button]}
            titleStyle={newStyles.buttonText}/>
)
}

DIButton.defaultProps = {
    containerStyle:{}
}


const newStyles = StyleSheet.create({
    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#C55110",
        // marginTop: 10
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 17,
        fontFamily: 'Helvetica Neue',
        textAlign: "center",
        color: "#fff",
    }
})
