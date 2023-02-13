import React, {useCallback} from "react";
import {View, useWindowDimensions} from "react-native";
import {useNavigation} from "@react-navigation/native";

import Card from "./Card";
import MetaData from "./MetaData";
import Overlay from "./Overlay";

import styles from "./styles";
import CardHeader from "./Header/CardHeader";

import useDrop from "../../hook/useDrop";
import TouchableScale from "react-native-touchable-scale";

export default function CardContainer(props) {
    const {width} = useWindowDimensions()
    const navigation = useNavigation()
    const {
        item,
        large,
        preview,
        user,
        showMetaData,
        onUpdate
    } = props;
    const [likes, isLiked, onDropLike, comments, inRange, taggedUsers] = useDrop(item, user?.id)
    const metaProps = {item, user, likes, isLiked, onDropLike, comments, inRange, taggedUsers, onUpdate};

    //==================================================================================================
    // UI HANDLERS
    const renderHeader = () => {
        return <CardHeader item={item} user={user}
                           showCloseButton={preview} showMoreButton={preview}/>
    }

    const renderFooter = useCallback(() => {
        return <MetaData{...metaProps} showCommentView={preview}/>;
    }, [item]);

    //==================================================================================================
    //5 - RENDER VIEW
    if (large) {
        return (
            <View style={{flex: 1, backgroundColor: "#eee"}}>
                <Card item={item} showMetaData={showMetaData} large={large}/>
            </View>
        )
    }

    let onDirection = () => navigation.navigate('Directions', {item})
    const cardHeight = width + (width * .5);
    return (
        <TouchableScale style={{flex: 1}} onPress={item.in_range === false ? onDirection : props.onPress}
                activeScale={.95} tension={50} friction={7} useNativeDriver>
            <View style={[styles.imageContainer, {height: cardHeight}, large && {borderRadius: 0}, preview && {marginBottom: 0}]}>
                <Card item={item} large={large} preview={preview}/>
                <Overlay item={item}
                         large={large}
                         disableTap={!preview}
                         renderHeader={renderHeader}
                         renderFooter={renderFooter}/>
            </View>
        </TouchableScale>
    );
}

CardContainer.defaultProps = {
    showMetaData: true,
    cardStyle: {},
    onPress: null,
    onUpdate: null,
    onComment: null,
    onReport: null,
    large: false,
    preview: false,
    data: [],
    comments: []
}
