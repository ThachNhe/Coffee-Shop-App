import React from 'react';
import Icomoon from 'react-native-icomoon';
import iconSet from '../../selection.json';

const CustomIcon = ({ name, ...props }) => <Icomoon iconSet={iconSet} name={name} {...props} />;

export default CustomIcon;
