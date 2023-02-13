import React, {useMemo} from "react";
import {View} from "react-native";

import FastImage from "react-native-fast-image";
import DIText from "../../../../../components/DIText";

const getImageSource = (image = null) => {
    if (image !== null) return {uri: `${image}`}
    else return require('../../../../../components/profile-placeholder.png');
};

export default function BigHeader({item}) {
    const source = useMemo(() => {
        return getImageSource(item?.user?.image)
    }, []);

    return(
        <View style={{flexDirection:"row", flex:1, marginRight:30}}>
            <View style={{ height: 99, width: 99, borderRadius:12, borderColor:"#fff", borderWidth:2}}>
                <FastImage style={[{height: 95, width: 95, borderRadius:12, }]} source={source}/>
            </View>
            <View style={{marginLeft: 12, flex:1}}>
                <DIText medium style={{color: "#fff", fontSize: 16}}>
                    {item.user.name}
                </DIText>
                    <DIText  style={{color: "#fff", fontSize: 14, marginTop: 10, flex:1}}>
                        {item.caption}
                    </DIText>

            </View>
        </View>
    )
}

BigHeader.defaultProps = {
    item: null
}
