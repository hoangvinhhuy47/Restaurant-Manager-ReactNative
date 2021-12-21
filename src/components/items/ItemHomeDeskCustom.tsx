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
    TouchableOpacity,


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
import { Desk_Home } from '../../assets/index'
interface ItemHomeDeskCustom {
    isActive?: boolean,
    Type?: any,
    text?: string,
    onPressItem: any
    time: string
}
export const ItemHomeDeskCustom = (props: ItemHomeDeskCustom) => {
    const { isActive, time, text, onPressItem, Type } = props
    return (
        <TouchableOpacity onPress={() => { onPressItem() }}>
            <View style={[styles.container, Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid]}>
                <View style={Type == 2 ? [styles.container_dangoi, Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid] : Type == 1 ?
                    [styles.container_Trong, Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid] : Type == 3 ?
                        [styles.container_ThanhToan, Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid] :
                        Type == 4 ? [styles.container_BanHu, Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid] :
                            [styles.container_YCThanhToan, Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid]}></View>
                {time != null ? <Text style={{ fontSize: hp(1.8), fontFamily: Fonts.Roboto_Stab_Bold, color: 'black', textAlign: 'center' }}> {getDataByThing.getDayMonthYearHourStringDetail(time)}</Text> : <View style={{ height: hp(2) }}></View>}
                <Image source={Desk_Home} style={{ height: wp(15), width: wp(15), }}></Image>
                <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>{text}</Text>
            </View>
        </TouchableOpacity >

    )
}
const styles = StyleSheet.create({
    container: {
        margin: 5,
        height: wp(27),
        width: wp(27),
        backgroundColor: mainColors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 0,
        borderRadius: 2
    },

    container_dangoi: {
        position: 'absolute',
        zIndex: 1,
        height: wp(3.5),
        width: wp(3.5),
        backgroundColor: 'red',
        borderRadius: 100,
        bottom: wp(23),
        left: wp(23),

        borderColor: 'white',
        borderWidth: 1,

    },
    container_YCThanhToan: {
        position: 'absolute',
        zIndex: 1,
        height: wp(3.5),
        width: wp(3.5),
        backgroundColor: mainColors.yellow,
        borderRadius: 100,
        bottom: wp(23),
        left: wp(23),

        borderColor: 'white',
        borderWidth: 1,
    },
    container_Trong: {
        position: 'absolute',
        zIndex: 1,
        height: wp(3.5),
        width: wp(3.5),
        backgroundColor: mainColors.whiteColor,
        borderRadius: 100,
        bottom: wp(23),
        left: wp(23),

        borderColor: mainColors.smokecolor,
        borderWidth: 1,
    },
    container_ThanhToan: {
        position: 'absolute',
        zIndex: 1,
        height: wp(3.5),
        width: wp(3.5),
        backgroundColor: mainColors.blue,
        borderRadius: 100,
        bottom: wp(23),
        left: wp(23),

        borderColor: 'white',
        borderWidth: 1,
    },
    container_BanHu: {
        position: 'absolute',
        zIndex: 1,
        height: wp(3.5),
        width: wp(3.5),
        backgroundColor: mainColors.smokecolor,
        borderRadius: 100,
        bottom: wp(23),
        left: wp(23),

        borderColor: 'white',
        borderWidth: 1,
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