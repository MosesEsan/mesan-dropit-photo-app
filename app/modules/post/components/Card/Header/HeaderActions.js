import React, {useState} from "react";
import {ActionSheetIOS, Alert, View} from "react-native";

import {useMutation} from "@apollo/client";

import {Icon, Tooltip} from "@rneui/themed";
import {useNavigation} from "@react-navigation/native";

import {DELETE_DROP, REPORT_DROP} from "../../../PostService";
import {usePost} from "../../../PostProvider";

import {showToast} from "../../../../../AppUtil";
import PopOver from "../../PopOver";
import {DINavButton} from "../../../../../components/DIHeader";

export default function HeaderActions(props)  {
    const {item, user, showMoreButton, showCloseButton} =props;
    //0 - DECLARE PROVIDERS VARIABLES
    const navigation = useNavigation();
    const {deleteData} = usePost();

    //1 - DECLARE VARIABLES
    const [open, setOpen] = useState(false);
    const [inRange] = useState(item['in_range'])

    let moreIcon = {
        type: "material",
        name: "more-horiz",
        size: 34,
        color: "#FFF",
        containerStyle: {}
    }

    let closeIcon =
        {
            type: "ionicon",
            name: "ios-close",
            size: 34,
            color: "#FFF",
            onPress: () => navigation.goBack(),
            containerStyle: {}
        }
    ;

    let options;
    if (user?.id === item?.user?.id) {
        options = [
            {
                title: 'Edit',
                icon: 'edit',
                type: 'entypo',
                onPress: () => onEdit(),
            },
            {
                title: 'Delete',
                icon: 'delete',
                color: 'red',
                type: 'antdesign',
                onPress: () => onDelete(),
            },
        ];
    } else {
        options = [
            {
                title: 'Report',
                icon: 'nutrition',
                color: 'red',
                onPress: () => onReport()
            },
        ];
    }    //==================================================================================================
    //3 - GRAPHQL HANDLERS
    //==================================================================================================
    //DELETING
    const [deleteDrop] = useMutation(DELETE_DROP, {onCompleted: onDeleteCompleted, onError: onDeleteError});
    const onDelete = () => {
        Alert.alert(
            'Delete Item',
            "Are you sure you want to delete this item?",
            [
                {text: 'Delete', onPress: () => deleteDrop({variables: {id: item.id}})},
                {text: 'Cancel', style: 'cancel'}
            ],
            {cancelable: true},
        );
    };

    async function onDeleteCompleted(data) {
        if (data.deleteDrop) {
            deleteData(data.deleteDrop.id)
        }
    }

    function onDeleteError(error) {
        alert(error.message)
        showToast('error', 'Something went wrong.', error.message)
    }

    //==================================================================================================
    //REPORTING
    const [report] = useMutation(REPORT_DROP, {fetchPolicy: 'network-only', onCompleted, onError});
    const onReport = () => {
        setTimeout(() => {
            let reasons = ['Cancel', "Nudity", "Violence", "Harassment", "Spam", "Something else"];
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: reasons,
                    // destructiveButtonIndex: 2,
                    cancelButtonIndex: 0,
                    userInterfaceStyle: 'dark',
                },
                async buttonIndex => {
                    if (buttonIndex !== 0) {
                        await reportDrop(reasons[buttonIndex])
                    }
                },
            );
        }, 500)

    }

    const reportDrop = async (reason) => {
        await report({variables: {dropId: item.id, reason}});
    }

    async function onCompleted(data) {
        if (data.report) {
            deleteData(data.report.dropId)
            // onDeleteItem(data.report.dropId)
            Alert.alert(
                "Drop Reported",
                "Thank you for letting us know. Your feedback helps keep our platform safe. We will review and take the necessary action.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

        }
    }

    function onError(error) {
        alert(error.message)
    }

    //==================================================================================================
    //5 - ACTION HANDLERS
    const onEdit = () => {
        navigation.navigate('Create', {
            screen: 'AddCaptionPrivacy',
            params: {editMode: true, drop: item}
        })
    };

    let onCityPress = () => {
        navigation.navigate('Post', {
            screen: 'MapView',
            params: {item}
        })
    }


    //==================================================================================================

    return(
        <View style={{flexDirection: "row", justifyContent:"flex-end"}}>
            {
                inRange && showMoreButton &&
                <Tooltip
                    visible={open}
                    style={{borderColor: "purple", backgroundColor: "red"}}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    popover={<PopOver options={options} onSelect={() => setOpen(false)}/>}>
                    <Icon
                        {...moreIcon}
                        containerStyle={{
                            height: 44,
                            minWidth: 44,
                            justifyContent: "center",
                        }}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    />
                </Tooltip>
            }
            {
                showCloseButton && <DINavButton button={{...closeIcon}}/>
            }
        </View>
    )
}
HeaderActions.defaultProps = {
    item: null,
    containerStyle: {},
    showMoreButton: false,
    showCloseButton: false
}
