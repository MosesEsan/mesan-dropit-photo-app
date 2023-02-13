import React, {} from "react";
import {View} from "react-native";
import FastImage from 'react-native-fast-image'

import styles from "./styles";
import OutOfRange from "./OutOfRange";

export default function Card({item, large, showSubtitle, preview}) {
    let cardStyle = [styles.cardImage, !large && {borderRadius: 8}]
    let source = {
        uri: item.image,
        cache: FastImage.cacheControl.immutable,
        priority: FastImage.priority.normal
    }

    return (
        <View style={cardStyle}>
            <FastImage
                source={source}
                style={cardStyle}
                loaderBGColor={"#ccc"}
                resizeMode={FastImage.resizeMode.cover}>
            </FastImage>
            {
                item['in_range'] === false &&
                <OutOfRange item={item} showSubtitle={showSubtitle} preview={preview}/>
            }
        </View>
    )
}

Card.defaultProps = {
    large: false,
    showMetaData: true,
    showSubtitle: true,
}

