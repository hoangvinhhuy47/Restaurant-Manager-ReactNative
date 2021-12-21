import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Platform,

    KeyboardAvoidingView,
    FlatList,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';
import { TextInputCustom } from '../userComponents/TextInputCustom';
import { ChuyenMon, TurnDowwn } from '../../assets/index';
import getDataByThing from '../../utils/getDataByThing';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import { PaymentInfo } from '../object/Order'
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
interface DialogPaymentOrder {

    onPressClose: any;
    onPressOK: any;
    ToTalPrice: number;
    OrderNumner: number;
    DisCound: number;
    OrderID: string;
    TransacTionID: string


}
export const DialogPaymentOrder = (props: DialogPaymentOrder) => {
    const Tab = createMaterialTopTabNavigator();
    const { profileInfo } = useSelector((state: any) => ({
        profileInfo: state?.auth?.profileInfo,
    }));
    const { PaymentOrder_Logic } = DetailDesk_Logic(props)
    const { onPressClose, onPressOK, ToTalPrice, OrderNumner, DisCound, OrderID, TransacTionID } = props;
    const [ToTalPriceScreen, setToTalPriceScreen] = useState(ToTalPrice)
    const [TotalBalance, setTotalBalance] = useState(0)
    const [DataPayment, setDataPayment] = useState<PaymentInfo>({
        PaymentID: "00000000-0000-0000-0000-000000000000",
        OrderID: OrderID,
        PaymentMethodID: 1,
        PaymentBy: profileInfo.UserID,
        PaymentAmount: ToTalPrice.toString(),
        Notes: ''
    })

    // const [ValuePayment, setValuePayMent] = useState(1)
    const [Data, setData] = useState([{ key: 1, label: 'Tiền Mặt', isChosse: 1, isActive: true },
    { key: 2, label: 'Ngân Hàng', isChosse: 2, isActive: false },
    ])
    const ViewButton = () => {
        return (
            <View style={styles.viewBottomButton}>
                <TouchableOpacity
                    style={[styles.button, { borderColor: 'white' },
                    Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                    ]}
                    onPress={() => { PayMentByMoney() }}>
                    <Text style={styles.textButton}>Thanh Toán</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const onTextChange = (value) => {
        let newText = '';
        let numbers = '0123456789';
        if (!!value) {
            for (var i = 0; i < value.length; i++) {
                if (numbers.indexOf(value[i]) > -1) {
                    newText = newText + value[i];
                }
            }
            setToTalPriceScreen(Number.parseInt(newText))
            setTotalBalance(Number.parseInt(newText) - ToTalPrice)
            setDataPayment({ ...DataPayment, PaymentAmount: (Number.parseInt(newText) - ToTalPrice).toString() })
        }
        else {
            setToTalPriceScreen(value)
        }
    }
    useEffect(() => {
        ViewData()
    }, [ToTalPrice, TotalBalance])
    const onTextChangeNote = (value) => {
        setDataPayment({ ...DataPayment, Notes: value })
    }
    const PayMentByMoney = async () => {
        try {
            if (DataPayment != null) {
                if (await PaymentOrder_Logic(TransacTionID, OrderID, DataPayment)) {
                    onPressOK()
                }
            }
        } catch (error) {
        }


    }
    const onPressChangePayment = (index: number, isChosse: any) => {
        for (var i = 0; i < Data.length; i++) {
            if (i == index) {
                Data[i].isActive = true
                setDataPayment({ ...DataPayment, PaymentMethodID: isChosse })
                setData([...Data])
            }
            else {
                Data[i].isActive = false
                setData([...Data])
            }
        }
    }
    const ViewPayMent = (item, index) => {
        const color = item.isActive ? '#100BA4' : mainColors.smokecolor
        return (
            <TouchableOpacity onPress={() => { onPressChangePayment(index, item.isChosse) }} style={{ height: hp(8), width: wp(30), margin: 2, backgroundColor: 'white', elevation: 2, alignItems: 'center', justifyContent: 'center', borderRadius: 3, borderColor: color, borderWidth: item.isActive ? 1 : 0 }}>
                <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: color }}>{item.label}</Text>
            </TouchableOpacity>
        )
    }
    const onBlurTextPrice = () => {
        if (ToTalPriceScreen != 0 && ToTalPriceScreen < ToTalPrice) {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Số Tiền Phải Lớn Hơn Hoặc = Tiền Gốc',
            });

            setToTalPriceScreen(ToTalPrice)
            setTotalBalance(0)
            setDataPayment({ ...DataPayment, PaymentAmount: (0).toString() })
        }
    }
    const ViewData = () => {
        return (
            <View style={{ height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ width: '100%', backgroundColor: 'white', flexDirection: 'column', alignItems: 'center' }}>

                    <View style={{ height: hp(8), width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 5, elevation: 2, marginBottom: 5, marginTop: 5 }}>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular }}>Tổng Tiền:</Text>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'red', textDecorationLine: 'underline' }}>{getDataByThing.getcurrency(ToTalPrice)}đ</Text>
                    </View>
                    <View style={{ height: hp(16), width: '95%', flexDirection: 'column', backgroundColor: 'white', padding: 5, elevation: 2, marginBottom: 5, marginTop: 5 }}>
                        <Text style={{ fontSize: hp(1.8), fontFamily: Fonts.Roboto_Slab_Regular }}>Hình Thức Thanh Toán (*)</Text>
                        <FlatList
                            style={{ marginTop: hp(3) }}
                            data={Data}
                            horizontal
                            renderItem={({ item, index }) => ViewPayMent(item, index)
                            }
                        ></FlatList>
                    </View>
                    <View style={{ height: hp(7), width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 2, marginBottom: 10 }}>
                        <TextInput
                            onBlur={() => onBlurTextPrice()}
                            onFocus={() => { }}
                            editable={true}
                            mode={'outlined'}
                            keyboardType={'numeric'}
                            value={ToTalPriceScreen.toString()}
                            placeholder={'Số Tiền Nhận'}
                            onChangeText={onTextChange}
                            style={{ height: hp(7), width: '100%', backgroundColor: 'white', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, }}
                        />
                    </View>
                    <View style={{ height: hp(8), width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 5, elevation: 2, marginBottom: 5, marginTop: 5 }}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular }}>Số Tiền Còn</Text>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'red', textDecorationLine: 'underline' }}>{getDataByThing.getcurrency(TotalBalance)}đ</Text>
                    </View>
                    <View style={{ height: hp(10), width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 2, }}>
                        <TextInput
                            mode={'outlined'}
                            keyboardType={'default'}
                            value={DataPayment.Notes}
                            placeholder={'Ghi Chú'}
                            onChangeText={onTextChangeNote}
                            style={{ height: hp(10), width: '100%', backgroundColor: 'white', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, textAlign: 'left', justifyContent: 'flex-start' }}
                        />
                    </View>
                </View>
                {ViewButton()}
            </View>
        )
    }

    useEffect(() => {

        return () => { };
    }, []);
    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={{
                height: hp(100),
                width: wp(100),

            }}>
            <View style={styles.container}>

                <View style={styles.containerItem}>
                    <View style={[styles.headerView]}>
                        <Text style={styles.headerTitle}>Thanh Toán Hóa Đơn {OrderNumner.toString()}</Text>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onPressClose() }}>
                            <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: hp(70), width: '100%', backgroundColor: 'white', flexDirection: 'column' }}>
                        {ViewData()}
                    </View>
                </View>
                <Toast position='top' autoHide={true} topOffset={0} />
            </View >
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        position: 'relative',
        zIndex: 0,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    containerItem: {
        backgroundColor: '#FFF',
        borderRadius: 2,
        height: hp(75),
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    view_center: {
        height: hp(20),
        width: '100%',

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
        backgroundColor: mainColors.greenscolor,
        width: wp(85),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 5,
        elevation: 2
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
        fontSize: hp(2.2),
        fontFamily: Fonts.Roboto_Slab_Regular,
        color: mainColors.whiteColor,
    },
    viewBottomButton: {
        backgroundColor: mainColors.whiteColor,
        height: hp(10),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },

});