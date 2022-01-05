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
import { Canlendar, Customer, Phone, AVATAR, GRPeople } from '../../assets';
interface ItemSetBeforeCustom {
    onPressItem?: any,
    isActive?: boolean
    CustomerName: string,
    CustomerPhone: string,
    VisitedDate: string,
    Notes: string,
    Persons: number,
    index: number,
    Status: number
    onPressItemUpdate: any
    onPressItemCancel: any

}
export const ItemSetBeforeCustom = (props: ItemSetBeforeCustom) => {
    const { onPressItem, isActive, CustomerName, CustomerPhone, onPressItemCancel, VisitedDate, Notes, Persons, index, Status, onPressItemUpdate } = props
    const color = Status == 1 ? mainColors.blue : Status == 2 ? mainColors.whiteColor : mainColors.red
    return (
        <TouchableOpacity onPress={() => onPressItem(index)} style={{ height: 'auto', width: '100%', backgroundColor: 'white', marginTop: 3, borderRadius: 5, flexDirection: 'column', paddingLeft: 2, paddingRight: 2, elevation: 2, borderWidth: 1, borderColor: mainColors.smokecolor }}>
            <View style={{ width: '100%', height: hp(4), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ height: hp(4), flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: 15, width: 15, borderRadius: 100, backgroundColor: color, elevation: 5, borderColor: mainColors.smokecolor, borderWidth: 1 }}></View>
                    <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), color: 'black', }}> {(index + 1).toString() + '. '}{CustomerName}</Text>
                </View>
                <View style={{ height: hp(4), flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={GRPeople} style={{ height: hp(2), width: hp(2), resizeMode: 'contain' }}></Image>
                    <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), color: 'black', }}>{' ' + Persons + ' Người'}</Text>
                </View>
            </View>
            <View style={{ width: '100%', height: hp(4), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ height: hp(4), flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={Phone} style={{ height: hp(2), width: hp(2), resizeMode: 'contain' }}></Image>
                    <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), color: 'black', }}> {CustomerPhone}</Text>
                </View>
                <View style={{ height: hp(4), flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={Canlendar} style={{ height: hp(2), width: hp(2), resizeMode: 'contain' }}></Image>
                    <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), color: 'black', }}> {VisitedDate}</Text>
                </View>
            </View>
            <View style={{ width: '100%', height: 'auto', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), fontStyle: 'italic', color: mainColors.smokecolor, }}>{Notes}</Text>
            </View>
            {/*  */}
            {isActive ? <View style={{ height: 50, width: '100%', marginTop: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => { onPressItemCancel() }}
                    style={{ height: 40, width: '30%', backgroundColor: mainColors.whiteColor, alignItems: 'center', justifyContent: 'center', borderRadius: 5, elevation: 2 }}>
                    <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 13, color: mainColors.blackColor }}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { onPressItemUpdate() }}
                    style={{ height: 40, width: '30%', backgroundColor: mainColors.whiteColor, alignItems: 'center', justifyContent: 'center', elevation: 2, borderRadius: 5 }}>
                    <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 13, color: mainColors.blue }}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity

                    style={{ height: 40, width: '30%', backgroundColor: mainColors.whiteColor, alignItems: 'center', justifyContent: 'center', elevation: 2, borderRadius: 5 }}>
                    <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 13, color: mainColors.greenscolor }}>CheckIn</Text>
                </TouchableOpacity>
            </View> : <View></View>}

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
        borderBottomWidth: 3,
        borderColor: 'white',


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