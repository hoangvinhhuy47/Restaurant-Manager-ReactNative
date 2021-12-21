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

    Modal,

} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';
import { Clock, TurnDowwn } from '../../assets/index';
import { Button, Card, Searchbar, IconButton, TextInput, } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { IconDetailCustom } from '../iconsCustom/IconDetailCustom';
import getDataByThing from '../../utils/getDataByThing';
import DatePicker from 'react-native-date-picker'
import { SetBeforeLogic } from '../../screens/homeScreen/setbefore/SetBeforeLogic'
import { ReservationList } from '../object/Order';
import moment from 'moment';
import Toast from 'react-native-toast-message';
interface DialogUpdateReservation {
    onPressClose: any;
    onPressOK: any;
    ReservationSend: ReservationList
}
export const DialogUpdateReservation = (props: DialogUpdateReservation) => {
    const { onPressClose, onPressOK, ReservationSend } = props;

    const [Reservation, setReservation] = useState(ReservationSend)
    const [VisbleDialogDate, setVisbleDialogDate] = useState(false)

    const { AddReservation_Logic, UpdateReservation_Logic } = SetBeforeLogic(props)

    useEffect(() => {
        return () => {

        };
    }, []);

    const onChangeDate = (value) => {
        setReservation({ ...Reservation, CreatedDate: getDataByThing.getDateTimeFormatToAPI(value), VisitedDate: getDataByThing.getDateTimeFormatToAPI(value) })
    }
    const ViewDialogDate = () => {
        return (
            <TouchableWithoutFeedback onPress={() => setVisbleDialogDate(false)}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', height: hp(30), width: '100%', borderRadius: 5, flexDirection: 'column', alignItems: 'center', borderWidth: 1, borderColor: mainColors.greenscolor }}>
                        <DatePicker
                            style={{ height: hp(22), elevation: 2, backgroundColor: 'white', width: wp(99), borderRadius: 5 }}
                            fadeToColor={'black'}
                            date={new Date(Reservation.VisitedDate)}
                            mode={'datetime'}
                            onDateChange={(value) => { onChangeDate(value) }}
                            androidVariant={'nativeAndroid'}
                            textColor={mainColors.greenscolor}
                        ></DatePicker>
                        <View style={{ height: hp(8), width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {

                                setVisbleDialogDate(false)
                            }
                            } style={{ height: hp(5), width: '30%', backgroundColor: 'white', elevation: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 2 }}>
                                <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), color: mainColors.blackColor }}>Đóng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setVisbleDialogDate(false)} style={{ height: hp(5), width: '30%', backgroundColor: mainColors.greenscolor, elevation: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 2 }}>
                                <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), color: mainColors.whiteColor }}>Xác Nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback >
        )
    }
    const onTextChangePhone = (value) => {
        let newText = '';
        let numbers = '0123456789';
        if (!!value) {
            for (var i = 0; i < value.length; i++) {
                if (numbers.indexOf(value[i]) > -1) {
                    newText = newText + value[i];
                }
            }
            setReservation({ ...Reservation, Persons: Number.parseInt(newText) })
        }
        else {

            setReservation({ ...Reservation, CustomerPhone: value })
        }
    }
    const onTextChangeNUmber = (value) => {
        let newText = '';
        let numbers = '0123456789';
        if (!!value) {
            for (var i = 0; i < value.length; i++) {
                if (numbers.indexOf(value[i]) > -1) {
                    newText = newText + value[i];
                }
            }
            setReservation({ ...Reservation, Persons: Number.parseInt(newText) })
        }
        else {
            setReservation({ ...Reservation, Persons: value })
        }
    }
    const onBlurTextPhone = () => {
        if (Reservation.CustomerPhone.length < 9 || Reservation.CustomerPhone.length > 11) {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Vui Lòng Nhập Đúng SDT'
            });
            setReservation({ ...Reservation, CustomerPhone: '' })
        }
    }
    const onUpdateReservation = async () => {
        try {

            if (Reservation != null) {
                if (!!Reservation.CustomerName && !!Reservation.CustomerPhone && !!Reservation.VisitedDate && !!Reservation.Persons) {
                    if (await UpdateReservation_Logic(Reservation)) {
                        onPressOK()
                    }
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: 'Vui Lòng Nhập Đủ Thông Tin'
                    });
                }
            }


        } catch (error) {
            console.log(error)
        }


    }
    const ViewData = () => {
        return (
            <View style={styles.containerItem}>
                <View style={[styles.headerView]}>
                    <Text style={styles.headerTitle}>Tuỳ Chỉnh Đơn Đặt Trước</Text>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onPressClose() }}>
                        <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ height: hp(50), width: '100%', flexDirection: 'column' }}>
                    <View style={{ height: hp(10), width: '100%', padding: 5, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Tên Khách Hàng</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(5), width: '100%', fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            onChangeText={(value) => { setReservation({ ...Reservation, CustomerName: value }) }}
                            placeholder='Tên Khách Hàng'
                            value={Reservation.CustomerName}
                        ></TextInput>
                    </View>
                    <View style={{ height: hp(10), width: '100%', padding: 5, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>SDT Khách Hàng</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            onFocus={() => { }}
                            onBlur={() => { onBlurTextPhone() }}
                            style={{ height: hp(5), width: '100%', fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            keyboardType='number-pad'
                            onChangeText={(value) => { onTextChangePhone(value) }}
                            placeholder='Số Điện Thoại'
                            value={Reservation.CustomerPhone}
                        ></TextInput>
                    </View>
                    <View style={{ height: hp(10), width: '100%', padding: 5, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Số Người</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(5), width: '100%', fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            keyboardType='number-pad'
                            onChangeText={(value) => { onTextChangeNUmber(value) }}
                            placeholder='Số Người'
                            value={Reservation.Persons.toString()}
                        ></TextInput>
                    </View>
                    <TouchableOpacity
                        onPress={() => {

                            setVisbleDialogDate(true)
                        }}
                        style={{ height: hp(10), width: '100%', padding: 5, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2 }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Ngày Đặt Bàn</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <View style={{ height: hp(5), width: '100%', backgroundColor: 'white', borderRadius: 5, borderWidth: 1, borderColor: mainColors.blackColor, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 10, flexDirection: 'row' }}>
                            <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>{getDataByThing.getDayMonthYearTimeString(Reservation.VisitedDate)}</Text>
                            <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'red' }}>🔻</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: hp(10), width: '100%', padding: 5, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Ghi Chú</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(5), width: '100%', fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'

                            onChangeText={(value) => { setReservation({ ...Reservation, Notes: value }) }}
                            placeholder='Ghi Chú'
                            value={Reservation.Notes}
                        ></TextInput>
                    </View>
                </View>
                <View style={{ height: hp(8), width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => { onPressClose() }}
                        style={{ alignItems: 'center', marginRight: 5, justifyContent: 'center', height: hp(5), width: '35%', elevation: 2, backgroundColor: 'white', borderRadius: 5 }}>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { onUpdateReservation() }}
                        style={{ alignItems: 'center', justifyContent: 'center', height: hp(5), width: '35%', elevation: 2, backgroundColor: mainColors.greenscolor, borderRadius: 5 }}>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.whiteColor }}>Xác Nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>

                {ViewData()}
                <Modal
                    animationType='slide'
                    transparent
                    visible={VisbleDialogDate}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'center', margin: 0 }}
                    onDismiss={() => { setVisbleDialogDate(false) }} >
                    {ViewDialogDate()}
                </Modal>
                <Toast position='top' autoHide={true} topOffset={0} />
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
        height: hp(65),
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