import React, {useState} from "react";
import {View} from "react-native";

import {Button, Header, Icon} from "@rneui/themed"

export const PUBLIC = false;
export const PRIVATE = true;
export const ALL = -1;


export const CenterNav = ({onFilterType, color}) => {
    const [index, setIndex] = useState(0)

    const onPress = (selectedIndex) => {
        if (selectedIndex !== index) {
            setIndex(selectedIndex)
            onFilterType(selectedIndex === 0 ? PUBLIC : PRIVATE)
        }
    }
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 4
        }}>
            <Button title={"Public"}
                    loading={false}
                    containerStyle={{
                        borderRadius: 50,
                        // marginHorizontal: 4,
                    }}
                    buttonStyle={[{
                        backgroundColor: index === 0 ? "white" : color,
                        height: 34,
                        width: 85,
                        paddingHorizontal: 0, padding:0
                    }]}
                    onPress={() => onPress(0)}
                    titleStyle={{
                        color: index === 0 ? color : "white",
                        fontWeight: "500",
                        fontSize: 14
                    }}/>
            <Button title={"Private"}
                    loading={false}
                    containerStyle={{
                        borderRadius: 50,
                        // marginHorizontal: 4,
                    }}
                    buttonStyle={[{
                        backgroundColor: index === 1 ? "white" : color,
                        height: 34,
                        width: 85,
                        paddingHorizontal: 0, padding:0
                    }]}
                    onPress={() => onPress(1)}
                    titleStyle={{
                        color: index === 1 ? color : "white",
                        fontWeight: "500",
                        fontSize: 14
                    }}/>
        </View>
    )
}

export const LeftNavButton = ({onPressLeft, icon}) => {
    return(
        <Icon {...icon}
              onPress={onPressLeft}
              containerStyle={[{
                  paddingHorizontal: 12
              }]}
              style={{height: 44, flex:1, justifyContent: 'center', width: 44}}/>
    )
}

LeftNavButton.defaultProps = {
    onPressLeft: null,
    icon: {
        type:"ionicon",
        name:"arrow-back",
        size:28,
        color:"#000",
        containerStyle:{borderRadius:50, backgroundColor:"#fff"}
    }
}

export const RightNavButton = ({buttons, containerStyle}) => {
    return(
        <View style={[{flexDirection:"row", flex:1 }, containerStyle]}>
            {
                buttons.map((button, idx) => {
                    return(
                        <Icon key={`rnb${idx}`}
                            name={button.name}
                              size={button.size}
                              onPress={button.onPress}
                              color={button.color}
                              type={button.type}
                              containerStyle={[{
                                  paddingHorizontal: 12
                              }, button.style]}
                              style={{height: 44, flex:1, justifyContent: 'center', width: 44}}
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
    return(
        <Header
            backgroundColor={"transparent"}
            containerStyle={props.headerContainerStyle}
            leftComponent={props.onPressLeft ? <LeftNavButton {...props}/> : null}
            rightComponent={<RightNavButton {...props}/>}
            // centerComponent={<CenterNav {...props}/>}
        />
    );
}

DIHeader.defaultProps = {
    buttons: [],
    onPressLeft:null,
    headerContainerStyle: {
        borderBottomWidth: 0,
        position:"absolute",
        top: 0, left:0, right:0
    },
    containerStyle: {}
}

