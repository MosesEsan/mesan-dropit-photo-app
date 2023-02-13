import React, {useState} from "react";
import {Image} from "react-native";
import {CheckBox, Icon, ListItem} from "@rneui/themed";
import {useTheme} from "@react-navigation/native";

export default function TagUserItem({item, index, onSelectUser, checked}) {
    const [check, setCheck] = useState(false);

    const {textColor, secondaryColor, colors} = useTheme();

    const onPress = () => {
        onSelectUser(!check, item)
        setCheck(!check)
    }

    return (
        <ListItem key={`icon_user_${index}`}
                  containerStyle={{paddingRight: 0, marginHorizontal: 8, marginTop: 8, borderRadius: 12, backgroundColor:colors.secondary}}>
            <Image source={{uri: item.image}} style={{height: 40, width: 40, borderRadius: 50, backgroundColor: "#eee"}}/>
            <ListItem.Content>
                <ListItem.Title
                    style={{fontSize: 17, fontWeight:"bold", color: "#fff"}}>
                    {item.name}
                </ListItem.Title>
            </ListItem.Content>

            <CheckBox
                center
                uncheckedIcon="circle-o"
                checkedIcon={
                    <Icon
                        name="radio-button-checked"
                        type="material"
                        color={colors.card}
                        size={25}
                    />
                }
                checked={checked}
                containerStyle={{margin: 0, marginRight: 0, backgroundColor:secondaryColor}}
                onPress={onPress}
            />
        </ListItem>
    )
}
