import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ActivityIndicator, Button
} from 'react-native';

export default function CommentInput(props) {
    const {text, onChangeText, onPress, isSavingComment, containerStyle, buttonStyle, placeholderTextColor} = props;

    return (
        <View style={[styles.textInputWrapper, containerStyle]}>
            <TextInput
                style={[styles.textInput, {color:"#fff"}]}
                placeholder='Add a comment'
                placeholderTextColor={placeholderTextColor}
                onChangeText={onChangeText}
                value={text}/>

            {
                text.length > 0 &&
                <View style={styles.textInputIconContainer}>
                    {
                        isSavingComment ?
                            <ActivityIndicator size="small" color="#ccc"/>
                            :
                            <Button title={"Post"} disabled={text.length === 0}
                                    containerStyle={{borderWidth:1, borderColor: "blue"}}
                                    style={[{borderWidth:1, borderColor: "blue"}, buttonStyle]}
                                    onPress={onPress}/>
                    }
                </View>
            }

        </View>
    );
};

CommentInput.defaultProps = {
    containerStyle: {},
    buttonStyle: {},
    placeholderTextColor:  '#ccc'
}

const styles = StyleSheet.create({
    textInputWrapper:{
        // width: '100%',
        flexDirection:"row",
        paddingHorizontal:20,
        paddingVertical:4,
        // paddingBottom:10,
        backgroundColor: '#fff',
        // borderColor: "#ccc",
        // borderTopWidth:1,
        // borderWidth:2,
        // borderColor:"blue",
        marginHorizontal:14,
        borderRadius: 50,
    },

    textInput:{
        fontSize:14,
        flex:1,
        marginVertical:14,
    },

    textInputIconContainer: {
        marginLeft: 8,
        height: 45,
        paddingHorizontal: 4,
        justifyContent: "center"
    },
});
