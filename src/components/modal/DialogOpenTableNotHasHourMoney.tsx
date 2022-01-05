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
import { TurnDowwn } from '../../assets/index';
import { Button, Card, Searchbar, IconButton, } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { IconDetailCustom } from '../iconsCustom/IconDetailCustom';
import getDataByThing from '../../utils/getDataByThing';
import moment from 'moment';
interface DialogOpenTableNotHasHourMoney {

    onPressClose: any;
    onPressOK: any;
    caption: string;
    type: boolean

}

export const DialogOpenTableNotHasHourMoney = (props: DialogOpenTableNotHasHourMoney) => {
    const { onPressClose, onPressOK, caption, type } = props;
    useEffect(() => {

        return () => { };
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.containerItem}>
                    <View style={[styles.headerView]}>
                        <Text style={styles.headerTitle}>Thông Báo</Text>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onPressClose() }}>
                            <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.view_center}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2.5), color: 'black' }}>Bạn Muốn Mở {caption}?</Text>
                    </View>
                    <View style={styles.viewBottomButton}>
                        <TouchableOpacity
                            style={[styles.button, { borderColor: 'white' },
                            Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                            ]}
                            onPress={() => { onPressOK() }}>
                            <Text style={styles.textButton}>Mở Bàn</Text>
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
        height: hp(35),
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    view_center: {
        height: hp(20),
        width: '100%',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    },
    text_center: {
        fontFamily: Fonts.Roboto_Slab_Regular,
        fontSize: hp(2.2),
    },

    headerView: {
        height: hp(6),
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