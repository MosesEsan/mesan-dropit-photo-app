import {Text} from "react-native";
import React from "react";/**/
// import {resolveSize} from "../modules/shared/components";




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

//
// export function Text(
//     props: React.ComponentProps<typeof RawText> & {
//         children: string;
//         small?: boolean;
//         large?: boolean;
//         xlarge?: boolean;
//         xxlarge?: boolean;
//         color?: string;
//         center?: boolean;
//         flex?: boolean;
//         uppercase?: boolean;
//         light?: boolean;
//     }
// ) {
//     const {
//         color,
//         children,
//         small,
//         large,
//         xlarge,
//         style,
//         center,
//         flex,
//         uppercase,
//         light,
//         ...otherProps
//     } = props;
//     const resolvedSize = resolveSize(props);
//     return (
//         <RawText
//             style={[
//                 styles[resolvedSize],
//                 color ? { color } : undefined,
//                 center ? styles.center : undefined,
//                 flex ? styles.flex : undefined,
//                 light ? styles.light : undefined,
//                 style,
//             ]}
//             {...otherProps}
//         >
//             {typeof children === "string" && uppercase
//                 ? children.toUpperCase()
//                 : children}
//         </RawText>
//     );
// }
