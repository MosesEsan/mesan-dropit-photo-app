import React from 'react';
import {View, TouchableOpacity, StyleSheet, Platform, ActivityIndicator} from 'react-native';
import {Icon} from '@rneui/themed';

// import {useAuth} from "../providers/auth";

export default function Controls({navigation, onRefresh, style, isLoading}){
    //1 - DECLARE VARIABLES
    // const authProvObj = useAuth();
    // const {isLoggedIn} = authProvObj.state;
    const isLoggedIn = true

    const onCameraPress = () => {
        navigation.navigate('Drop')
    }

    return(
        <View style={[{flexDirection: "row"}, style]}>
            <TouchableOpacity onPress={onCameraPress} style={{marginHorizontal: 20, marginTop: 20}}>
                <View style={[styles.raised, {backgroundColor:"#000", borderRadius: 60/2, height: 60, width:60, justifyContent:"center"}, ]}>
                    <Icon name='' type='material' size={30} color='#fff'/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

Controls.defaultProps ={
    style:{},
    onRefresh: null, isLoading: null
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
    }))
});
