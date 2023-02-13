import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Header} from "../../comment/scenes/Comments";
import {Button, CheckBox, ListItem} from "@rneui/themed";

export default function ReportView({isReporting, reported, onReport, onClose}){
    const [reason, setReason] = useState(null)
    if (reported){
        return(
            <View style={{borderWidth: 1, borderColor: "red", justifyContent:"center"}}>
                <Text>Thank you for letting us know</Text>
                <Text>Your feedback helps keep our platform safe. We will review and take the necessary
                    action.</Text>
            </View>
        )
    }

    const onPress = async () => {
        await onReport(reason)
    }

    return(
        <View style={{flex: 1}}>
            <Header text={"Report Drop"} onClose={onClose}/>
            <View style={{padding: 12}}>
                <Text style={{fontSize: 23, fontWeight: "bold", marginBottom: 20}}>
                    Please select a
                    problem</Text>
                {
                    ["Nudity", "Violence", "Harassment", "Spam", "Something else"].map((item, index) => {
                        return (
                            <ListItem
                                bottomDivider
                                key={`report_drop_${index}`}
                                containerStyle={styles.containerStyle}>
                                <ListItem.Content>
                                    <ListItem.Title
                                        style={{fontSize: 17, color: "#000"}}>
                                        {item}
                                    </ListItem.Title>
                                </ListItem.Content>
                                <CheckBox
                                    center
                                    uncheckedIcon="circle-o"
                                    checkedIcon="dot-circle-o"
                                    checked={reason === item}
                                    containerStyle={{margin: 0, marginRight: 0}}
                                    onPress={() => setReason(item)}
                                />
                            </ListItem>
                        )
                    })
                }
            </View>
            <Button title={"Report"}
                    disabled={reason === null || isReporting}
                    onPress={onPress}
                    containerStyle={[{margin: 12}]}
                    loading={isReporting}
                    buttonStyle={[styles.button]}
                    disabledStyle={[styles.button]}
                    titleStyle={styles.buttonText}/>
        </View>
    )
}

const styles = StyleSheet.create({

    section: {marginTop: 12, marginHorizontal: 8, backgroundColor: "#fff", borderRadius: 12, overflow:"hidden"},
    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#C55110",
        marginTop: 10
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 17,
        fontFamily: 'Helvetica Neue',
        textAlign: "center",
        color: "#fff",
    },

    topContainer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: 12,
    },
    containerStyle: {
        padding: 0,
        paddingLeft: 0,
        paddingRight: 0,
    }
})

