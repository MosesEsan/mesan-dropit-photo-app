import {Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import React from 'react';

export default function NavHeader({onFilter, onProfile}){
    return(
        <ToolBarS style={styles.topContainer}>
            <View style={{flex:1}}>
                <TouchableOpacity onPress={onFilter} style={{marginHorizontal: 20}}>
                    <View style={[{backgroundColor:"#fff", borderRadius: 44/2, height: 44, width:44, justifyContent:"center"}, styles.raised]}>
                        <Icon name='settings' type='simple-line-icon' size={20} color='#000'/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flex:1, alignItems:"flex-end"}}>
                <ProfileImage onPress={onProfile}
                              style={{ paddingHorizontal: 20}}
                              imageStyle={{backgroundColor: "gray", height: 44, width: 44, borderRadius: 44/2}}
                />
            </View>
        </ToolBarS>
    )
}

NavHeader.defaultProps ={
    style:{},
    onProfile: null,
    onFilter: null,
}

const styles = StyleSheet.create({
    raised: Object.assign({ backgroundColor: '#fff', overflow: 'visible' }, Platform.select({
        android: {
            elevation: 4,
        },
        default: {
            shadowColor: 'rgba(0,0,0, .4)',
            shadowOffset: { height: 1, width: 1 },
            shadowOpacity: 1,
            shadowRadius: 1,
        },
    })),

    topContainer: {
        paddingTop:44,
        alignItems: "center",
        justifyContent: "center",
        // paddingRight:16
    },
    topWrapper: {
        // alignItems: "center",
        // justifyContent: "center",
        flexDirection: "row",
        // paddingRight:16
    },

    profileButton: {
        flex: 1,
        paddingHorizontal: 16
        // alignItems:"flex-start",
        // justifyContent:"center",
    },

    profileIcon: {
        height: 38, width: 100,
        backgroundColor: "#000", borderRadius: 20
    },

    buttonContainer: {
        alignItems: "flex-end",
        // justifyContent: "center",
        flex: 1,
        paddingHorizontal: 10, borderWidth:1
    },

});
