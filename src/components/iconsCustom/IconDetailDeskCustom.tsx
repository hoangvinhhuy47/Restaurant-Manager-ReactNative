import React, { useRef } from 'react';

import { StyleSheet, Text, TextStyle, ViewStyle, View, Image } from 'react-native';
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
        <TouchableOpacity onPressIn={() => { onPress() }} style={!Status ? styles.MainContainer_disable : styles.MainContainer}>
            <Image source={sourceICon} style={{ height: hp(5), width: wp(12), resizeMode: 'contain' }} ></Image>
            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.7), textAlign: 'center', color: colorText }}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: wp(24),
        height: hp(9),
        elevation: 2
    },
    MainContainer_disable: {
        backgroundColor: '#748C81',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: wp(24),
        height: hp(9),
    },

});
