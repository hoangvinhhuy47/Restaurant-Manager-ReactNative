import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,


} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';
import { TextInputCustom } from '../userComponents/TextInputCustom';
import { Clock, TurnDowwn } from '../../assets/index';
import { Button, Card, Searchbar, IconButton, TextInput, } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { IconDetailCustom } from '../iconsCustom/IconDetailCustom';
import getDataByThing from '../../utils/getDataByThing';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic';
import Toast from 'react-native-toast-message';

interface DialogAddOtherFood {

    onPressClose: any;
    onPressOK: any;
    OrderID: string
}

export const DialogAddOtherFood = (props: DialogAddOtherFood) => {
    const { onPressClose, onPressOK, OrderID } = props;
    const [Price, setPrice] = useState('0')
    const [Note, setNote] = useState('')
    const [Quantity, setQuantity] = useState(1)
    const { AddOtherFood_Logic } = DetailDesk_Logic(props)
    useEffect(() => {

        return () => { };
    }, []);
    const onAddOtherFood = async () => {
        if (await AddOtherFood_Logic(OrderID, Quantity.toString(), Price, Note)) {
            onPressOK()
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Không Thành Công'
            });
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Toast position='top' autoHide={true} topOffset={0} />
                <View style={styles.containerItem}>
                    <View style={[styles.headerView]}>
                        <Text style={styles.headerTitle}>Món Khác</Text>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onPressClose() }}>
                            <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: hp(35), alignItems: 'flex-start', padding: 2, flexDirection: 'column', backgroundColor: 'white', elevation: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Giá Tiền</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(7), width: '100%',   paddingVertical: 0,fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            keyboardType={'number-pad'}
                            onChangeText={(value) => {
                                let newText = '';
                                let numbers = '0123456789';
                                if (!!value) {
                                    for (var i = 0; i < value.length; i++) {
                                        if (numbers.indexOf(value[i]) > -1) {
                                            newText = newText + value[i];
                                        }
                                    }
                                    setPrice(newText)

                                }
                                else {
                                    setPrice('0')
                                }
                            }}
                            placeholder='Giá Tiền'
                            value={getDataByThing.getcurrency(Price)}
                        ></TextInput>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Số Lượng</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(7), width: '100%',  paddingVertical: 0, fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            onChangeText={(value) => {
                                let newText = '';
                                let numbers = '0123456789';
                                if (!!value) {
                                    for (var i = 0; i < value.length; i++) {
                                        if (numbers.indexOf(value[i]) > -1) {
                                            newText = newText + value[i];
                                        }
                                    }
                                    setQuantity(Number.parseInt(newText))
                                }
                                else {
                                    setQuantity(1)
                                }
                            }}
                            placeholder='Số Lượng'
                            value={Quantity.toString()}
                        ></TextInput>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Ghi Chú</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(7), width: '100%',  paddingVertical: 0, fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            onChangeText={(value) => {
                                setNote(Note)
                            }}
                            placeholder='Ghi Chú'
                            value={Note}
                        ></TextInput>
                    </View>
                    <View style={{ height: hp(8), width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            onPress={() => { onPressClose() }}
                            style={{ alignItems: 'center', marginRight: 5, justifyContent: 'center', height: hp(5), width: '35%', elevation: 2, backgroundColor: mainColors.smokecolor, borderRadius: 5 }}>
                            <Text style={{ fontSize: hp(1.8), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.blackColor }}>Đóng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { onAddOtherFood() }}
                            style={{ alignItems: 'center', marginRight: 5, justifyContent: 'center', height: hp(5), width: '35%', elevation: 2, backgroundColor: mainColors.greenscolor, borderRadius: 5 }}>
                            <Text style={{ fontSize: hp(1.8), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.whiteColor }}>Xác Nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </TouchableWithoutFeedback >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        position: 'relative',
        zIndex: 0,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    containerItem: {
        backgroundColor: '#FFF',
        borderRadius: 2,
        height: hp(50),
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    view_center: {
        height: hp(20),
        width: '100%',
        backgroundColor: '#FFFFFF',
        elevation: 2,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text_center: {
        fontFamily: Fonts.Roboto_Slab_Regular,
        fontSize: hp(2.2),
    },

    headerView: {
        height: hp(6),
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: mainColors.greenscolor,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2
    },
    headerTitle: {
        color: 'white',
        fontSize: 16,
        fontFamily: Fonts.Roboto_Slab_Regular
    },

    button: {
        backgroundColor: '#ffff',
        marginBottom: 3,
        width: wp(65),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
    },
    shadowAndroid: {
        elevation: 5,
    },
    shadowIos: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.21,
        shadowRadius: 4,
    },
    textButton: {
        fontSize: hp(2.5),
        fontFamily: Fonts.Roboto_Slab_Regular,
        color: mainColors.greenscolor,
    },
    viewBottomButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    },
    bodypu: {
        marginBottom: 5,
        width: '100%',
        height: hp(20),
        justifyContent: 'center',
        alignItems: 'center'
    }
});