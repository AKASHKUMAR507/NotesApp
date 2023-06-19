import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../assets/Themes';

const width = Dimensions.get('window').width - 20

const Note = ({item, onPress}) => {
    const {title, desc} = item;
  return (
    <TouchableOpacity onPress={onPress} style ={styles.container}>
      <Text style = {[styles.content, styles.title]} numberOfLines={2} >{title}</Text>
      <View style ={{
        backgroundColor:COLORS._while,
        height:2,
      }}></View>
      <Text style = {[styles.content, styles.desc]} numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  )
}

export default Note

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS._gray,
        width: width / 2 - 15 ,
        padding:10,
        marginBottom:10,
        borderRadius:10,
    },
    content:{
        color:COLORS._while,
    },
    title:{
        fontSize:15,
        fontFamily:FONTS._poppins_bold,
        
    },
    desc:{
        // fontFamily:FONTS._poppins_regular,
    },
})