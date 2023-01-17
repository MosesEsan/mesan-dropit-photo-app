import React, {useState, useEffect, useMemo, useCallback} from "react";
import {
    View, Pressable, ActivityIndicator
} from "react-native";

import {useMutation} from "@apollo/client";
import moment from "moment";

import {LIKE_DROP} from "../../PostService";

import Card from "./Card";
import MetaData, {MetaDataMini} from "./MetaData";
import PictureOverlay from "./PictureOverlay";

import {myFromNow} from "../../helper";
import {bigStyles, minStyles} from "./styles";
import DIHeader from "../../../../components/DIHeader";

const CARD_HEIGHT = 280 + 50;

export default function CardContainer(props) {
    const {item, comments, index, navigation, showMetaData, user, inProfile, large, onLike, onComment, onReport} = props;

    //1 - DECLARE VARIABLES
    const [date, setDate] = useState(0);
    const [likes, setLikes] = useState(item.likes);

    const [likeDrop] = useMutation(LIKE_DROP, {fetchPolicy: 'network-only', onError});

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        let milliseconds = moment(parseInt(item.createdAt)).valueOf();
        setDate(myFromNow(moment(milliseconds), moment()))
    }, []);

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    function onError(error) {
        // undo the changes made to the likes array
        alert(error.message)
        setLike(!isLiked)
    }

    //==================================================================================================
    //4 - ACTION HANDLERS
    const onItemLike = async () => {
        setLike(!isLiked)
        setTimeout(async () => {
            await likeDrop({variables: {dropId: item.id, value: !isLiked}});
        }, 200)
    }

    const setLike = (val) => {
        let [...clone] = likes;
        if (val === true) clone.push({userId: user.id})
        else if (val === false) clone = clone.filter((obj) => obj.userId.toString() !== user.id.toString());

        setLikes(clone)
        if (onLike) onLike(item.id, clone)
    }

    const isLiked = useMemo(() => {
        return likes.some((like) => like.userId === user.id);
    }, [likes])

    // COMMENTS

    //==================================================================================================
    //5 - UI HANDLERS
    const renderHeader = () => {
        if (props.preview) {
            return (
                <DIHeader
                    headerContainerStyle={{}}
                    buttons={[
                        {
                            type:"ionicon",
                            name:"ios-close",
                            size:34,
                            color:"#FFF",
                            onPress:() => navigation.goBack(),
                            containerStyle:{}
                        }
                    ]}/>
            )
        }

        return null;
    }

    const renderFooter = useCallback(() => {
        let onDirection = () => navigation.navigate('Directions', {item})
        return <MetaData item={item}
                         preview={props.preview}
                         isLiked={isLiked}
                         likes={likes}
                         comments={comments}
                         onLike={onItemLike}
                         onComment={onComment}
                         onReport={onReport}
                         onDirection={onDirection}/>;
    }, [likes, comments]);

    //==================================================================================================
    //5 - RENDER VIEW
    const routeName = item.in_range === false ? 'Directions' : 'Detail'
    let onCardPress = () => navigation.navigate(routeName, {item, index, data:props.data})

    if (large) {
        return (
            <View style={{flex: 1, backgroundColor: "#eee"}}>
                <Card item={item} showMetaData={showMetaData} large={large}/>
            </View>
        )
    }

    let styles = showMetaData ? bigStyles : minStyles
    let cardStyles = !props.preview ? (index + 1 & 1) ? {paddingRight: 4} : {paddingLeft: 4} : {padding: 0}
    return (
        <Pressable onPress={onCardPress} style={[styles.card, cardStyles, {flex: 1}]} key={index}>
            <View style={[styles.imageContainer, {height: (index === 1) ? CARD_HEIGHT - 40 : CARD_HEIGHT}, !large && !props.preview && {borderRadius: 8}]}>


                <View style={[{flex: 1}, !large && {borderRadius: 8, overflow:"hidden"}]}>
                    <Card item={item} showMetaData={showMetaData} large={large} preview={props.preview}/>
                    {/*TODO : ONly show this if its in preview mode*/}
                    <PictureOverlay item={item}
                                    preview={props.preview}
                                    onPress={onCardPress}
                                    large={large}
                                    renderHeader={renderHeader}
                                    renderFooter={renderFooter}/>
                </View>

                {!props.preview &&
                    <MetaDataMini item={item} date={date}
                                  navigation={navigation}
                                  inProfile={inProfile}
                                  onPress={() => navigation.navigate("User", {screen:"Profile",params:{user: item.user}})}/>
                }
            </View>
        </Pressable>

    );
}

CardContainer.defaultProps = {
    showMetaData: true,
    cardStyle: {},
    onPress: null,
    onError: null,
    onLike: null,
    onComment: null,
    onReport: null,
    onOptions: null,
    inProfile: false,
    large: false,
    preview: false,
    data: [],
    comments: []
}


export function EmptyCard({cardStyle, width, height}) {
    return (
        <View style={[styles.card, cardStyle, {width: width / 2, height, justifyContent: "center"}]}>
            <ActivityIndicator/>
        </View>
    );
}


EmptyCard.defaultProps = {
    cardStyle: {},
}
