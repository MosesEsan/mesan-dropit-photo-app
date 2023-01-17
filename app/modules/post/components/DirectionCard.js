import React, {useRef} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useTheme} from "../../ThemeProvider";
import moment from "moment/moment";
import {Button} from "@rneui/themed";
import FastImage from "react-native-fast-image";

import {OutOfRangeView} from "./Card/Card";
import {myFromNow} from "../helper";

export default function DirectionCard({item, routes, routeSelected, setRouteSelected}) {
    let milliseconds = moment(parseInt(item.createdAt)).valueOf();
    const date = myFromNow(moment(milliseconds), moment())

    const {textColor, textColorLight} = useTheme()
    return (
        <View style={{flex: 1, flexDirection: "row", borderRadius: 12, overflow: "hidden", margin: 15}}>
            <View style={{borderTopLeftRadius: 12, borderBottomLeftRadius: 12, overflow: "hidden"}}>
                <FastImage
                    source={{
                        uri: item.image,
                        cache: FastImage.cacheControl.immutable,
                        priority: FastImage.priority.normal
                    }}
                    style={{height: 140, width: 120, borderTopLeftRadius: 12, borderBottomLeftRadius: 12,}}
                    loaderBGColor={"#ccc"}
                    resizeMode={FastImage.resizeMode.cover}>
                </FastImage>
                {
                    item['in_range'] === false &&
                    <OutOfRangeView item={item} showSubtitle={false} showDescription={false}/>
                }
            </View>

            <View style={{flex: 1, backgroundColor: "#fff", padding: 10}}>
                <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                    <FastImage source={{uri: item.user.image}}
                               style={{height: 30, width: 30, borderRadius: 50, backgroundColor: "#eee"}}/>
                    <View style={{marginLeft: 8}}>
                        <Text style={{ color: "#000", fontWeight: "bold"}}>
                            {item.user.name}
                        </Text>
                        <Text style={{color: "#ccc", fontSize:12}}>
                            {date}
                        </Text>
                    </View>

                </View>
                <Text style={{color: "#000", fontWeight: "400", marginTop: 8, flex:1}}>
                    {item.caption}
                </Text>
                <View style={{flexDirection: "row", marginTop: 12}}>
                    {
                        Object.keys(routes).map((key, idx) => {
                            const route = routes[key][0]
                            const formatted = formatDuration(route.duration.value)
                            return (
                                <Button title={formatted}
                                        onPress={() => setRouteSelected(route)}
                                        icon={{
                                            name: key,
                                            type: 'material-community',
                                            size: 17,
                                            color: routeSelected === route ? "#fff" : textColor
                                        }}
                                        containerStyle={[{
                                            flex: 1,
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderWidth: 1.5,
                                            borderColor: textColor,
                                            borderRadius: 50,
                                            height: 34,
                                            marginRight: 6
                                        },
                                            routeSelected === route && {backgroundColor: textColorLight}

                                        ]}
                                        buttonStyle={[{
                                            flex: 1,
                                            backgroundColor: routeSelected === route ? "transparent" : "#fff"
                                        }]}
                                        titleStyle={{color: routeSelected === route ? "#fff" : textColor, fontWeight: "600", fontSize: 14}}
                                />
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}


export function formatDuration(duration){
    const format = duration < (60 * 60) ? 'mm[m]' : 'H[h] mm[m]';
    return moment.utc(1000 * duration).format(format)
}
const styles = StyleSheet.create({});
