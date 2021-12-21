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
import { Button, Card, Searchbar, IconButton, } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { IconDetailCustom } from '../iconsCustom/IconDetailCustom';
import getDataByThing from '../../utils/getDataByThing';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
interface DialogExtendAndStopHour {

    onPressClose: any;
    onPressOK: any;
    OrderID: string


}

export const DialogExtendAndStopHour = (props: DialogExtendAndStopHour) => {
    const { onPressClose, onPressOK, OrderID } = props;
    const { ExtendAndStopHour_Logic } = DetailDesk_Logic(props)
    const [DateSend, setDateSend] = useState(new Date())
    const [DateNow, setDateNow] = useState(new Date())
    const [Color, setColor] = useState(mainColors.greenscolor)
    const GetDataTime = () => {
        setColor(mainColors.greenscolor)
        var today = new Date();
        setDateNow(today)

    }
    useEffect(() => {
        GetDataTime()
        return () => { };
    }, []);
    useEffect(() => { ViewDatTime() },
        [DateNow, Color])
    const onDateChange = (value) => {
        if (value < DateNow) {
            setColor(mainColors.red)
            setDateSend(DateNow)
            GetDataTime()
        }
        else {
            setColor(mainColors.greenscolor)
            setDateSend(value)
        }
    }
    const onExtendAndStopHour = async () => {
        if (await ExtendAndStopHour_Logic(OrderID, getDataByThing.getDateTimeFormatToAPI(DateSend))) {
            onPressOK()
        }
    }
    const ViewDatTime = () => {
        return (<View style={styles.view_center}>
            <DatePicker
                style={{ maxHeight: hp(20), elevation: 2 }}
                fadeToColor={'black'}
                date={DateNow}
                mode={'time'}
                onDateChange={(value) => onDateChange(value)}
                androidVariant={'nativeAndroid'}
                textColor={Color}
            ></DatePicker>
        </View>)
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.containerItem}>
                    <View style={[styles.headerView]}>
                        <Text style={styles.headerTitle}>Cộng Giờ Và Kết Thúc Tính Giờ</Text>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onPressClose() }}>
                            <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: hp(3), alignItems: 'flex-start', paddingLeft: 10, flexDirection: 'row' }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: mainColors.greenscolor }}>Chọn Giờ Kết Thúc </Text>
                        <Image source={Clock} style={{ height: hp(3), width: hp(3), resizeMode: 'contain' }}></Image>
                    </View>
                    {ViewDatTime()}

                    <View style={styles.viewBottomButton}>
                        <TouchableOpacity onPressIn={() => { onPressClose() }} style={styles.button1_bottom}>
                            <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPressIn={() => { onExtendAndStopHour() }} style={styles.button2_bottom}>
                            <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Xác Nhận</Text>
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
        height: hp(40),
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
    },
    button1_bottom: {
        height: hp(6),
        width: wp(40),
        borderRadius: 5,
        backgroundColor: mainColors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        elevation: 5
    },
    button2_bottom: {
        borderRadius: 5,
        height: hp(6),
        width: wp(40),
        backgroundColor: mainColors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        elevation: 5
    }
});