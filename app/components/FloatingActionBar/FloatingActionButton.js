import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from "@rneui/themed"
import PropTypes from 'prop-types';

const FloatingActionButton = ({
  active,
  activeColor,
  height,
  type,
  icon,
  size,
  color,
  onPress,
  style,
  width,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, {width, height}]}
      onPress={onPress}>
      <Icon name={icon} type={type} size={size} color={active ? activeColor : color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
});

FloatingActionButton.propTypes = {
  activeColor: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  icon: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.number,
  width: PropTypes.number,
};

FloatingActionButton.defaultProps = {
  activeColor: 'rgb(3, 137, 253)',
  color: 'rgb(130, 130, 130)',
  height: 44,
  icon: 'rocket',
  type: 'font-awesome',
  onPress: _ => null,
  size: 24,
  width: 70,
};

export default FloatingActionButton;
