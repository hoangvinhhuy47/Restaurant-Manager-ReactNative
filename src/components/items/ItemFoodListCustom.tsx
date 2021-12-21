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
import { Minus, Plus } from '../../assets';
interface ItemFoodListCustom {

    text?: string,
    onPressItem?: any,
    index?: any;
    CategoryID?: string;
    FoodID?: string;
    Color?: string
    Price: string;


}
export const ItemFoodListCustom = (props: ItemFoodListCustom) => {
    const { text, onPressItem, index, CategoryID, FoodID, Color, Price, } = props
    const TypeColor = Color != null ? Color : '#FFFFFF'
    const [ChangeViewItem, setChangeViewItem] = useState(false)
    const [Quantity, setQuantity] = useState(1)
    // useEffect(() => {
    //     ViewBottom()
    // }, [Quantity])
    const ViewBottom = () => {
        return (
        <View style={{ height: 35, width: wp(32), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white' }}>
            <TouchableOpacity
                onPress={() => { Quantity > 1 ? setQuantity(Quantity - 1) : {} }}
                style={{ height: 25, width: wp(7), borderRadius: 5, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={Minus} style={{ height: '80%', width: '80%' }}></Image>
            </TouchableOpacity>
            <Text style={{ fontSize: 17, fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>
                {Quantity}
            </Text>
            <TouchableOpacity
                onPress={() => { setQuantity(Quantity + 1) }}
                style={{ height: 25, width: wp(7), borderRadius: 5, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={Plus} style={{ height: '80%', width: '80%' }}></Image>
            </TouchableOpacity>
        </View>);
    }
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', }}>
            <TouchableOpacity
                onPress={(value) => {
                    onPressItem(Quantity)
                    setQuantity(1)
                    setChangeViewItem(false)
                }}
                // onLongPress={() => {
                //     setChangeViewItem(!ChangeViewItem)
                //     setQuantity(1)
                // }}
                style={{
                    height: wp(35),
                    width: wp(32),
                    backgroundColor: 'white',
                    borderRadius: 8,
                    alignItems: 'center',
                    elevation: 2,
                    margin: wp(0.5),
                    flexDirection: 'column',
                }}>
                <View style={{ height: wp(28), width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: wp(3.5), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', textAlign: 'center' }}>{text}</Text>
                </View>
                <View style={{ height: wp(7), width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: Color, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, color: 'white', fontSize: wp(3.5) }}>{getDataByThing.getcurrency(Price.toString())}đ</Text>
                </View>
            </TouchableOpacity>
            {/* {
                ChangeViewItem ?
                    ViewBottom() : <View></View>
            } */}

        </View >

    )
}
