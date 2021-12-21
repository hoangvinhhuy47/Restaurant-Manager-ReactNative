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
interface ItemMenuListCustom {
    isActive?: boolean,
    text?: string,
    onPressItem?: any,
    index?: any;
    MenuID?: string;
}
export const ItemMenuListCustom = (props: ItemMenuListCustom) => {
    const { isActive, text, onPressItem, index, MenuID } = props
    return (
        <TouchableOpacity style={{ height: hp(6), alignItems: 'center', justifyContent: 'center' }} onPress={() => { onPressItem(index) }}>
            <View style={isActive == true ? styles.container : styles.container_inactive}>
                <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: isActive == true ? mainColors.whiteColor : mainColors.disableColor }}>{text}</Text>
            </View>

        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    container: {
        height: hp(5.5),
        width: wp(30),
        backgroundColor: 'transparent',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth:3,
        borderColor:'white'
 
    },
    container_inactive: {
        height: hp(5),
        width: wp(30),
        backgroundColor: 'transparent',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },

})