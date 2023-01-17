import React from 'react';
import {StyleSheet} from "react-native";

import {Icon} from "@rneui/themed";

export default function LikeButton({isLiked, onLike, small, containerStyle, iconStyle}) {
    return (
        <Icon
            size={small ? 19 :28}
            name={ isLiked ? "heart" : 'hearto'}
            type={'antdesign'}
            color={ isLiked ? "red" : 'white'}
            onPress={onLike}
            containerStyle={[styles.containerStyle, containerStyle]}
            iconStyle={[styles.iconStyle, iconStyle]}/>
    );
}

export function DirectionButton({onPress, small, containerStyle, iconStyle}) {
    return (
        <Icon
            size={small ? 19 :28}
            name={'location-pin'}
            type={'entypo'}
            color={'white'}
            onPress={onPress}
            containerStyle={[styles.containerStyle, containerStyle]}
            iconStyle={[styles.iconStyle, iconStyle]}/>
    );
}


export function ReportButton({onPress, containerStyle, iconStyle}) {
    return (
        <Icon
            size={24}
            name={'report'}
            type={'material'}
            color={'#fff'}
            onPress={onPress}
            containerStyle={[styles.containerStyle, containerStyle]}
            iconStyle={[styles.iconStyle, iconStyle]}/>
    );
}

LikeButton.defaultProps ={
    containerStyle: {}
}

export function MoreButton({small, containerStyle, iconStyle, onPress}) {
    return (
        <Icon
            size={small ? 19 :28}
            name={ 'more-horizontal'}
            type={'feather'}
            color={ 'white'}
            onPress={onPress}
            containerStyle={[styles.containerStyle, containerStyle]}
            iconStyle={[styles.iconStyle, iconStyle]}/>
    );
}

MoreButton.defaultProps ={
    small:true,
    containerStyle: {},
    iconStyle: {}
}

export function CommentButton({onPress, containerStyle, iconStyle}) {
    return (
        <Icon
            size={24}
            name={'comment-text'}
            type={'material-community'}
            color={'#fff'}
            onPress={onPress}
            containerStyle={[styles.containerStyle, containerStyle]}
            iconStyle={[styles.iconStyle, iconStyle]}/>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: null,
        alignItems: "flex-start",
        justifyContent: "center",
        height: 44,
    },

    iconStyle: {
        paddingHorizontal: 12,
    },

    iconContainerStyle: {
        flex: null,
        alignItems: "flex-start",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        height: 44,
        marginHorizontal: 8
    },
});

