import { Dimensions, Image, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, FONTS, SIZES } from '../assets/Themes'
import ICONS from '../assets/Icons'
const { height, width } = Dimensions.get('screen');


const Welcome = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 2000);
    }, [])

    return (
        <>
            <StatusBar barStyle={'light-content'} backgroundColor={COLORS._blue} />
            <View style={
                {
                    flex: 1,
                    backgroundColor: COLORS._while,
                    justifyContent: 'center',
                    alignItems: 'center',

                }
            }>
                <View>
                    <Text style={styles.text}>Notes App</Text>
                </View>
                <View style={styles.container}>
                    <Image source={ICONS.app_icons} style={styles.icons} resizeMode='contain' />
                </View>

            </View>
        </>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        height: 160,
        width: 120,
    },
    icons: {
        height: '100%',
        width: '100%',
        backgroundColor: COLORS._while,
    },
    text: {
        color: COLORS._black,
        fontSize: SIZES._xxmedium,
        marginBottom: 10,
        fontFamily: FONTS._poppins_italic,
    }
})