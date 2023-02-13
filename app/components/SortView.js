import {StyleSheet, Text, View} from "react-native";
import {Slider} from "@rneui/themed";
import {DISheet} from "./FilterView";
import React, {useState, forwardRef} from "react";

import {useSetting} from "../modules/setting/SettingProvider";
import {useTheme} from "../modules/ThemeProvider";

function SortView({height, onClose}, parentRef) {
    const {state: {radius: currentRadius, showAll:currentShowAll}, setRadius, setShowAll} = useSetting();
    const {textColor} = useTheme();

    const [radius, setSelectedRadius] = useState(currentRadius);

    const [showAll, setSelectedShowAll] = useState(false);

    const onPress = () => {
        if (showAll !== currentShowAll) setShowAll(showAll)
        if (radius !== currentRadius) setRadius(radius)
        onClose();
    }

    return (
        <DISheet ref={parentRef} onClose={onPress} height={height}>
            <View style={styles.radiusContainer}>
                    <Text style={styles.label}>{"Set Radius"}</Text>
                    <View style={styles.sliderContainer}>
                        <Slider maximumValue={20}
                                minimumValue={1}
                                step={1}
                                disabled={showAll}
                            // trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                                thumbStyle={{height: 20, width: 20, backgroundColor: '#000000'}}
                                value={radius}
                                onValueChange={(value) => setSelectedRadius(value)}/>
                        <Text style={[{marginBottom: 20, fontSize: 15, lineHeight: 21}]}>
                            Show all drops dropped within a <Text
                            style={{fontWeight: "700", fontSize: 16}}>{radius}km</Text> of your current location.
                        </Text>
                    </View>
            </View>
        </DISheet>
    )
}


export default forwardRef(SortView);


const styles = StyleSheet.create({
    radiusContainer: {
        flex: 1,
        paddingHorizontal: 20
    },

    radiusWrapper: {
        flex: 1, borderBottomWidth: 1, borderBottomColor: "#ccc"
    },

    sliderContainer: {
        flex: 1,
        // alignItems: 'stretch',
        justifyContent: 'center'
    },

    label: {
        fontWeight: "600", fontSize: 15
    }
});
