import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ViewStyle,
    TextStyle,
    ImageSourcePropType,
    ToastAndroid,
    TouchableOpacity

} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Card } from 'react-native-paper'
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';
import { Linking, Alert, Platform } from 'react-native';
import getDataByThing from '../../utils/getDataByThing';
interface ItemMenuItemCustom {
    isActive?: boolean,
    text?: string,
    onPressItem?: any,
    index?: any;
    CategoryID?: string;
}
export const ItemMenuItemCustom = (props: ItemMenuItemCustom) => {
    const { isActive, text, onPressItem, index, CategoryID } = props
    return (
        <TouchableOpacity onPress={() => { onPressItem(index, CategoryID) }}>
            <View style={isActive == true ? [styles.container, Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid] : styles.container_inactive}>
                <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Stab_Bold, color: isActive == true ? mainColors.red : mainColors.blackColor }}>{text}</Text>
            </View>

        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    container: {

        height: hp(5),
        width: wp(30),
        backgroundColor: 'white',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: mainColors.red,
        borderBottomWidth: 2,
    },
    container_inactive: {

        height: hp(4.5),
        width: wp(30),
        backgroundColor: 'white',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    shadowAndroid: {
        elevation: 5,
    },
    shadowIos: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.21,
        shadowRadius: 4,
    },

})