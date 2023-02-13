import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";

import {Icon} from "@rneui/themed";
import TouchableScale from "react-native-touchable-scale";
import DIText from "../../../../components/DIText";

export function LikeButton({isLiked, likes, onLike, small, containerStyle, iconStyle}) {
    return (

        <TouchableScale style={{flex: 1}} onPress={onLike}
                        activeScale={.90}
                        tension={50}
                        useNativeDriver>
            <View style={{
                alignItems:"center",
                justifyContent:"center",
                paddingTop:6,
                paddingBottom:12,
                paddingHorizontal:4,
                backgroundColor:isLiked ? "#FF4B4B" : "rgba(255,255,255,0.2)",
                borderRadius:50
            }}>
                <Icon
                    size={small ? 20 : 28}
                    name={ "heart"}
                    type={'antdesign'}
                    color={ 'white'}
                    containerStyle={[styles.containerStyle,
                        containerStyle,
                        {
                            height: 34,
                            justifyContent: "center",
                            alignItems: "center",
                        }]}
                    iconStyle={[styles.iconStyle, iconStyle, {}]}/>
                <Text style={{color:"#fff", marginTop: 4}}>{likes.length}</Text>
            </View>
        </TouchableScale>


    );
}

export function TaggedUsersButton({taggedUsers, onPress, small, containerStyle, iconStyle}) {
    return (
        <Pressable onPress={onPress} style={{marginBottom: 20}}>
            <View style={{
                alignItems:"center",
                justifyContent:"center",
                paddingTop:6,
                paddingBottom:6,
                paddingHorizontal:4,
                backgroundColor:"rgba(255,255,255,0.2)",
                borderRadius:23}}>
                <Icon
                    size={21}
                    name={'user-tag'}
                    type={'font-awesome-5'}
                    color={ 'white'}
                    containerStyle={[styles.containerStyle,
                        containerStyle,
                        {
                            height: 34,
                            justifyContent: "center",
                            alignItems: "center",
                        }]}
                    iconStyle={[styles.iconStyle, iconStyle, {}]}/>
                <Text style={{color:"#fff", marginTop: 4}}>{taggedUsers.length}</Text>
            </View>
        </Pressable>
    );
}

export function CommentButton({comments, onPress, small, containerStyle, iconStyle}) {
    return (
        <Pressable onPress={onPress} style={{marginBottom: 20}}>
            <View style={{
                alignItems:"center",
                justifyContent:"center",
                paddingTop:8,
                paddingBottom:8,
                paddingHorizontal:3,
                backgroundColor:"rgba(255,255,255,0.2)",
                borderRadius:23,



            }}>
                <Icon
                    size={small ? 20 : 28}
                    name={'comment-text'}
                    type={'material-community'}
                    color={ 'white'}
                    containerStyle={[styles.containerStyle,
                        containerStyle,
                        {
                            height: 34,
                            justifyContent: "center",
                            alignItems: "center",
                        }]}
                    iconStyle={[styles.iconStyle, iconStyle, {}]}/>
                {
                    comments.length > 0 && <Text style={{color:"#fff", marginTop: 4}}>{comments.length}</Text>
                }

            </View>
        </Pressable>
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


export function CommentView({onPress}) {
    return (
        <Pressable onPress={onPress}>
            <View style={{height: 50, borderRadius: 20, flex:1,
                backgroundColor:"rgba(0,0,0,.5)", marginTop: 20,
                alignItems:"center",
                justifyContent:"center",
                paddingHorizontal: 12,
                flexDirection:"row"}}>
                <DIText style={{color:"#ccc", flex:1}}>Add comment</DIText>
                <Icon name={"send"} color={"#fff"}/>
            </View>
        </Pressable>

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

