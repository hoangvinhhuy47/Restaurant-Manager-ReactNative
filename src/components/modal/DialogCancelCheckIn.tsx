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
import { SetBeforeLogic } from '../../screens/homeScreen/setbefore/SetBeforeLogic';
import Toast from 'react-native-toast-message';
interface DialogCancelCheckIn {
    onPressClose: any;
    onPressOK: any;
    ReservationID: string;
}

export const DialogCancelCheckIn = (props: DialogCancelCheckIn) => {
    const { onPressClose, onPressOK, ReservationID } = props;
    const [Reason, setReason] = useState('')
    const { AddReservation_Logic, CancelCheckIn_Logic } = SetBeforeLogic(props)
    useEffect(() => {
        return () => { };
    }, []);
    const onCancelCheckIn = async () => {
        if (!!Reason) {
            if (await CancelCheckIn_Logic(ReservationID, Reason)) {
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
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Vui Lòng Nhập Lí Do từ Chối'
            });

        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
           
                <View style={styles.containerItem}>
                    <View style={[styles.headerView]}>
                        <Text style={styles.headerTitle}>Hủy Đặt Trước</Text>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onPressClose() }}>
                            <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: hp(22), alignItems: 'flex-start', padding: 10, flexDirection: 'column' }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), color: mainColors.blackColor }}>Nhập lí do hủy(✳)</Text>
                        <TextInput
                            style={{ height: hp(15), width: '100%', fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            onChangeText={(value) => { !!value ? setReason(value) : {} }}
                            placeholder='Ghi Chú'
                            value={Reason}
                        ></TextInput>
                    </View>
                    <View style={styles.viewBottomButton}>
                        <TouchableOpacity
                            style={[styles.button, { borderColor: 'white' },
                            Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                            ]}
                            onPress={() => { onCancelCheckIn() }}>
                            <Text style={styles.textButton}>Xác Nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        backgroundColor: 'white',
        marginBottom: 3,
        width: wp(50),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        borderRadius: 15
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