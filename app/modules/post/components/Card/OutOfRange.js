import React from "react";
import {Text, View} from "react-native";
import {BlurView} from "@react-native-community/blur";
import {Icon, Button} from "@rneui/themed";

import styles from "./styles";

export default function OutOfRange({item, showSubtitle, preview, tiny, showDescription}) {
    let fontSize = 32
    fontSize = tiny ? 11 : fontSize

    return (
        <View style={[styles.absolute, styles.container]}>
            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={20}
                reducedTransparencyFallbackColor="white"/>
            {
                showDescription &&
                <View style={[{alignItems: 'center', justifyContent: 'center'}, !tiny && {marginTop: 10}]}>
                    <Icon name="wrong-location" color="#fff" size={60} />
                    <View style={{
                        shadowColor: 'blue',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 6,}}>
                        <Text style={{
                            textAlign: "center",
                            fontWeight: preview ? "700" : "600",
                            fontSize,
                            color: "#5162FF",
                        }}>

                            {!tiny ? item.distance_long : item.distance}
                            {/*{item.distance}*/}
                        </Text>
                    </View>

                    {
                        !tiny &&
                        <Text style={{textAlign: "center", color: "#fff", fontWeight: "500", fontSize: preview ? 21 : 14}}>
                            Navigate to Drop point to view.
                        </Text>
                    }
                    {
                        showSubtitle && !preview &&
                        <Button title={'Take Me There'}
                                containerStyle={{marginTop: 20, borderRadius: 10, }}
                                buttonStyle={{backgroundColor:"#fff", paddingHorizontal:20, paddingVertical: 12}}
                                titleStyle={{color:"#000", fontSize: 12, fontWeight:"600"}}/>
                    }
                </View>
            }
        </View>
    )
}

OutOfRange.defaultProps = {
    tiny: false,
    large: false,
    preview: false,
    showMetaData: true,
    showSubtitle: true,
    showDescription: true
}
