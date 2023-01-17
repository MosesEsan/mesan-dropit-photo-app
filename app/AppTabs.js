import React from "react";
import {Icon} from "@rneui/themed";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {tabIcon as AccountTabIcon} from "./modules/auth/AuthRoute";
import PostStack, {tabIcon as PostTabIcon} from "./modules/post/PostRoute";
import UsersStack, {
    profileTabIcon as ProfileTabIcon,
    tabIcon as UserTabIcon,
    UserStack
} from "./modules/users/UserRoute";
import NotificationStack, {tabIcon as NotificationTabIcon} from "./modules/notification/NotificationRoute";
import {useTheme} from "./modules/ThemeProvider";


const Tab = createBottomTabNavigator();
export default function AppTabs() {
    const {textColor, backgroundColor} = useTheme()

    let addIcon = {
        name: 'ios-add-circle',
        size: 42,
        color: 'rgb(130, 130, 130)',
        activeColor: textColor,
        type: 'ionicon',
    };

    const CreateScreenComponent = () => {
        return null
    }

    return (
        <Tab.Navigator
            screenOptions={({route, navigation}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let icon;
                    color = focused ? textColor : color

                    if (route.name === 'Post') {
                        icon = PostTabIcon
                    } else if (route.name === 'Users') {
                        icon = UserTabIcon
                    } else if (route.name === 'Notifications') {
                        icon = NotificationTabIcon
                    } else if (route.name === 'MyProfile') {
                        icon = ProfileTabIcon
                    } else if (route.name === 'Account') {
                        icon = AccountTabIcon
                    }

                    // You can return any component that you like here!
                    return <Icon {...icon} color={color}/>;
                },
                tabBarActiveTintColor: textColor,
                tabBarInactiveTintColor: 'rgb(130, 130, 130)',
                tabBarStyle: {backgroundColor, borderTopWidth:0}
            })}
        >
            <Tab.Screen name="Post" component={PostStack} options={{headerShown: false, gestureEnabled: false}}/>
            <Tab.Screen name="Users" component={UsersStack} options={{headerShown: false, gestureEnabled: false}}/>

            <Tab.Screen name="CreateScreen" component={CreateScreenComponent}
                        options={({ navigation }) => ({
                            tabBarButton: (props) => (
                                <Icon {...addIcon}  onPress={() =>  navigation.navigate('Create', {screen:"AddNew"})}
                                      iconStyle={{flex:1,marginLeft: 3, marginTop: 3}}
                                      containerStyle={{justifyContent:"center", alignItems:"center", paddingHorizontal: 4}}/>
                            ),
                        })} />

            <Tab.Screen name="Notifications" component={NotificationStack} options={{headerShown: false, gestureEnabled: false}}/>
            <Tab.Screen name="MyProfile" component={UserStack} options={{headerShown: false, gestureEnabled: false}}/>
        </Tab.Navigator>
    );
}
