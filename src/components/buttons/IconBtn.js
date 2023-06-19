import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { COLORS } from '../../assets/Themes';
import ICONS from '../../assets/Icons';

const IconBtn = (props) => {
    return (
        <Icon
            name={props.name}
            size={props.size || 30}
            color={props.color || 'black'}
            style={{ ...props.style }}
            onPress = {props.onPress}
        />

    )
}

export default IconBtn
const styles = StyleSheet.create({

})