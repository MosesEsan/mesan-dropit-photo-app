import React from "react";
import {View} from "react-native";

import moment from "moment/moment";
import FastImage from "react-native-fast-image";

import styles from "./styles";
import DIText from "../../../components/DIText";

export default function CommentItem({item}) {
    let milliseconds = moment(parseInt(item.createdAt)).valueOf();
    const date = moment(moment(milliseconds)).fromNow()

    return (
        <View style={[styles.container, {flexDirection: "row"}]}>
            <FastImage source={{uri: item.user.image}}
                       style={styles.userImage}/>
            <View style={{flex: 1, marginLeft: 12}}>
                <View style={{flex: 1, flexDirection: "row"}}>
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
                    {item.text}
                </DIText>
            </View>
        </View>
    )
}
