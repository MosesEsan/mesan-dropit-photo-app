import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ActivityIndicator, Button
} from 'react-native';

export default function CommentBox(props) {
    const {text, onChangeText, onPress, isSavingComment} = props;

    return (
        <View style={[styles.textInputWrapper]}>
            <TextInput
                style={styles.textInput}
                placeholder='Add a comment'
                placeholderTextColor={'#ccc'}
                onChangeText={onChangeText}
                value={text}/>

            <View style={styles.textInputIconContainer}>
                {
                    isSavingComment ?
                        <ActivityIndicator size="small" color="#ccc"/>
                        :
                        <Button title={"Post"} disabled={text.length === 0}
                                containerStyle={{borderWidth:1}}

                                onPress={onPress}/>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textInputWrapper:{
        width: '100%',
        paddingHorizontal:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: '#fff',
        borderColor: "#ccc",
        borderTopWidth:1,
        flexDirection:"row"
    },

    textInput:{
        fontSize:14,
        flex:1,
        marginRight: 8
    },

    textInputIconContainer: {
        height: 45,
        paddingHorizontal: 4,
        justifyContent: "center"
    },
});
