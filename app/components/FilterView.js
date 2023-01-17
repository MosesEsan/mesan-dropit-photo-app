import React, {useImperativeHandle, forwardRef, useRef} from "react";
import {Text, TouchableHighlight, View} from "react-native";

import {Icon} from "@rneui/themed"

import RBSheet from "react-native-raw-bottom-sheet";

export const CloseButton = ({onPress}) => {
    return (
        <TouchableHighlight
            underlayColor="rgba(0, 0, 0, 0)"
            onPress={onPress}
            style={{height: 45, backgroundColor: "#ddd", borderRadius: 50, margin: 12}}>
            <View style={{
                flex: 1, flexDirection: "row", paddingHorizontal: 10, alignItems: "center",
                justifyContent: "center"
            }}>
                <Text style={{marginLeft: 12, fontWeight: "600", fontSize: 15, color: "#cc"}}>
                    Close
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export const PUBLIC = 0;
export const PRIVATE = 1;
export const ALL = -1;


function Sheet(props, parentRef) {
    const sheetRef = useRef();

    const open = () => {
        sheetRef.current.open();
    };

    const close = () => {
        sheetRef.current.close();
    };

    useImperativeHandle(parentRef, () => ({open, close}));

    return (
        <RBSheet
            ref={sheetRef}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={props.height || 245}
            customStyles={{
                wrapper: {backgroundColor: "transparent"},
                draggableIcon: {backgroundColor: "#000"},
                container: {paddingBottom: 20}
            }}>
            {props.children}
            {props.onClose && <CloseButton onPress={props.onClose}/>}
        </RBSheet>
    )
}

const DISheet = forwardRef(Sheet);
export {DISheet};


function FilterView({buttons, onClose}, parentRef) {
    return (
        <DISheet ref={parentRef} onClose={onClose}>
            <View style={{flex: 1}}>
                {
                    buttons.map((button, idx) => {
                        return (
                            <TouchableHighlight underlayColor="rgba(0, 0, 0, 0)" onPress={button.onPress}
                                                style={{height: 55}} key={`filter_items${idx}`}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    paddingHorizontal: 10,
                                    alignItems: "center"
                                }}>
                                    <Icon {...button.icon} containerStyle={{paddingHorizontal: 6}}/>
                                    <Text style={{marginLeft: 12, fontWeight: "600", fontSize: 15}}>
                                        {button.title}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        </DISheet>
    )
}

export default forwardRef(FilterView);
