import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import UserStats from "./UserStats";
import {useTheme} from "@react-navigation/native";

export default function StatsContainer(props) {
    const {route} = props;
    const defaultIndex = route.params.index || 0;

    //0 - DECLARE PROVIDERS VARIABLES
    const layout = useWindowDimensions();
    const {colors} = useTheme()

    //==========================================================================================
    //1 - DECLARE VARIABLES
    const [index, setIndex] = useState(defaultIndex);

    const [routes] = useState([
        { key: 'followers', title: 'Followers' },
        { key: 'following', title: 'Following' },
    ]);

    //==================================================================================================
    //3 - UI HANDLERS
    const renderScene = ({ route }) => {
        return <UserStats {...props} type={route.key}/>;
    };

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.card }}
            style={{ backgroundColor: colors.background }}
            labelStyle={{textTransform: "none"}}
        />
    );

    //==========================================================================================
    // 5 - RENDER VIEW
    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}
