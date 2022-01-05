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
import { Clock, TurnDowwn } from '../../assets/index';
import { Button, Card, Searchbar, IconButton, TextInput, Checkbox, } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { IconDetailCustom } from '../iconsCustom/IconDetailCustom';
import getDataByThing from '../../utils/getDataByThing';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import ThermalPrinterModule from 'react-native-thermal-printer';
import { PrinterList } from '../object/Order';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
interface DialogPrintOrder {

    onPressClose: any;
    onPressOK: any;
    ListPrinter: Array<PrinterList>
}

export const DialogPrintOrder = (props: DialogPrintOrder) => {
    const { isFinger } = useSelector((state: any) => ({
        isFinger: state?.auth?.isFinger,
    }));
    const dispatch = useDispatch();
    const { onPressClose, onPressOK, ListPrinter } = props;
    const [Check, setCheck] = useState(false)
    const [Check1, setCheck1] = useState(true)
    const [Check2, setCheck2] = useState(false)
    const [SizeWithPrinter, setSizeWithPrinter] = useState(80)
    const [DataPrinter, setDataPrinter] = useState(ListPrinter)
    const [ObjIPA, setObjIPA] = useState('')
    const [ObjIPB, setObjIPB] = useState('')
    const [ObjIPC, setObjIPC] = useState('')
    const [ObjIPD, setObjIPD] = useState('')
    const [ObjPrinter, setObjPrinter] = useState<PrinterList>(
        {
            ID: ListPrinter.length + 1,
            IpAdress: '',
            NamePrinter: '',
            Port: '9100',
            SizePaper: '80',
            isActive: false,
        }
    )
    const [CheckCut, setCheckCut] = useState(true)

    useEffect(() => {

        return () => { };
    }, []);

    const ConnectPrinter_Logic = async () => {

        const huy = '[C]<img>data:image/png;base64,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</img>\n' +
            '[L]\n' +
            "[C]<u><font size='big'>Hoa Don Ban Hang</font></u>\n" +
            '[L]\n' +
            '[C]------------------------------------------' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x1\n' +
            '[L]<b>Gia:9.000d</b>[R]9.000d\n' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x2\n' +
            '[L]<b>Gia:9.000d</b>[R]18.000d\n' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x3\n' +
            '[L]<b>Gia:9.000d</b>[R]27.000d\n' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x1\n' +
            '[L]<b>Gia:9.000d</b>[R]9.000d\n' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x1\n' +
            '[L]<b>Gia:9.000d</b>[R]9.000d\n' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x2\n' +
            '[L]<b>Gia:9.000d</b>[R]18.000d\n' +
            '[L]\n' +
            '[C]------------------------------------------ \n' +
            '[L]<b>Tong Tien</b>[R]500.000d\n' +
            '[L]\n' +
            '[L]<b>Phi Dich Vu</b>[R]9.000d\n' +
            '[L]<b>Tien Khach Dua</b>[R]1.000.000d\n' +
            '[L]<b>Thoi Lai</b>[R]500.000d\n' +
            '[L]\n' +
            '[L]\n' +
            '[C]------------------------------------------' +
            '[L]\n' +
            "[L]<font size='normal'>Khach Hang : Hoang Vinh Huy</font>\n" +
            '[L]Thanh Toan Tien Mat\n' +
            '[L]SDT:0901909514\n' +
            "[L]<font size='normal'>Nhan Vien : Hoang Vinh Huy</font>\n" +
            '[L]\n' +
            // "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
            '[L]\n' +
            '[L]\n' +
            '[L]\n' +
            '[L]\n' +
            "[C]<font size='normal'>Cam On Quy Khach</font>\n" +
            "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
            '[L]\n' +
            '[L]\n' +
            '[L]\n' +
            '[L]\n' +
            '[L]\n';

        ThermalPrinterModule.defaultConfig.ip = ObjPrinter.IpAdress;
        ThermalPrinterModule.defaultConfig.port = Number.parseInt(ObjPrinter.Port);
        ThermalPrinterModule.defaultConfig.autoCut = CheckCut;
        ThermalPrinterModule.defaultConfig.printerWidthMM = SizeWithPrinter;
        try {
            await ThermalPrinterModule.printTcp({ payload: huy });
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Không Thể Kết Nối Máy In'
            });
        }


    }
    const AddNewPrinter = () => {
        if (!!ObjPrinter.NamePrinter) {
            if (!!ObjIPA || !!ObjIPB || !!ObjIPC || !!ObjIPD || ObjPrinter.Port) {
                DataPrinter.push(ObjPrinter)
                setDataPrinter([...DataPrinter])
                dispatch({ type: 'SET_FINGER', payload: DataPrinter });
                onPressClose()
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Vui Lòng Nhập Thông Tin Đầy Đủ'
                });
            }
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Vui Lòng Nhập Thông Tin Tên Máy In'
            });
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Toast position='top' autoHide={true} topOffset={0} />
                <View style={styles.containerItem}>

                    <View style={[styles.headerView]}>
                        <Text style={styles.headerTitle}>In Hóa Đơn</Text>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onPressClose() }}>
                            <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: hp(55), alignItems: 'flex-start', paddingLeft: 10, flexDirection: 'column', backgroundColor: 'white', elevation: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Tên Máy In</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>

                        </View>
                        <TextInput
                            style={{ width: '95%', height: 55, backgroundColor: 'white', textAlign: 'left', marginLeft: 5, fontSize: 12, color: 'black', fontFamily: Fonts.Roboto_Slab_Regular }}
                            value={ObjPrinter.NamePrinter}
                            mode='outlined'
                            label='Tên Máy In'
                            onChangeText={(value) => {
                                ObjPrinter.NamePrinter = value
                                setObjPrinter({ ...ObjPrinter })
                            }}
                        ></TextInput>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Địa Chỉ IP</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <TextInput
                                style={{ width: '15%', height: 55, backgroundColor: 'white', textAlign: 'center', marginLeft: 5, fontSize: 12, color: 'black', fontFamily: Fonts.Roboto_Slab_Regular }}
                                value={ObjIPA.toString()}
                                keyboardType='numeric'
                                onChangeText={(value) => {
                                    setObjIPA(value)
                                    ObjPrinter.IpAdress = value + '.' + ObjIPB + '.' + ObjIPC + '.' + ObjIPD
                                    setObjPrinter({ ...ObjPrinter })
                                }}
                            ></TextInput>
                            <TextInput
                                style={{ width: '15%', height: 55, backgroundColor: 'white', textAlign: 'center', marginLeft: 5, fontSize: 12, color: 'black', fontFamily: Fonts.Roboto_Slab_Regular }}
                                value={ObjIPB.toString()}
                                keyboardType='numeric'
                                onChangeText={(value) => {
                                    setObjIPB(value)
                                    ObjPrinter.IpAdress = ObjIPA + '.' + value + '.' + ObjIPC + '.' + ObjIPD
                                    setObjPrinter({ ...ObjPrinter })
                                }}
                            ></TextInput>
                            <TextInput
                                style={{ width: '15%', height: 55, backgroundColor: 'white', textAlign: 'center', marginLeft: 5, fontSize: 12, color: 'black', fontFamily: Fonts.Roboto_Slab_Regular }}
                                value={ObjIPC.toString()}
                                keyboardType='numeric'
                                onChangeText={(value) => {
                                    setObjIPC(value)
                                    ObjPrinter.IpAdress = ObjIPA + '.' + ObjIPB + '.' + value + '.' + ObjIPD
                                    setObjPrinter({ ...ObjPrinter })
                                }}
                            ></TextInput>
                            <TextInput
                                style={{ width: '15%', height: 55, backgroundColor: 'white', textAlign: 'center', marginLeft: 5, fontSize: 12, color: 'black', fontFamily: Fonts.Roboto_Slab_Regular }}
                                value={ObjIPD.toString()}
                                keyboardType='numeric'
                                onChangeText={(value) => {
                                    setObjIPD(value)
                                    ObjPrinter.IpAdress = ObjIPA + '.' + ObjIPB + '.' + ObjIPC + '.' + value
                                }}
                            ></TextInput>
                            <Text style={{ fontFamily: Fonts.Roboto_Stab_Bold, fontSize: 17 }}> :</Text>
                            <TextInput
                                style={{ width: '17%', height: 55, backgroundColor: 'white', textAlign: 'center', marginLeft: 5, fontSize: 12, color: 'black', fontFamily: Fonts.Roboto_Slab_Regular }}
                                value={ObjPrinter.Port.toString()}
                                keyboardType='numeric'
                                onChangeText={(value) => {
                                    ObjPrinter.Port = value
                                    setObjPrinter({ ...ObjPrinter })
                                }}
                            ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Kích Thước Máy In</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, width: '100%' }}>
                            {Platform.select({
                                ios: (
                                    <Checkbox.Item mode='ios' position={'trailing'} onPress={() => {
                                        setCheck(true)
                                        setCheck1(false)
                                        setCheck2(false)
                                        setSizeWithPrinter(58)
                                        ObjPrinter.SizePaper = '58'
                                        setObjPrinter({ ...ObjPrinter })
                                    }} labelStyle={{ fontSize: 10, width: '13%', color: mainColors.blue, fontFamily: Fonts.Roboto_Stab_Bold }} status={Check == true ? 'checked' : 'unchecked'} label={'(58mm)'} ></Checkbox.Item>
                                ),
                                android: <Checkbox.Item mode='android' position={'trailing'} onPress={() => {
                                    setCheck(true)
                                    setCheck1(false)
                                    setCheck2(false)
                                    setSizeWithPrinter(58)
                                    ObjPrinter.SizePaper = '58'
                                    setObjPrinter({ ...ObjPrinter })
                                }} labelStyle={{ fontSize: 10, width: '13%', color: mainColors.blue, fontFamily: Fonts.Roboto_Stab_Bold }} status={Check == true ? 'checked' : 'unchecked'} label={'(58mm)'} ></Checkbox.Item>

                            })}
                            {Platform.select({
                                ios: (
                                    <Checkbox.Item mode='ios' position={'trailing'} onPress={() => {
                                        setCheck(false)
                                        setCheck1(true)
                                        setCheck2(false)
                                        setSizeWithPrinter(80)
                                        ObjPrinter.SizePaper = '80'
                                        setObjPrinter({ ...ObjPrinter })
                                    }} labelStyle={{ fontSize: 10, width: '13%', color: mainColors.blue, fontFamily: Fonts.Roboto_Stab_Bold }} status={Check1 == true ? 'checked' : 'unchecked'} label={'(80mm)'} ></Checkbox.Item>
                                ),
                                android: <Checkbox.Item mode='android' position={'trailing'} onPress={() => {
                                    setCheck(false)
                                    setCheck1(true)
                                    setCheck2(false)
                                    setSizeWithPrinter(80)
                                    ObjPrinter.SizePaper = '80'
                                    setObjPrinter({ ...ObjPrinter })
                                }} labelStyle={{ fontSize: 10, width: '13%', color: mainColors.blue, fontFamily: Fonts.Roboto_Stab_Bold }} status={Check1 == true ? 'checked' : 'unchecked'} label={'(80mm)'} ></Checkbox.Item>

                            })}
                            {Platform.select({
                                ios: (
                                    <Checkbox.Item mode='ios' position={'trailing'} onPress={() => {
                                        setCheck(false)
                                        setCheck1(false)
                                        setCheck2(true)
                                        setSizeWithPrinter(104)
                                        ObjPrinter.SizePaper = '104'
                                        setObjPrinter({ ...ObjPrinter })
                                    }} labelStyle={{ fontSize: 10, width: '14%', color: mainColors.blue, fontFamily: Fonts.Roboto_Stab_Bold }} status={Check2 == true ? 'checked' : 'unchecked'} label={'(104mm)'} ></Checkbox.Item>
                                ),
                                android: <Checkbox.Item mode='android' position={'trailing'} onPress={() => {
                                    setCheck(false)
                                    setCheck1(false)
                                    setCheck2(true)
                                    setSizeWithPrinter(104)
                                    ObjPrinter.SizePaper = '104'
                                    setObjPrinter({ ...ObjPrinter })
                                }} labelStyle={{ fontSize: 10, width: '14%', color: mainColors.blue, fontFamily: Fonts.Roboto_Stab_Bold }} status={Check2 == true ? 'checked' : 'unchecked'} label={'(104mm)'} ></Checkbox.Item>

                            })}

                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Tự Động Cắt Khi Kết Thúc In</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                            {Platform.select({
                                ios: (
                                    <Checkbox.Item mode='ios' position={'leading'} onPress={() => { setCheckCut(true) }} labelStyle={{ fontSize: 13, width: '20%', color: mainColors.blue, fontFamily: Fonts.Roboto_Stab_Bold }} status={CheckCut == true ? 'checked' : 'unchecked'} label={'Yes'} ></Checkbox.Item>
                                ),
                                android: <Checkbox.Item mode='android' position={'leading'} onPress={() => { setCheckCut(true) }} labelStyle={{ fontSize: 13, width: '20%', color: mainColors.blue, fontFamily: Fonts.Roboto_Stab_Bold }} status={CheckCut == true ? 'checked' : 'unchecked'} label={'Yes'} ></Checkbox.Item>

                            })}
                            {Platform.select({
                                ios: (
                                    <Checkbox.Item mode='ios' position={'leading'} onPress={() => { setCheckCut(false) }} labelStyle={{ fontSize: 13, width: '20%', color: mainColors.blue, fontFamily: Fonts.Roboto_Stab_Bold }} status={CheckCut == false ? 'checked' : 'unchecked'} label={'No'} ></Checkbox.Item>
                                ),
                                android: <Checkbox.Item mode='android' position={'leading'} onPress={() => { setCheckCut(false) }} labelStyle={{ fontSize: 13, width: '20%', color: mainColors.blue, fontFamily: Fonts.Roboto_Stab_Bold }} status={CheckCut == false ? 'checked' : 'unchecked'} label={'No'} ></Checkbox.Item>

                            })}
                        </View>
                    </View>
                    <View style={styles.viewBottomButton}>
                        <TouchableOpacity
                            style={[styles.button1, { borderColor: 'white' },
                            Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                            ]}
                            onPress={() => { onPressClose() }}>
                            <Text style={styles.textButton1}>Hủy Bỏ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { borderColor: 'white' },
                            Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                            ]}
                            onPress={() => { ConnectPrinter_Logic() }}>
                            <Text style={styles.textButton}>In Thử</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { borderColor: 'white' },
                            Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                            ]}
                            onPress={() => { AddNewPrinter() }}>
                            <Text style={styles.textButton}>Thêm Máy In</Text>
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
        height: hp(70),
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
        backgroundColor: mainColors.greenscolor,
        marginBottom: 3,
        width: wp(25),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    button1: {
        backgroundColor: mainColors.smokecolor,
        marginBottom: 3,
        width: wp(25),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
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
        fontSize: hp(1.8),
        fontFamily: Fonts.Roboto_Slab_Regular,
        color: mainColors.whiteColor,
    },
    textButton1: {
        fontSize: hp(1.8),
        fontFamily: Fonts.Roboto_Slab_Regular,
        color: mainColors.blackColor,
    },
    viewBottomButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
        width: '100%'
    },
    bodypu: {
        marginBottom: 5,
        width: '100%',
        height: hp(20),
        justifyContent: 'center',
        alignItems: 'center'
    }
});

function dispatch(arg0: { type: string; payload: boolean; }) {
    throw new Error('Function not implemented.');
}
