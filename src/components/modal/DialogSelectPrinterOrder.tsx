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
import { useSelector } from 'react-redux';
import { PrinterList } from '../object/Order';
import { FlatList } from 'react-native-gesture-handler';
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
interface DialogSelectPrinterOrder {
    onPressClose: any;
    onPressOK: any;
}

export const DialogSelectPrinterOrder = (props: DialogSelectPrinterOrder) => {
    const { onPressClose, onPressOK } = props;
    const { PrinterOrder_Logic } = DetailDesk_Logic(props)
    const { isFinger } = useSelector((state: any) => ({
        isFinger: state?.auth?.isFinger,
    }));
    const [List, setList] = useState(Array<PrinterList>())
    useEffect(() => {
        setList(isFinger)
        return () => { };
    }, []);
    const ViewDataPrinter = (item, index) => {
        return (
            <TouchableOpacity
                onPress={() => { PrinterOrder_Logic(item.IpAdress, item.Port, true, Number.parseInt(item.SizePaper)) }}
                style={{ height: 60, width: '45%', backgroundColor: 'white', elevation: 1, borderColor: mainColors.smokecolor, borderRadius: 5, borderWidth: 1, paddingLeft: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 15, color: 'black' }}>{index + 1}. {item.NamePrinter}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.containerItem}>
                    <View style={[styles.headerView]}>
                        <Text style={styles.headerTitle}>Chọn Máy In</Text>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onPressClose() }}>
                            <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: hp(27), alignItems: 'flex-start', elevation: 2, flexDirection: 'row', backgroundColor: 'white', padding: 2 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            numColumns={2}
                            keyExtractor={(item, index) => 'key' + index}
                            data={List}
                            renderItem={({ item, index }) => (ViewDataPrinter(item, index))}
                        ></FlatList>
                    </View>
                    <View style={styles.viewBottomButton}>
                        <TouchableOpacity
                            style={[styles.button, { borderColor: 'white' },
                            Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                            ]}
                            onPress={() => { onPressOK() }}>
                            <Text style={styles.textButton}>Đóng</Text>
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
        backgroundColor: mainColors.greenscolor,
        marginBottom: 3,
        width: wp(25),
        height: hp(5),
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
        fontSize: hp(2),
        fontFamily: Fonts.Roboto_Slab_Regular,
        color: mainColors.whiteColor,
    },
    viewBottomButton: {
        width: '100%',
        alignItems: 'flex-end',
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