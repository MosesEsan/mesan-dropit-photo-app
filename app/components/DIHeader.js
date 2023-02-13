import React from "react";
import {Pressable, View} from "react-native";

import  {Header, Icon} from "@rneui/themed"
import DIText from "./DIText";

export const PUBLIC = false;
export const PRIVATE = true;
export const ALL = -1;

export const LeftNavButton = ({onPressLeft, icon}) => {
    return (
        <Icon {...icon}
              onPress={onPressLeft}
              containerStyle={[{
                  paddingHorizontal: 12
              }]}
              style={{height: 44, flex: 1, justifyContent: 'center', width: 44}}/>
    )
}

LeftNavButton.defaultProps = {
    onPressLeft: null,
    icon: {
        type: "ionicon",
        name: "arrow-back",
        size: 28,
        color: "#000",
        containerStyle: {borderRadius: 50, backgroundColor: "#fff"}
    }
}

export const RightNavButton = ({buttons, containerStyle}) => {
    return (
        <View style={[{flexDirection: "row", flex: 1, borderWidth:2, borderColor:"green"}, containerStyle]}>
            {
                buttons.map((button, idx) => {
                    return (
                        <Icon key={`rnb${idx}`}
                              name={button.name}
                              size={button.size}
                              onPress={button.onPress}
                              color={button.color}
                              type={button.type}
                              // containerStyle={[{
                              //     paddingHorizontal: 12
                              // }, button.style]}
                              // style={{height: 44, flex: 1, justifyContent: 'center', width: 44}}
                              style={{
                                  flex: 1,
                                  justifyContent: 'center',
                              }}


                        />
                    )
                })
            }
        </View>
    )
}

RightNavButton.defaultProps = {
    buttons: [],
    containerStyle: {}
}

export default function DIHeader(props) {
    return (
        <Header
            backgroundColor={"transparent"}
            containerStyle={props.headerContainerStyle}
            leftComponent={props.onPressLeft ? <LeftNavButton {...props}/> : null}
            rightComponent={<RightNavButton {...props}/> }
            // centerComponent={<CenterNav {...props}/>}
        />
    );
}

DIHeader.defaultProps = {
    buttons: [],
    onPressLeft: null,
    headerContainerStyle: {
        borderBottomWidth: 0,
        position: "absolute",
        top: 0, left: 0, right: 0
    },
    containerStyle: {}
}



export function DINavButton({button}) {
    return (
        <Pressable onPress={button.onPress}>
                <Icon
                name={button.name}
                size={button.size}
                containerStyle={{
                    height: 44,
                    minWidth: 44,
                    justifyContent:"center",}}
                color={button.color}
                type={button.type}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                />
        </Pressable>
    );
}

export function DINavButtons({buttons}) {
    return (
        <View style={{flexDirection: "row"}}>
            {
                buttons.map((button, idx) => (
                    <DINavButton key={`dinav_${idx}_button`} button={button}/>
                ))
            }
        </View>
    );
}


export function DINavTitle({buttons}) {
    return (

        <DIText bold style={{padding: 10, fontSize: 21, lineHeight:25,  color: "#ffffff"}}>
            DropIt!
        </DIText>
    );
}
