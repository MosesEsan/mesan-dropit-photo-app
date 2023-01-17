import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

import UserStats from "./UserStats";
import {useTheme} from "../../../ThemeProvider";

export default function StatsContainer(props) {
    const {route} = props;

    const defaultIndex = route.params.index || 0;
    const [index, setIndex] = useState(defaultIndex);

    const [routes] = useState([
        { key: 'followers', title: 'Followers' },
        { key: 'following', title: 'Following' },
    ]);

    const layout = useWindowDimensions();
    const {backgroundColor, textColor} = useTheme()

    //==========================================================================================
    // 2 - MAIN CODE BEGINS HERE
    //==================================================================================================
    //4 - UI HANDLERS
    const renderScene = ({ route }) => {
        return <UserStats {...props} type={route.key}/>;
    };

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: textColor }}
            style={{ backgroundColor }}
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
