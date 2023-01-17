import {CenterNav, LeftNavButton} from "../../../components/DIHeader";
import React from "react";
import {useSetting} from "../../setting/SettingProvider";
import {useTheme} from "../../ThemeProvider";
import {usePost} from "../PostProvider";


export function PostNavConfig(navigation){
    const  {backgroundColor, textColor} = useTheme();
    const {setLoading} = usePost();
    const {state: {orderBy, filterType}, setFilterType} = useSetting();

    let onFilterType = (type) => {
        setLoading(true)
        setFilterType(type)
    };

    let headerTitle = () => {
        return(
            <CenterNav
                onFilterType={onFilterType}
                filterType={filterType} color={backgroundColor} textColor={textColor}/>
        )
    }

    let headerLeft = () => {
        return(
            <LeftNavButton
                onPressLeft={() => navigation.navigate("User", {screen: "Profile", params: {user: currentUser}})} user={currentUser}/>
        )
    }

    let headerRight = () => {
        return null;
        // return(
        //     <RightNavButton onPressRight={() => refRBSheetSort.current.open()}
        //                     onUserPress={() => navigation.navigate('User')}
        //                     onPress={() => navigation.navigate("User", {screen: "Profile", params: {user: currentUser}})}/>
        // )
    }

    return {
        headerTitle,
        headerRight,
        headerLeft
    }
}
