import React  from 'react';
import {Text, SafeAreaView, View} from 'react-native';

import {Button} from "react-native-elements";

import {COLOURS} from "../../../constants";

import styles from "./styles";

import {boldFont, headingStyle, largeHeadingStyle} from "../../../theme";
import {scale} from "../../../utils";

export default function Welcome({navigation}) {
    return (
        <SafeAreaView style={[{backgroundColor: COLOURS.primary, flex:1}]}>

            <View style={{flex:1, justifyContent: "center"}}>
                <Text style={[largeHeadingStyle, {textAlign: "center", color: "#fff", fontSize: scale(31)}, ]}>
                    Mevia
                </Text>
            </View>
            <View style={{flex:1, justifyContent: "flex-end"}}>
                <View style={{ backgroundColor: "#FFF", margin : 20, paddingHorizontal: 20, paddingVertical: 25, borderRadius: 16}}>
                    <Text style={[headingStyle, {textAlign: "center", color: "rgb(1, 25, 50)", fontSize: scale(19), lineHeight: 34}]}>
                        Take part in weekly challenges to win prizes
                        {/*Play and Win points for rewards such as gift cards.*/}
                    </Text>
                    <Button title={"Sign Up"}
                            onPress={() => navigation.navigate("Register")}
                            containerStyle={[{marginTop: 25}]}
                            buttonStyle={[styles.button]}
                            disabledStyle={[styles.button]}
                            titleStyle={styles.buttonText}/>

                    <Text style={[styles.labelText, {textAlign: "center", fontWeight: "400", marginTop: 20}]}
                          onPress={() => navigation.navigate("Login")}>
                        Already have an account? <Text
                        style={{fontFamily:boldFont, color: COLOURS.primary}}>Login</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
