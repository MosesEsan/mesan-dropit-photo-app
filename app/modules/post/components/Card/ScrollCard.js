import React, {useEffect, useState} from "react";
import {
    Dimensions,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
    ActivityIndicator, Pressable
} from "react-native";

import {SharedElement} from "react-navigation-shared-element";
import FastImage from "react-native-fast-image";

import Card, {DropCard, OutOfRangeView} from "./Card";

const {width} = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.4;
import card_styles from "./styles"
import {Icon} from "@rneui/themed";
import {getGeoMeta, myFromNow} from "../../helper";
import moment from "moment";

const LocationIcon = ({onPress}) => (
    <TouchableOpacity onPress={onPress} style={{
        width: "100%", alignItems: "flex-end",
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        height: 40,
        justifyContent: "center"
    }}>
        <Icon
            name='location-pin'
            type='entypo'
            size={19}
            color='#fff'
            containerStyle={{
                width: 40, height: 40, justifyContent: "center", alignItems: "center",
                shadowOpacity: 1,
                shadowOffset: {
                    height: 1,
                    width: 0
                },
            }}
            style={{}}
            onPress={onPress}
        />
    </TouchableOpacity>
)


export default function ScrollCard(props) {
    const {item, index, navigation, onPress, cardStyle, width, height} = props;

    //1 - DECLARE VARIABLES
    const [date, setDate] = useState(0);
    const routeName = item.in_range === false ? 'Directions' : 'Detail'
    let onCardPress = () => navigation.navigate(routeName, {item, index, data: props.data})

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        let milliseconds = moment(parseInt(item.createdAt)).valueOf();
        setDate(myFromNow(moment(milliseconds), moment()))
    }, [item]);

    return (
        <View style={[styles.card, cardStyle, {width, height}]} key={index}>
            <Card item={item} onPress={onCardPress}/>
            {onPress && <LocationIcon onPress={onPress}/>}
            {item.in_range !== false &&
                <View style={{
                    position: "absolute", left: 0, bottom: 0, right: 0, padding: 8,
                    shadowColor: "#000000", backgroundColor: "transparent",
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    shadowOffset: {
                        height: 1,
                        width: 0
                    }
                }}>

                    <View style={{}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: "white", fontWeight: "500", flex: 1}}>
                                {item.city ? `${item.city} ` : ` `}
                            </Text>
                        </View>
                        <Text style={{color: "#ccc", marginTop: 2}}>
                            {date}
                        </Text>
                    </View>
                </View>
            }
        </View>
    );
}

export function EmptyCard({cardStyle, width, height}) {
    return (
        <View style={[styles.card, cardStyle, {width: width / 2, height, justifyContent: "center"}]}>
            <ActivityIndicator/>
        </View>
    );
}

ScrollCard.defaultProps = {
    cardStyle: {},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    onPress: null
}

EmptyCard.defaultProps = {
    cardStyle: {},
    height: CARD_HEIGHT,
    width: CARD_WIDTH
}

const styles = StyleSheet.create({
    ...card_styles,

    nonBlurredContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8
    },

    container: {
        backgroundColor: "#007bff",
        borderRadius: 5,
        elevation: 10,
        borderWidth: 2, borderColor: "white", overflow: "hidden"

    },
    marker: {
        width: 30,
        height: 30,
        backgroundColor: "grey"
    },

    tinyLogo: {
        width: 50,
        height: 50,
    },

    bigPhoto: {
        width: 100, height: 120
    }
});
