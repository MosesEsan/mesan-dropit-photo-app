import {Image, View} from "react-native";
import React, {useEffect, useState} from "react";

import moment from "moment/moment";

import styles from "./styles";
import {useTheme} from "@react-navigation/native";
import DIText from "../../../components/DIText";

export default function CommentHeader({item}) {
    const {colors} = useTheme();

    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);

    let milliseconds = moment(parseInt(item.createdAt)).valueOf();
    const date = moment(moment(milliseconds)).fromNow()

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        Image.getSize(item.image, (width, height) => {
            const ratio = 80 / width;
            setWidth(80)
            setHeight(height * ratio)
        });
    }, [item]);

    return (
        <View style={{
            borderColor: colors.secondary,
            borderBottomWidth: 1,
            paddingVertical: 12,
            flexDirection: "row",
            paddingHorizontal: 12,
        }}>
            <View style={{height, width:80, minHeight: 160, backgroundColor:colors.secondary}}>
                <Image source={{uri: item.image}} style={{width, height, backgroundColor:colors.secondary}}/>
            </View>
            <View style={[styles.container, {flexDirection: "row"}]}>
                <View style={{flex: 1, marginLeft: 8}}>
                    <View style={{flexDirection: "row"}}>
                        <DIText semibold
                                style={styles.username}>
                            {item.user.name}
                        </DIText>
                        <DIText style={styles.divider}>•</DIText>
                        <DIText style={styles.date}>
                            {date}
                        </DIText>
                    </View>
                    <DIText style={styles.text}>
                        {item.caption}
                    </DIText>
                </View>
            </View>
        </View>
    )
}
