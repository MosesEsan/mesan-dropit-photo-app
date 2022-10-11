import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {Icon} from "@rneui/themed";

export const NavButton = (props) => {
    return (
        <Icon {...props} containerStyle={[{flex: 1}, props.style]}
              style={[{justifyContent: "center", paddingHorizontal: 12, height: 44}]}
        />
    )
}

NavButton.defaultProps = {
    style: {}
}

export const NavTextButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[{flex: 1, padding: 8, paddingHorizontal: 12}, props.style]}>
                <Text style={[{textAlign:"center", fontSize: 18}, props.titleStyle]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

NavTextButton.defaultProps = {
    style: {},
    titleStyle: {},
    title: "Title",
    onPress:null,
}

