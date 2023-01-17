import React, {useMemo, useState} from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    SectionList,
    StatusBar,
    Pressable,
    Alert,
    ActivityIndicator
} from 'react-native';

import {ListItem, Icon, Button} from "@rneui/themed";
import {useMutation} from "@apollo/client";

import {useTheme} from "../../../ThemeProvider";
import {useAuth} from "../../AuthProvider"

import {DELETE_ACCOUNT} from "../../AccountService";
import {SETTINGS_OPTIONS} from "../../AuthConfig";

export default function AccountSettings({navigation}) {
    //0 - DECLARE PROVIDERS VARIABLES
    const {secondaryColor} = useTheme()
    const {handleLogout} = useAuth();

    //1 - DECLARE VARIABLES
    const [isDeleting, setIsDeleting] = useState(false);

    //==================================================================================================
    //2 - MAIN CODE BEGINS HERE

    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    //0 - GRAPHQL HOOKS
    const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
        onCompleted,
        onError
    });

    async function onCompleted(data) {
        if (data.deleteAccount) {
            await handleLogout()
            Alert.alert(
                "Account Deleted?",
                "Sorry to see you go. Your account has been deleted successfully.",
                [
                    {text: "Ok"}
                ]
            );
        }
    }

    function onError() {
        Alert.alert(
            "Deleting Account",
            "Something went wrong. Sorry we were unable to delete your account. Please try again later.",
            [
                {text: "Ok"}
            ]
        );

        setIsDeleting(false)
    }

    //==================================================================================================
    //4 - ACTION HANDLERS
    const onDeleteAccount = () => {
        Alert.alert(
            "Delete account?",
            "Once you delete your account, your profile, drops, likes and comments are permanently removed from DropIt!.",
            [
                {
                    text: "Yes, Delete",
                    onPress: async () => {
                        setIsDeleting(true)
                        await deleteAccount()
                    },
                    style: "destructive"
                },
                {text: "Cancel", onPress: () => console.log("Cancel Pressed")}
            ]
        );
    }

    //==================================================================================================
    //- ACTION HANDLERS
    //4a - RENDER ITEM
    const renderItem = ({item, index}) => {
        return (
            <Pressable onPress={item.onPress || null}>
                <View style={{
                    borderBottomWidth: 1,
                    borderColor: "rgb(57, 64, 71)",
                    backgroundColor: secondaryColor,
                    flexDirection: "row",
                    flex: 1,
                    padding: 12,
                    paddingVertical: 16,
                    justifyContent: "center"
                }}>
                    <Icon name={item.icon}
                          size={21}
                          color={"#fff"}
                          type={item.type || "font-awesome-5"}
                          containerStyle={{width: 30}}/>
                    <View style={{marginLeft: 8, flex: 1, justifyContent: "center"}}>
                        <Text style={{color: "#fff", fontSize: 16}}>
                            {item.title}
                        </Text>
                    </View>

                    {
                        item.hasOwnProperty('loading') &&
                        <ActivityIndicator animating={item.loading}/>
                    }
                    {
                        item.chevron &&
                        <ListItem.Chevron/>
                    }
                </View>
            </Pressable>
        )
    };

    const renderSectionHeader = ({section: {title}}) => {
        return (
            <Text style={styles.header}>{title}</Text>
        )
    }

    // - RENDER FOOTER
    const renderFooter = () => {
        return (
            <Button title={"Logout"}
                    onPress={async () => await handleLogout()}
                    containerStyle={[{marginTop: 40, justifyContent: "center", alignItems: "center"}]}
                    buttonStyle={[styles.button]}
                    disabledStyle={[styles.button]}
                    titleStyle={styles.buttonText}/>
        )
    }


    //==========================================================================================
    const sections = useMemo(() => {
        let [...settingOptions] = SETTINGS_OPTIONS;

        settingOptions.map(({title, data}, idx) => {
            data.map((item, index) => {
                if (item.hasOwnProperty('key')){
                    if (item.key === "EDIT"){
                        item['onPress'] = () => navigation.navigate('Account', {screen: "EditProfile"})
                    }else if (item.key === "PASSWORD"){
                        item['onPress'] = () => navigation.navigate('Account', {screen: "ChangePassword"})
                    }else if (item.key === "DELETE"){
                        item['onPress'] = () => onDeleteAccount()
                    }else if (item.key === "BLOCKED"){
                        item['onPress'] = () => navigation.navigate('Account', {screen: "BlockedUser"})
                    }
                }
            })
        })

        return settingOptions;
    }, [])


    //==========================================================================================
    // 5 - RENDER VIEW
    return (
        <SafeAreaView style={[{flex: 1}]}>
            <SectionList
                sections={sections}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                ListFooterComponent={renderFooter}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        // marginVertical: 8
    },
    header: {
        fontSize: 16,
        padding: 12,
        color: "#fff",
    },
    title: {
        fontSize: 24,
        Color: "#fff",
    },

    button: {
        width: 170,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#C55110",
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 17,
        fontFamily: 'Helvetica Neue',
        textAlign: "center",
        color: "#fff",
    },
});
