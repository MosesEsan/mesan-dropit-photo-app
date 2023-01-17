import React, {} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";

import FastImage from 'react-native-fast-image'
import {SharedElement} from 'react-navigation-shared-element';
import {BlurView} from "@react-native-community/blur";

import {bigStyles, minStyles} from "./styles";

export default function Card(props) {
    if (props.onPress) {
        return (
            <SharedElement id={`item.${props.item.id}.image_url`} style={{flex: 1}}>
                <Pressable onPress={props.onPress} style={[styles.cardContainer, {flex: 1}]}>
                    <DropCard {...props}/>
                </Pressable>
            </SharedElement>
        )
    }

    return (
        <SharedElement id={`item.${props.item.id}.image_url`} style={{flex: 1}}>
            <DropCard {...props}/>
        </SharedElement>
    )
}

Card.defaultProps = {
    large: false,
    showMetaData: true,
    showSubtitle: true
}

export function DropCard({item, large, showMetaData, showSubtitle, preview, onPress}) {
    let styles = showMetaData ? bigStyles : minStyles
    let cardStyle = [styles.cardImage, !large && {borderRadius: 8}]

    return (
        <View style={cardStyle}>
            <FastImage
                source={{
                    uri: item.image,
                    cache: FastImage.cacheControl.immutable,
                    priority: FastImage.priority.normal
                }}
                style={cardStyle}
                loaderBGColor={"#ccc"}
                resizeMode={FastImage.resizeMode.cover}>
            </FastImage>
            {
                item['in_range'] === false &&
                <OutOfRangeView item={item} showSubtitle={showSubtitle} preview={preview}/>
            }
        </View>
    )
}

DropCard.defaultProps = {
    onPress: null
}

export function OutOfRangeView({item, showSubtitle, preview, tiny, showDescription}) {
    let fontSize = preview ? 32 : 21
    fontSize = tiny ? 11 : fontSize

    return (
        <View style={[styles.absolute, styles.container]}>
            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={20}
                reducedTransparencyFallbackColor="white"
            />
            {
                showDescription &&
                <View style={[{alignItems: 'center', justifyContent: 'center'}, !tiny && {marginTop: 10}]}>
                    <Text style={{
                        textAlign: "center",
                        fontWeight: preview ? "700" : "600",
                        fontSize,
                        color: "rgb(242,116,5)"
                    }}>
                        {!tiny ? item.distance_long : item.distance}
                    </Text>
                    {
                        !tiny &&
                        <Text style={{textAlign: "center", color: "#fff", fontWeight: "500", fontSize: preview ? 21 : 14}}>
                            from Drop Point.
                        </Text>
                    }
                    {
                        showSubtitle && !preview &&
                        <Text style={{
                            textAlign: "center",
                            color: "#fff",
                            fontWeight: "400",
                            fontSize: preview ? 16 : 12,
                            marginTop: 4
                        }}>
                            Tap to Navigate
                        </Text>

                    }
                </View>
            }
        </View>
    )
}

OutOfRangeView.defaultProps = {
    tiny: false,
    large: false,
    preview: false,
    showMetaData: true,
    showSubtitle: true,
    showDescription: true
}

const styles = StyleSheet.create({
    absolute: {
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },

    container: {
        paddingHorizontal: 8,
        borderRadius: 8,
    }
});
