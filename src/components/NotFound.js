import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, FONTS, SIZES } from '../assets/Themes';

const NotFound = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <AntDesign
                name={'frowno'}
                size={50}
                color={COLORS._gray}
                style={{
                    opacity: 0.6,
                }}
            />
            <Text style={{
                color: COLORS._black,
                fontSize: 15,
                fontFamily: FONTS._poppins_bold,
                opacity: 0.3,
            }}>Result Not Found</Text>
        </View>
    )
}

export default NotFound

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 15,
        zIndex: -1,
        borderWidth: 1,
    }
})