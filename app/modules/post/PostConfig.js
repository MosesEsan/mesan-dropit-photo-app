import {useNavigation} from "@react-navigation/native";


export function getNavButtons(navigation){
    // const navigation = useNavigation();

    let buttons = [
        {
            size: 22,
            onPress: () => navigation.navigate("Notifications"),
            name: "bell",
            color: '#fff',
            type: "feather"
        },
        {
            size: 22,
            onPress: () => navigation.navigate("Users"),
            color: "#fff",
            name: "users",
            type: "feather",
        },
        {
            name: "camerao",
            size: 22,
            onPress: () => navigation.navigate('Create', {screen: "AddNew"}),
            color: "#fff",
            type: "ant-design",
        }
    ]

    return buttons;
}
