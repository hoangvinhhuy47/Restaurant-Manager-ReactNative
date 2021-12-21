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
import { Card, TextInput } from 'react-native-paper'
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';
import { Linking, Alert, Platform } from 'react-native';
import getDataByThing from '../../utils/getDataByThing';
import { Left, SearchWhite, Plus, Minus, TakeAwayDetail, ICTakeAway } from '../../assets';
interface ItemDetailDeskCustom {
    styleitem?: ViewStyle
    NameFood?: string;
    index?: number;
    DiscountPrice?: number;
    Quanliti?: number;
    Price?: number;
    ToTalAmount?: number
    onPressPlus?: any
    onPressMinus?: any
    TypeItem?: any
    onChangeText: any
    onBlur?: any
    Note: string
    isTakeAway: boolean;
    Enable: boolean


}

export const ItemDetailDeskCustom = (props: ItemDetailDeskCustom) => {
    const { styleitem, TypeItem, isTakeAway, Enable, onChangeText, onBlur, NameFood, index, DiscountPrice, Note, Quanliti, ToTalAmount, Price, onPressMinus, onPressPlus } = props
    const color = TypeItem == 1 ? 'white' : TypeItem == 2 ? '#FDED0A' : TypeItem == 3 ? '#BB037E' : TypeItem == 4 ? '#40739e' : '#c23616';
    return (
        <View>
            <View
                style={{
                    marginLeft: wp(1),
                    marginRight: wp(1),
                    height: 'auto',
                    width: '98%',
                    borderRadius: 3,
                    marginTop: 1,
                    elevation: 2,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    position: 'relative',
                    zIndex: 0,
                }}>
                {isTakeAway ? <Image source={TakeAwayDetail} style={{ height: 30, width: 30, position: 'absolute', zIndex: 1, left: wp(90), alignItems: 'center', justifyContent: 'center', resizeMode: 'contain' }}>
                </Image> : <View style={{ position: 'absolute', zIndex: 1, left: wp(90), }}></View>}
                <View style={styles.container_child}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginLeft: 10, marginRight: 5, width: 12, height: 12, borderRadius: 100, elevation: 5, backgroundColor: color }}></View>
                        <Text style={{ fontSize: 13, fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', maxWidth: wp(90) }}>
                            {index + 1}. {NameFood}({getDataByThing.getcurrency(Price)}đ)
                        </Text>
                    </View>
                    {Note != null ? <View style={styles.container_child1}>
                        <Text style={{ fontSize: 15, fontFamily: Fonts.Roboto_Slab_Thin, color: mainColors.smokecolor, fontStyle: 'italic', textAlign: 'left' }}>{Note}</Text>
                    </View> : <View style={{ height: 35, }}></View>}
                    <View style={styles.container_child_3}>
                        <View style={styles.container_child_2}>
                            <View style={{ height: 35, width: '100%', backgroundColor: 'white', borderRadius: 2, elevation: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity style={{ height: 30, width: hp(4), alignItems: 'center', justifyContent: 'center' }} onPress={() => { onPressMinus() }}>
                                    <Image source={Minus} style={{ height: 15, width: 15 }}></Image>
                                </TouchableOpacity>
                                <TextInput
                                    keyboardType={'numeric'}
                                    onFocus={() => { console.log(1) }}
                                    onBlur={() => onBlur()}
                                    disabled={Enable}
                                    placeholder={Quanliti.toString()} onChangeText={(value) => onChangeText(value)}
                                    style={{ fontFamily: Fonts.Roboto_Stab_Bold, fontSize: 17, color: 'black', backgroundColor: 'white', height: 20 }}>
                                </TextInput>
                                <TouchableOpacity style={{ height: 30, width: hp(4), alignItems: 'center', justifyContent: 'center' }} onPress={() => { onPressPlus() }}>
                                    <Image source={Plus} style={{ height: 15, width: 15 }}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: '100%', flexDirection: 'column', maxWidth: wp(60) }}>
                            {DiscountPrice != 0 ? <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingRight: wp(5) }} >
                                <Text style={{ color: 'black', fontFamily: Fonts.Roboto_Slab_Thin, fontSize: 15, fontStyle: 'italic' }}>Giảm: </Text>
                                <Text style={{ color: 'red', fontFamily: Fonts.Roboto_Slab_Thin, fontSize: 15, fontStyle: 'italic' }}>{getDataByThing.getcurrency(DiscountPrice)}</Text>
                            </View> : <View style={{ height: '40%' }}></View>}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: wp(5) }} >
                                <Text style={{ color: 'black', fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 15 }}>Thành Tiền:</Text>
                                <Text style={{ color: 'red', fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 15 }}>{getDataByThing.getcurrency(ToTalAmount)}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        minHeight: hp(15),
        width: '100%',
        borderRadius: 6,
        marginTop: 5,
        elevation: 10,
        flexDirection: 'column',

    },
    container_child: {
        height: 'auto',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    container_child1: {
        // minHeight: 30,
        width: '100%',
    },
    container_child_2: {
        height: '100%',
        width: wp(30),
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'

    },
    container_child_3: {
        height: 40,
        width: '100%',
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },


})