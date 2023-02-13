import React, {useEffect, useMemo, useState} from 'react';
import {
    Dimensions,
    SafeAreaView,
} from "react-native";

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';


import {useAuth} from "../../auth/AuthProvider";

import CardContainer from "../components/Card/CardContainer";

const {width, height} = Dimensions.get("window");

export default function Details({route}) {
    const {index, helper:{data=[], update=null} = {}} = route.params;

    //0 - DECLARE PROVIDERS VARIABLES
    const {state: {currentUser}} = useAuth();
    const insets = useSafeAreaInsets();

    //==================================================================================================
    //4 - ACTION HANDLERS
    const renderItem = ({item, index}) => {
        return (
            <CardContainer
                item={item}
                index={index}
                key={`PIDrop.${item.id}.drop`}
                user={currentUser}
                onUpdate={update || null}
                preview={true}/>
        )
    }

    //==================================================================================================
    //5 - RENDER VIEW
    const carouselData = useMemo(() => data, [data]);
    const PAGE_HEIGHT = height - insets.top - insets.bottom;
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#000000"}}>
            <Carousel
                style={{
                    width: width,
                    height: PAGE_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black',
                }}
                defaultIndex={index}
                vertical={true}
                width={width}
                height={PAGE_HEIGHT}
                data={carouselData}
                loop={false}
                scrollAnimationDuration={1000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={renderItem}/>
        </SafeAreaView>
    )
}



Details.sharedElements = route => {
    const {item} = route.params;
    return [
        {
            id: `item.${item.id}.image_url`,
            animation: 'fade-out', //move, fade, fade-in, and fade-out
            // resize: 'clip'
        }
    ];
};

