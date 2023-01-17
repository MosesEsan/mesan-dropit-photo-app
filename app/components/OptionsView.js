import React, {useMemo} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";

import {Icon} from "@rneui/themed";

import {PUBLIC, PRIVATE, ALL} from "../scenes/Home";

export default function OptionsView({filterType, onFilterPress, onSortPress, onSettingsPress}) {
    const icon = useMemo(() => {
        if (filterType === PUBLIC) return "public"
        else if (filterType === PRIVATE) return "public-off"
        else return "ios-list-circle"
    }, [filterType]);

    const title = useMemo(() => {
        if (filterType === PUBLIC) return "Public"
        else if (filterType === PRIVATE) return "Private"
        else return "All Drops"
    }, [filterType]);

    const type = useMemo(() => {
        if (filterType !== ALL ) return 'material'
        else return "ionicon"
    }, [filterType]);


    return (
        <View style={{
            flexDirection: "row",
            height: 50,
            backgroundColor: "#fff",
            borderBottomWidth: StyleSheet.hairlineWidth
        }}>
            <TouchableHighlight
                underlayColor="rgba(0, 0, 0, 0)"
                onPress={onFilterPress}>
                <View style={{flex: 1, flexDirection: "row", paddingHorizontal: 10, alignItems: "center"}}>
                    <Icon name={icon} size={21} color="#bbb" type={type}/>
                    <Text style={{marginLeft: 6, fontWeight: "600", fontSize: 15}}>{title}</Text>
                    <Icon name={"chevron-small-down"} size={21} color="#bbb" type={'entypo'}/>
                </View>
            </TouchableHighlight>
            <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center", flexDirection: "row"}}>
                <Icon name={"ios-time-outline"} size={21} color="#bbb" type={'ionicon'}
                      onPress={onSortPress}
                      containerStyle={{
                          paddingVertical: 8,
                          paddingHorizontal: 10,
                          marginHorizontal: 5
                      }}/>
                <Icon name={"settings-outline"} size={21} color="#bbb" type={'ionicon'}
                      onPress={onSettingsPress}
                      containerStyle={{
                          paddingVertical: 8,
                          paddingHorizontal: 10,
                          marginHorizontal: 5
                      }}/>
            </View>
        </View>
    )
}
