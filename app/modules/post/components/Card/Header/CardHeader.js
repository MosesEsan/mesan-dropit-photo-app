import React from "react";
import {StyleSheet, View} from "react-native";
import {BigHeader, SmallHeader, HeaderActions} from "./";

export default function CardHeader(props) {
    const {item, user} = props;
    // let useBig = item?.user?.id === user.id;
    let useBig = false;

    return (
        <View style={[styles.container, !useBig && {flexDirection: "row"}]}>
            {
                useBig && <HeaderActions {...props}/>
            }
            {

                useBig ? <BigHeader item={props.item}/> : <SmallHeader item={props.item}/>
            }
            {

                !useBig && <HeaderActions {...props}/>
            }
        </View>
    )
}

CardHeader.defaultProps = {
    item: null,
    containerStyle: {},
    showMoreButton: false,
    showCloseButton: false
}

const styles = StyleSheet.create({
    container: {
        margin: 16, marginRight:8
    },
    imageGradient:{
        width: 43,
        height: 43,
        borderRadius: 50,
        padding: 2,
        overflow: 'hidden',
    },

    imageWrapper:{
        flex: 1,
        borderRadius: 100,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image:{
        height: 40, width: 40, borderRadius: 50
    }
});
