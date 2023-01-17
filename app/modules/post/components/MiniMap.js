import React from "react";
import MapView from "react-native-map-clustering";
import {Circle} from "react-native-maps";
import CustomMarker from "./CustomMarker";
import {Text, View} from "react-native";
import styles from "../scenes/styles";
import {Slider} from "@rneui/themed";

export default function MiniMap({item, radius}) {
    let region = {
        latitude: item.latitude,
        longitude: item.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return(
        <MapView style={{height: 200}} initialRegion={region} showsUserLocation={true} ac
                 loadingEnabled loadingBackgroundColor="white" rotateEnabled={false}>
            <Circle
                key={(item.longitude + item.latitude).toString()}
                center={{longitude:item.longitude, latitude:item.latitude} }
                radius={radius*1000}
                strokeWidth={1}
                strokeColor={ '#1a66ff' }
                fillColor={ 'rgba(230,238,255,0.5)' }/>

            {/*<CustomMarker item={item} navigation={navigation} key={`CM.${item.id}.item`}/>*/}
        </MapView>
    )
}

export function RadiusSelector({radius, onValueChange, containerStyle, style, trackStyle, thumbStyle}) {
    return(
        <View style={[containerStyle]}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={{marginRight: 4}}>
                    <Text>1km</Text>
                </View>
                <Slider maximumValue={5}
                        minimumValue={1}
                        step={1}
                        style={style}
                        trackStyle={trackStyle}
                        thumbStyle={thumbStyle}
                        value={radius}
                        onValueChange={onValueChange}/>
                <View style={{marginLeft: 4}}>
                    <Text>5km</Text>
                </View>
            </View>
            <Text style={[{fontSize: 15, lineHeight: 21, marginTop: 8}]}>
                Viewable within <Text style={{fontWeight: "700", fontSize: 16}}>{radius}km</Text> radius
                of drop point
            </Text>
        </View>
    )
}

export function MiniMapWithRadius(props) {
    let {item, navigation, radius} = props;
    return(
        <View style={{flex:1}}>
            <MiniMap item={item} navigation={navigation} radius={radius}/>
            <RadiusSelector {...props}/>
        </View>
    )
}
