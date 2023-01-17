import React, {useState} from "react";
import {View} from "react-native";

import moment from "moment";
import FastImage from "react-native-fast-image";

import {Icon, Text} from "@rneui/themed";

import {myFromNow} from "../../helper";
import LikeButton, {CommentButton, DirectionButton, ReportButton} from "./ActionButtons";

export default function MetaData({item, comments, likes, isLiked, onLike, onComment, onReport, onDirection, preview}) {
    //1 - DECLARE VARIABLES
    let milliseconds = moment(parseInt(item.createdAt)).valueOf();
    const date = myFromNow(moment(milliseconds), moment());

    return (
        <View style={[preview ? { flexDirection:"row", } : {flex:1, justifyContent: "flex-end", alignItems:"flex-end"}]}>
            {
            preview &&
            <View style={{flex: 1}}>
                <View style={{
                    paddingVertical: 10,
                    flex: 1,
                    flexDirection: "row",
                    paddingHorizontal: 12,
                    alignItems: "center"
                }}>
                    <FastImage source={{uri: item.user.image}}
                               style={{height: 30, width: 30, borderRadius: 50, backgroundColor: "#eee"}}/>
                    <Text style={{marginLeft: 8, color: "#fff", fontWeight: "bold"}}>
                        {item.user.name}
                    </Text>
                    <Text style={{marginLeft: 8, color: "#ccc"}}>
                        {date}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingHorizontal: 12,
                        alignItems: "center",
                        marginVertical: 0
                    }}>
                    <Text style={{color: "#fff", fontWeight: "400"}}>
                        {item.caption}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingHorizontal: 12,
                        alignItems: "center",
                        marginVertical: 12
                    }}>
                    <View style={{
                        flex: 1,
                        flexDirection: "row", alignItems: "flex-end"
                    }}>
                        <Icon
                            size={20}
                            name={'heart'}
                            type={'material-community'}
                            color={'#fff'}
                            containerStyle={{
                                flex: null,
                                alignItems: "flex-start",
                                justifyContent: "center",
                                marginRight: 8
                            }}
                            iconStyle={{paddingHorizontal: 0}}/>
                        <Text style={{color: "#fff"}}>{likes.length} Likes</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: "row", paddingHorizontal: 12, alignItems: "center"
                    }}>
                        <Icon
                            size={20}
                            name={'comment-text'}
                            type={'material-community'}
                            color={'#fff'}
                            containerStyle={{
                                flex: null,
                                alignItems: "flex-start",
                                justifyContent: "center",
                                marginRight: 8
                            }}
                            iconStyle={{paddingHorizontal: 0}}/>
                        <Text style={{color: "#fff"}}>{comments} Comments</Text>
                    </View>
                </View>
            </View>
        }

            <View style={[{justifyContent: "flex-end", alignItems:"flex-end"}]}>
                {
                    preview && item['in_range'] !== false &&
                    <ReportButton onPress={onReport}
                                   iconStyle={{paddingTop: 15, paddingBottom: 15, paddingRight: 15}}
                                   containerStyle={{ height:70}}/>
                }
                {
                    preview && item['in_range'] !== false &&
                    <CommentButton onPress={onComment}
                                   iconStyle={{paddingTop: 15, paddingBottom: 15, paddingRight: 15}}
                                   containerStyle={{ height:70}}/>
                }
                {
                    onDirection && preview && item['in_range'] === false &&
                    <DirectionButton onPress={onDirection}
                                small={false}
                                iconStyle={{paddingTop: 15, paddingBottom: 15, paddingRight: 15}}
                                containerStyle={{ height:70}}/>
                }
                {
                    onLike && item['in_range'] !== false &&
                    <LikeButton isLiked={isLiked}
                                onLike={onLike}
                                small={true}
                                likes={item.likes}
                                iconStyle={{paddingTop: 15, paddingBottom: 15, paddingRight: 15}}
                                containerStyle={{ height:70}}/>
                }
            </View>
        </View>
    )
}

MetaData.defaultProps = {
    onLike: null
}


export const MetaDataMini = ({item, date, onPress, navigation, inProfile, containerStyle}) => {
    let onCityPress = () => navigation.navigate('Post', {screen: 'MapView', params: {item}})

    return(
        <View style={[{marginTop: 8}, containerStyle]}>
            <View>
                {
                    !inProfile ?
                        <Text  style={{color:"white"}}>
                            <Text style={{fontWeight:"500", color:"rgb(242,116,5)"}} onPress={onPress}>
                                {item.user.name}
                            </Text>
                            <Text style={{color:"white"}}>{` dropped`} {item.city ? ` in ` :  ``}</Text>
                            <Text style={{color:"white", fontWeight:"500", flex:1}} onPress={onCityPress}>
                                {item.city ? ` ${item.city} ` : ` `}
                            </Text>
                            <Text style={{color:"#ccc"}}>
                                {date}
                            </Text>
                        </Text>
                        :
                        <View style={{flexDirection:"row"}}>
                            <Icon
                                name='location-outline'
                                type='ionicon'
                                size={15}
                                color='#fff'
                                containerStyle={{
                                    height: 16, width:16,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            />
                            <Text style={{color:"white", fontWeight:"500", flex:1}} onPress={onCityPress}>
                                {item.city ? ` ${item.city} ` : ` `}
                            </Text>
                            <Text style={{color:"#ccc"}}>
                                {date}
                            </Text>
                        </View>
                }
            </View>
        </View>
    )
}

MetaData.defaultProps = {
    containerStyle: {}
}
