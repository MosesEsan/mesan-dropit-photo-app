import React, {useEffect, useMemo, useState} from "react";
import {Pressable, StyleSheet, View} from "react-native";

import moment from "moment/moment";
import {useNavigation, useTheme} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";


import DIText from "../../../../../components/DIText";
import {convertDate} from "../../../../../AppUtil";

export default function SmallHeader({item}) {
    //0 - DECLARE PROVIDERS VARIABLES
    const {colors} = useTheme()
    const navigation = useNavigation();

    //1 - DECLARE VARIABLES
    const [date, setDate] = useState(0);

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        let milliseconds = moment(parseInt(item.createdAt)).valueOf();
        setDate(convertDate(item.createdAt))
    }, []);


    const source = useMemo(() => {
        if (item.user.image !== null) return {uri: `${item.user.image}`}
        else return require('../../../../../components/profile-placeholder.png');
    }, []);

    return(
    <View style={{flex: 1, flexDirection: "row", }}>
        <Pressable onPress={() => navigation.navigate("User", {screen: "Profile", params: {user: item.user}})}>
            <LinearGradient
                colors={[
                    '#00FFFF',
                    '#17C8FF',
                    '#329BFF',
                    '#4C64FF',
                    '#6536FF',
                    colors.card,
                ]}
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}
                style={styles.imageGradient}>
                <View style={styles.imageWrapper}>
                    <FastImage style={[styles.image]} source={source}/>
                </View>
            </LinearGradient>
        </Pressable>

        <View style={{flex: 1, marginLeft: 12}}>
            <DIText semibold style={{color: "#fff", fontSize: 14}}>
                {item.user.name}
            </DIText>
            <DIText style={{color: "#ccc", fontSize: 12}}>
                {date}
            </DIText>
        </View>
    </View>
)
}

SmallHeader.defaultProps = {
    item: null,
}

const styles = StyleSheet.create({
    container: {
         // alignItems: "center",
        margin: 16, marginRight:8
    },
    imageGradient:{
        width: 43,
        height: 43,
        borderRadius: 50,
        padding: 2,
        overflow: 'hidden',
    },

    imageWrapper:{
        flex: 1,
        borderRadius: 100,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image:{
        height: 40, width: 40, borderRadius: 50
    }
});
