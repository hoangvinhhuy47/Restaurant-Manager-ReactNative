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
import { TextInputCustom } from '../userComponents/TextInputCustom';
import { Clock, Plus, TurnDowwn } from '../../assets/index';
import { Button, Card, Searchbar, IconButton, TextInput, } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { IconDetailCustom } from '../iconsCustom/IconDetailCustom';
import getDataByThing from '../../utils/getDataByThing';
import DatePicker from 'react-native-date-picker'
import { SetBeforeLogic } from '../../screens/homeScreen/setbefore/SetBeforeLogic'
import { ReservationList } from '../object/Order';
import Toast from 'react-native-toast-message';
import { DialogCustomer } from './DialogCustomer';
interface DialogAddReservation {
    onPressClose: any;
    onPressOK: any;
}
export const DialogAddReservation = (props: DialogAddReservation) => {
    const { onPressClose, onPressOK } = props;
    const [today, setToday] = useState(new Date())
    const [Reservation, setReservation] = useState<ReservationList>({
        ReservationID: "00000000-0000-0000-0000-000000000000",
        CreatedDate: getDataByThing.getDateTimeFormatToAPI(today),
        Status: 1,
        VisitedDate: getDataByThing.getDateTimeFormatToAPI(today),
        Persons: 0,
        CustomerID: '',
        CustomerName: '',
        CustomerPhone: '',
        UpdateDate: '',
        CancelationBy: '',
        CancelationDate: '',
        CancelationNote: '',
        Notes: '',
        SearchString: '',
        isActive: false,
    })
    const [VisbleDialogDate, setVisbleDialogDate] = useState(false)
    const [VisbleDialogCustomer, setVisbleDialogCustomer] = useState(false)

    const { AddReservation_Logic } = SetBeforeLogic(props)
    const GetDateTime = () => {
        var today = new Date();
        setReservation({ ...Reservation, CreatedDate: getDataByThing.getDateTimeFormatToAPI(today), VisitedDate: getDataByThing.getDateTimeFormatToAPI(today) })
    }
    useEffect(() => {
        return () => {
            GetDateTime()
        };
    }, []);
    useEffect(() => { ViewData() }, [Reservation])
    const onChangeDate = (value) => {
        var today = new Date();
        if (value > today) {
            setReservation({ ...Reservation, CreatedDate: getDataByThing.getDateTimeFormatToAPI(value), VisitedDate: getDataByThing.getDateTimeFormatToAPI(value) })
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Vui Lòng Chọn Ngày Lớn Hơn Hiện tại'
            });

            setReservation({ ...Reservation, CreatedDate: getDataByThing.getDateTimeFormatToAPI(today), VisitedDate: getDataByThing.getDateTimeFormatToAPI(today) })
        }

    }
    const ViewDialogDate = () => {
        return (
            <TouchableWithoutFeedback onPress={() => setVisbleDialogDate(false)}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', height: hp(30), width: '100%', borderRadius: 5, flexDirection: 'column', alignItems: 'center', borderWidth: 1, borderColor: mainColors.greenscolor }}>
                        <DatePicker
                            style={{ height: hp(22), elevation: 2, backgroundColor: 'white', width: wp(99), borderRadius: 5 }}
                            fadeToColor={'black'}
                            date={!!Reservation ? new Date(Reservation.VisitedDate) : new Date()}
                            mode={'datetime'}
                            onDateChange={(value) => { onChangeDate(value) }}
                            androidVariant={'nativeAndroid'}
                            textColor={mainColors.greenscolor}
                        ></DatePicker>
                        <View style={{ height: hp(8), width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                GetDateTime()
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
                    {/* <Toast position='top' autoHide={true} topOffset={0} /> */}
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
            setReservation({ ...Reservation, CustomerPhone: newText })
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
                text2: 'Vui Lòng Nhập Đúng sdt'
            });
            setReservation({ ...Reservation, CustomerPhone: '' })
        }
    }
    const onAddReservation = async () => {
        try {

            if (Reservation != null) {
                if (!!Reservation.CustomerName && !!Reservation.CustomerPhone && !!Reservation.VisitedDate && !!Reservation.Persons) {
                    if (await AddReservation_Logic(Reservation)) {
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
                    <Text style={styles.headerTitle}>Thêm Đơn Đặt Trước</Text>
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
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={{ height: hp(5), width: '85%',  paddingVertical: 0, fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                                mode='outlined'
                                onChangeText={(value) => { setReservation({ ...Reservation, CustomerName: value }) }}
                                placeholder='Tên Khách Hàng'
                                value={!!Reservation ? Reservation.CustomerName : ''}
                            ></TextInput>
                            <TouchableOpacity onPress={() => { setVisbleDialogCustomer(true) }} style={{ height: hp(7), width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: Fonts.Roboto_Stab_Bold, fontSize: 10, color: 'blue' }}>Chọn</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: hp(10), width: '100%', padding: 5, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>SDT Khách Hàng</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            onFocus={() => { }}
                            onBlur={() => { onBlurTextPhone() }}
                            style={{ height: hp(5), width: '100%', fontSize: hp(2.2),  paddingVertical: 0, fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            keyboardType='number-pad'
                            onChangeText={(value) => { onTextChangePhone(value) }}
                            placeholder='Số Điện Thoại'
                            value={!!Reservation ? Reservation.CustomerPhone : ''}
                        ></TextInput>
                    </View>
                    <View style={{ height: hp(10), width: '100%', padding: 5, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: 'black' }}>Số Người</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(5), width: '100%', fontSize: hp(2.2),   paddingVertical: 0,fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            keyboardType='number-pad'
                            onChangeText={(value) => { onTextChangeNUmber(value) }}
                            placeholder='Số Người'
                            value={!!Reservation ? Reservation.Persons.toString() : ''}
                        ></TextInput>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setVisbleDialogDate(true)
                        }}
                        style={{ height: hp(10), width: '100%', padding: 5, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2 }}>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: 'black' }}>Ngày Đặt Bàn</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <View style={{ height: hp(5), width: '100%', backgroundColor: 'white', borderRadius: 5, borderWidth: 1, borderColor: mainColors.blackColor, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 10, flexDirection: 'row' }}>
                            <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>{!!Reservation ? getDataByThing.getDayMonthYearTimeString(Reservation.VisitedDate) : getDataByThing.getDayMonthYearTimeString(new Date())}</Text>
                            <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'red' }}>🔻</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: hp(10), width: '100%', padding: 5, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: 'black' }}>Ghi Chú</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(5), width: '100%', fontSize: hp(2.2),   paddingVertical: 0,fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            onChangeText={(value) => { setReservation({ ...Reservation, Notes: value }) }}
                            placeholder='Ghi Chú'
                            value={!!Reservation ? Reservation.Notes : ''}
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
                        onPress={() => { onAddReservation() }}
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
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisbleDialogDate(false) }} >
                    {ViewDialogDate()}
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={VisbleDialogCustomer}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => {
                        setVisbleDialogCustomer(false)

                    }}
                >
                    <DialogCustomer
                        onPressOK={(value) => {
                            setVisbleDialogCustomer(false)
                            setReservation({
                                ...Reservation, CustomerID: value.ObjectID,
                                CustomerName: value.ObjectName,
                                CustomerPhone: value.ObjectPhone,

                            })
                        }}
                        onPressClose={() => {
                            setVisbleDialogCustomer(false)
                            setReservation({
                                ReservationID: "00000000-0000-0000-0000-000000000000",
                                CreatedDate: getDataByThing.getDateTimeFormatToAPI(today),
                                Status: 1,
                                VisitedDate: getDataByThing.getDateTimeFormatToAPI(today),
                                Persons: 0,
                                CustomerID: '',
                                CustomerName: '',
                                CustomerPhone: '',
                                UpdateDate: '',
                                CancelationBy: '',
                                CancelationDate: '',
                                CancelationNote: '',
                                Notes: '',
                                SearchString: '',
                                isActive: false,
                            })
                        }}
                    ></DialogCustomer>
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