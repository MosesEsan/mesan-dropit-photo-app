import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {Icon} from '@rneui/themed';
import DIText from "../../../components/DIText";



export default function PopOver({options, onSelect}) {
  const onPress = onPress => {
    if (onSelect) {
      onSelect();
    }
    if (onPress) {
      onPress();
    }
  };


  return (
    <View style={{borderRadius: 12, overflow:"hidden"}}>
      {options.map((option, idx) => {
        return (
          <Pressable
              key={`popover_${idx}`}
            onPress={() => {
              onPress(option?.onPress || null);
            }}>
            <View
              style={[{

                height: 44,
                justifyContent: 'center',
                width: 190,
                paddingHorizontal: 16,
                // borderWidth: 1,
                borderColor: 'rgba(245,245,245,0.5)',
                flexDirection: 'row',
                alignItems: 'center'
                , backgroundColor:"#1C1C1C"
              }, idx +1 !== options.length && {borderBottomWidth: StyleSheet.hairlineWidth,}]}>
              <DIText style={{flex: 1, color:option.color || "#FFF", fontSize: 16}}>{option.title}</DIText>
              <Icon
                size={18}
                name={option.icon}
                type={option.type || "material-community"}
                containerStyle={{justifyContent: 'center', marginLeft: 4}}
                color={option.color || "#fff"}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

PopOver.defaultProps = {
  options: [],
  onSelect: null,
};

const styles = StyleSheet.create({});
