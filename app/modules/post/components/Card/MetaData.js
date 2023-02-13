import React from "react";
import {View, StyleSheet} from "react-native";
import {Icon} from "@rneui/themed";

import {CommentButton, CommentView, LikeButton, TaggedUsersButton} from "./ActionButtons";
import DIText from "../../../../components/DIText";
import useDrop from "../../hook/useDrop";
import {useNavigation} from "@react-navigation/native";

const ScrollItem = ({icon, text, containerStyle}) => {
    return (
        <View style={[{
            flexDirection: "row",
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20, padding: 6, paddingHorizontal: 12,
            marginTop: 4,
        }, containerStyle]}>
            <Icon
                {...icon}
                containerStyle={{
                    flex: null,
                    alignItems: "flex-start",
                    justifyContent: "center",
                    marginRight: 8
                }}
                iconStyle={{paddingHorizontal: 0}}/>
            <DIText style={{color: "#fff", marginLeft: 4}}>
                {text}
            </DIText>
        </View>
    )
}

export default function MetaData(props) {
    const navigation = useNavigation();
    const {item, user, showCommentView} = props;
    //0 - DECLARE PROVIDERS VARIABLES
    const [likes, isLiked, onDropLike, comments, inRange, taggedUsers] = useDrop(item, user.id)

    let isCurrentUser = item?.user?.id === user.id;
    //==================================================================================================
    return (
        <View style={[styles.container]}>
            <View style={[{flex: 1}]}>
            <View style={[ {flexDirection: "row", flex: 1}]}>
                <View style={[{flex: 1, justifyContent: "flex-end"}]}>
                    <View>
                        {
                            inRange &&
                        <DIText
                            style={{color: "#fff", fontWeight: "400", lineHeight: 19, fontSize: 15, marginBottom: 8}}>
                            {item.caption}
                        </DIText>
                        }
                        <View style={{flex: 1, flexDirection: "row", alignItems: "flex-end", flexWrap: 'wrap'}}>
                            {/*{*/}
                            {/*    isCurrentUser &&*/}
                            {/*    <ScrollItem containerStyle={{marginRight: 8}} icon={{*/}
                            {/*        size: 20,*/}
                            {/*        color: '#FF2121',*/}
                            {/*        name: "heart",*/}
                            {/*        type: 'antdesign'*/}
                            {/*    }} text={likes.length}/>*/}
                            {/*}*/}
                            {/*{*/}
                            {/*    isCurrentUser &&*/}
                            {/*    <ScrollItem containerStyle={{marginRight: 8}} icon={{*/}
                            {/*        size: 20,*/}
                            {/*        color: '#ffffff',*/}
                            {/*        name: "comment-text",*/}
                            {/*        type: 'antdesign',*/}
                            {/*        type:'material-community'*/}
                            {/*    }} text={comments.length}/>*/}
                            {/*}*/}

                            <ScrollItem icon={{
                                size: 20,
                                color: '#fff',
                                name: "globe",
                                type: 'font-awesome'
                            }} text={`${item.city}, ${item.country}`}/>
                        </View>
                    </View>
                </View>
                <ActionsView {...props}/>
            </View>
                {/*{*/}
                {/*    showCommentView &&*/}
                {/*    <CommentView onPress={() => navigation.navigate("Comments", {item})}/>*/}
                {/*}*/}
            </View>

        </View>
    )
}


const ActionsView = (props) => {
    const navigation = useNavigation();
    const {item, user} = props;
    const [likes, isLiked, onDropLike, comments, inRange, taggedUsers] = useDrop(item, user.id)

    return (
        <View style={[{justifyContent: "flex-end", alignItems: "flex-end", width: 70}]}>
            {
                taggedUsers.length > 0 &&
                <TaggedUsersButton onPress={() => alert("Show Tagged Users")}
                                   taggedUsers={taggedUsers || []}/>
            }
            {
                inRange &&
                <CommentButton onPress={() => navigation.navigate("Comments", {item})}
                                  comments={comments}
                                  small={true}/>
            }
            {
                inRange &&
                <LikeButton isLiked={isLiked}
                            onLike={() => onDropLike(props.onUpdate)}
                            small={true}
                            likes={likes}/>
            }
        </View>
    )
}

MetaData.defaultProps = {
    containerStyle: {},
    taggedUsers: [],
    onUpdate: null,
    showCommentView: false
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingHorizontal: 16, paddingBottom: 25,
        // flexDirection: "row",
        flex: 1,
        // justifyContent: "flex-end",
        // alignItems: "flex-end"
    }
});
