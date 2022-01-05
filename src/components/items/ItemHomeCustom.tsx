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
interface ItemHomeCustom {
    isActive?: boolean,
    text?: string,
    onPressItem: any,
    index: any;
    LayoutID: string;
}
export const ItemHomeCustom = (props: ItemHomeCustom) => {
    const { isActive, text, onPressItem, index, LayoutID } = props
    return (
        <TouchableOpacity style={{
            height: '100%', justifyContent: 'center',
            alignItems: 'center',

        }} onPress={() => { onPressItem(index, LayoutID) }}>
            <View style={isActive == true ? [styles.container, Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,] : [styles.container_inactive, Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,]}>
                <Text style={{ fontSize: hp(2.3), fontFamily: Fonts.Roboto_Slab_Regular, color: isActive == true ? mainColors.greenscolor : mainColors.whiteColor }}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        height: hp(4.5),
        minWidth: wp(30),
        backgroundColor: 'white',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        marginLeft: 5,
        marginRight: 5
    },
    container_inactive: {
        height: hp(4.5),
        minWidth: wp(30),
        backgroundColor: mainColors.greenscolor,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        marginLeft: 1,
        marginRight: 1
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