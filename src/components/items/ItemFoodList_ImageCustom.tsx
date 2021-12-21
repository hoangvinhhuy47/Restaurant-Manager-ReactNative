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
import { Meat } from '../../assets/index'
import getDataByThing from '../../utils/getDataByThing';
interface ItemFoodList_ImageCustom {
    text?: string,
    onPressItem?: any,
    index?: any;
    CategoryID?: string;
    FoodID?: string;
    Color?: string
    Price: string;
}
export const ItemFoodList_ImageCustom = (props: ItemFoodList_ImageCustom) => {
    const { text, onPressItem, index, CategoryID, FoodID, Color, Price } = props
    const TypeColor = Color != null ? Color : '#FFFFFF'
    return (
        <TouchableOpacity onPress={() => { onPressItem(FoodID) }}>
            <View style={[styles.container, Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid]}>
                <View style={{ height: wp(30), width: wp(45), }}>
                    <Image source={Meat} style={{ height: wp(28), width: wp(45), resizeMode: 'cover', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}></Image>
                </View>
                <View style={{ height: wp(4), width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: wp(3), fontFamily: Fonts.Roboto_Slab_Regular, color: '#070707', textAlign: 'center' }}>{text}</Text>
                </View>
                <View style={{ height: wp(6), width: '100%', backgroundColor: TypeColor, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: wp(3.5), fontFamily: Fonts.Roboto_Stab_Bold, color: 'white' }}> {getDataByThing.getcurrency(Price)}đ</Text>
                </View>
            </View>

        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    container: {
        height: wp(40),
        width: wp(45),
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'flex-start',
        margin: 5,
        justifyContent: 'flex-end',
        flexDirection: 'column'
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