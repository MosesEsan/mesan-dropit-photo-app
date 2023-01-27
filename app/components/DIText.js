import {Text} from "react-native";
import React from "react";

export default function DIText(props){

    const getFontFamily = () => {
        let fontFamily = 'Poppins-Regular';

        if (props.bold) {
            fontFamily = 'Poppins-Bold';
        }else if (props.thin) {
            fontFamily = 'Poppins-Thin';
        }else if (props.light) {
            fontFamily = 'Poppins-Light';
        }else if (props.extralight) {
            fontFamily = 'Poppins-ExtraLight';
        }else if (props.medium) {
            fontFamily = 'Poppins-Medium';
        }else if (props.semibold) {
            fontFamily = 'Poppins-SemiBold';
        }else if (props.extrabold) {
            fontFamily = 'Poppins-ExtraBold';
        }else if (props.black) {
            fontFamily = 'Poppins-Black';
        }

        return {
            fontFamily,
        };
    };

    const {style, ...allProps} = props;
    return(
        <Text style={[
            // getFontSize(),
            getFontFamily(),
            props?.style]} {...allProps}>{props.children}</Text>
    )
}
