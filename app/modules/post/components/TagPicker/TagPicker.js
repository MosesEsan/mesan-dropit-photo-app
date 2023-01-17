import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";

import {Icon} from "@rneui/themed";

export default function TagPicker({users, onAdd}) {
    return (
        <View style={{padding: 14}}>
            <Text>Shared with:</Text>
            <View style={styles.wrapper}>
                <Icon
                    name='plus'
                    type='font-awesome-5'
                    size={23}
                    color='#fff'
                    containerStyle={styles.iconContainerStyle}
                    iconStyle={styles.iconStyle}
                    onPress={onAdd}
                    style={{}}
                />
                {
                    users.map((user, idx) => {
                        return(
                            <Image source={{uri: user.image}} style={styles.image}/>
                        )
                    })
                }
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    wrapper:{
        marginLeft: -5, flexDirection: "row", marginTop: 8
    },

    iconContainerStyle: {
        height: 44,
        width: 44,
        borderRadius:50,
        backgroundColor: "#eee",
        marginLeft: 10
    },

    iconStyle: {
        paddingHorizontal: 10, paddingVertical: 10
    },

    image: {
        height: 44,
        width: 44,
        borderRadius: 50,
        backgroundColor: "#eee",
        marginLeft: 10
    }
})
