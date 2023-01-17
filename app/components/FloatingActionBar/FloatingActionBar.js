import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';

import FloatingActionButton from './FloatingActionButton';
import {Icon} from "@rneui/themed";

const FloatingActionBar = ({distance, items, onPress, position, style, currentIndex, setCurrentIndex}) => {
    const size = getSize(position);
    let {width, height} = size;
    return (
        <View style={[styles.container, getPositions(position, distance)]}>
            <View style={[styles.content, style]}>
                <View style={[getDirection(position)]}>
                    {items.map((item, index) => (
                        // <TouchableOpacity
                        //     style={[styles.buttonContainer, style, {width, height}]}
                        //     key={`fab${index}`}
                        //     onPress={_ => {
                        //         if (index !== currentIndex) {
                        //             if (index !== 1) setCurrentIndex(index);
                        //             onPress(index);
                        //         }
                        //     }}>
                        //     <Icon name={item.icon} type={item.type} size={item.size}
                        //           color={index === currentIndex ? item.activeColor : item.color}/>
                        // </TouchableOpacity>

                        <FloatingActionButton
                            {...item}
                            {...size}
                            key={`fab${index}`}
                            onPress={_ => {
                                if (index !== currentIndex) {
                                    if (index !== 1) setCurrentIndex(index);
                                    onPress(index);
                                }
                            }}
                            active={index === currentIndex}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

const getPositions = (position, distance) => {
    switch (position) {
        case 'top':
            return {
                top: distance,
                left: 0,
                right: 0,
            };
        case 'bottom':
            return {
                bottom: distance,
                left: 0,
                right: 0,
            };
        case 'left':
            return {
                top: 0,
                bottom: 0,
                left: distance,
            };
        case 'right':
            return {
                top: 0,
                bottom: 0,
                right: distance,
            };
    }
};

const getSize = position => {
    switch (position) {
        case 'top':
        case 'bottom':
            return {
                width: 70,
                height: 44,
            };
        case 'left':
        case 'right':
            return {
                width: 44,
                height: 60,
            };
    }
};

const getDirection = position => {
    switch (position) {
        case 'top':
        case 'bottom':
            return {
                flexDirection: 'row',
            };

        case 'left':
        case 'right':
            return {
                flexDirection: 'column',
            };
    }
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        // alignItems: 'center',
        zIndex: 10,
    },
    content: {
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#FFFFFF',
        shadowRadius: 8,
        shadowOpacity: 0.3,
        elevation: 3,
        shadowOffset: {width: 0, height: 8},
    },

    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
    },
});

FloatingActionBar.propTypes = {
    distance: PropTypes.number,
    items: PropTypes.array,
    onPress: PropTypes.func,
    position: PropTypes.string,
    selectedIndex: PropTypes.number,
};

FloatingActionBar.defaultProps = {
    distance: 50,
    items: [],
    onPress: _ => null,
    setCurrentIndex: _ => null,
    position: 'bottom',
    selectedIndex: 0,
    currentIndex: 0,
};

export default FloatingActionBar;
