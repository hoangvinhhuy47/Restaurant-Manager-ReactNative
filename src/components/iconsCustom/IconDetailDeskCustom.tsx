import React, { useRef } from 'react';

import { StyleSheet, Text, TextStyle, ViewStyle, View, Image, Platform } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';

import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { TextInput, Button, Card, Searchbar, IconButton } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface IconDetailDeskCustom {
    title?: string;
    onPress?: any;
    style?: ViewStyle;
    sourceICon?: any;
    labelStyle?: ViewStyle;
    OrderID?: string;
    Status?: boolean

}
export const IconDetailDeskCustom = (props: IconDetailDeskCustom) => {
    const { title, onPress, style, sourceICon, labelStyle, OrderID, Status } = props;
    const colorText = Status ? 'black' : '#BFD0C7'
    return (
        <TouchableOpacity onPressIn={() => { onPress() }} style={Status ? [styles.MainContainer, Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid] : styles.MainContainer_disable}>
            <Image source={sourceICon} style={{ height: hp(4), width: wp(10), resizeMode: 'contain' }} ></Image>
            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 11, textAlign: 'center', color: colorText }}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: wp(24.5),
        height: hp(9),
        elevation: 5
    },
    MainContainer_disable: {
        backgroundColor: '#5A5A5A',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: wp(24.5),
        height: hp(9),
    },
    shadowAndroid: {
        elevation: 5,
    },
    shadowIos: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.21,
        shadowRadius: 4,
    },
});
