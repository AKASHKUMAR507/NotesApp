import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../assets/Themes'
import IconBtn from './buttons/IconBtn'

const SearchBar = (props) => {
    return (
        <View style={[styles.mainContainer, { ...props.container }]}>
            <TextInput
                value={props.value}
                onChangeText={props.onChangeText}
                style={[styles.searchBar, { ...props.style }]}
                placeholder='Search here...'
                placeholderTextColor={COLORS._gray}
            />
            {props.value ?(
                <IconBtn
                    name = {'close'}
                    size = {20}
                    color={COLORS._gray}
                    onPress = {props.onClear}
                    style = {styles.clearItem}
                />
            ) :null}
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent:'center',
    },
    searchBar: {
        color: COLORS._gray,
        backgroundColor: COLORS._while,
        borderWidth: 1,
        borderColor: COLORS._blue,
        borderRadius: SIZES._small,
        height: SIZES._large,
        paddingLeft: SIZES._small,
        paddingRight: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,

    },
    clearItem:{
        position:'absolute',
        right:35,
    },
})