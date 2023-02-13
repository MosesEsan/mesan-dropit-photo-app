import React from "react";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {FadeLoading} from "react-native-fade-loading";
import {useTheme} from "@react-navigation/native";

export default function CardPlaceholder(props) {
    const {width} = useWindowDimensions()
    const {colors} = useTheme()

    return (
        // <View  style={[{paddingHorizontal: 0}, {flex: 1}]}>
        <FadeLoading style={[{height: width + (width * .5)}, styles.container, {backgroundColor: colors.text}]}
            // primaryColor="gray" secondaryColor="lightgray"
                     duration={5000}>
            <View style={[styles.floating, styles.top]}>
                <View style={{flexDirection: "row", alignItems: "center", margin: 16}}>
                    <FadeLoading
                        primaryColor={colors.primary}
                        secondaryColor={colors.secondary}
                        duration={5000}
                        style={[{height: 40, width: 40, borderRadius: 50}]}/>
                    <View style={{flex: 1, marginLeft: 12}}>
                        <FadeLoading
                            primaryColor={colors.primary}
                            secondaryColor={colors.secondary}
                            duration={5000} style={[{height: 14}]}/>
                        <FadeLoading
                            primaryColor={colors.primary}
                            secondaryColor={colors.secondary}
                            duration={5000}
                            style={[{height: 12, width: 65, marginTop: 2}]}/>
                    </View>
                </View>

            </View>
            <View style={[styles.floating, styles.bottom]}>
                <View style={{margin: 20}}>
                    <FadeLoading
                        primaryColor={colors.primary}
                        secondaryColor={colors.secondary}
                        duration={5000}
                        style={[{width: 250, height: 14}]}/>
                    <FadeLoading
                        primaryColor={colors.primary}
                        secondaryColor={colors.secondary}
                        duration={5000}
                        style={[{height: 36, width: 170, marginTop: 8, borderRadius: 20,}]}/>
                </View>
            </View>
        </FadeLoading>
        // </View>
    )
}



const styles = StyleSheet.create({

    container:{
        borderRadius: 8, padding: 0,  backgroundColor: "#eee",
        marginBottom: 12
    },

    floating: {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: "transparent"
    },

    top: {
        top: 0,
    },

    bottom: {
        bottom: 0,
    }
});
