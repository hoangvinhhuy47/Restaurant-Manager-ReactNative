
import { BackgroundBigScreen } from '../../../src/components/backgroundScreen/backgroundBigScreen/BackgroundBigScreen.view';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    FlatList,

    Modal,
    Picker,

    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';


import React, { useState, useEffect } from 'react';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';

import lodash from 'lodash'


import { Checkbox, TextInput } from 'react-native-paper';
import { TextInputCustom } from '../userComponents';
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import { TurnDowwn } from '../../assets';
import Toast from 'react-native-toast-message';
interface DialogCommentFood {
    OrderDetailID?: string;
    FoodID?: string;
    onShow: any
    onSuccesfull: any
    Caption: string
}
export const DialogCommentFood = (props: DialogCommentFood) => {
    const { onGetTable_Logic,
        dataOrderList, dataOrder, dataOrderDetail, setdataOrder,
        setdataOrderDetail, setdataOrderList, Type, setType,
        dataGroups, setdataGroups,
        dataCommentFood, setdataCommentFood,
        dataFoodList, setdataFoodList,
        dataTableMerger, setdataTableMerger,
        dataMenu, setDataMenu,
        onAddFood_Logic,
        onCancelTable_Logic,
        onChangeQuantityFood_Logic,
        onCommendFood_Logic,
        onDisCountFood_Logic,
        onGetCommentFood_Logic,
        onGetMenu_Logic,
        onGetMenuDetail_Logic,
        onGetOrder_Logic,
        onGetTableMerger_Logic,
        onGetTableToMer_Logic,
        onMergeTable_Logic,
        onRemoveFood_Logic,
        onSendToCookAll_Logic,
        onSendToSinge_Logic,
        onSplitOrder_Logic,
        onTakeAwayFood_onMenu } = DetailDesk_Logic(props)
    const { OrderDetailID, FoodID, onShow, onSuccesfull, Caption } = props
    const GetData = async () => {
        await onGetCommentFood_Logic(OrderDetailID, FoodID);
    }
    const onChangeTypeNote = (number: any, index: any) => {
        console.log(dataCommentFood)
        if (number == 1) {
            dataCommentFood[index].CommentLevel = 1;
            setdataCommentFood([...dataCommentFood])
        }
        else if (number == 2) {
            dataCommentFood[index].CommentLevel = 2;
            setdataCommentFood([...dataCommentFood])
        }
        else {
            dataCommentFood[index].CommentLevel = 3;
            setdataCommentFood([...dataCommentFood])
        }
    }
    const CommentFood = async () => {
        if (await onCommendFood_Logic(OrderDetailID, dataCommentFood)) {
            onSuccesfull()
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Không Thành Công'
            });
        }
    }
    const onTextChange = (value: any) => {
        if (value != "") {
            for (var i = 0; i < dataCommentFood.length; i++) {
                if (dataCommentFood[i].CommentID == "00000000-0000-0000-0000-000000000000") {
                    dataCommentFood[i].CommentText = value;
                    setdataCommentFood([...dataCommentFood])
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < dataCommentFood.length; i++) {
                if (dataCommentFood[i].CommentID == "00000000-0000-0000-0000-000000000000") {
                    dataCommentFood[i].CommentText = '';
                    setdataCommentFood([...dataCommentFood])
                    break;
                }
            }
        }
    }

    useEffect(() => {
        GetData();
        return () => { };
    }, []);
    return <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{
            height: hp(100),
            width: wp(100),
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        <View style={{
            alignItems: 'center',
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
        }}>
            <View style={styles.container}>

                <View style={[styles.headerView]}>
                    <Text style={styles.headerTitle}>Ghi Chú Món Ăn </Text>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onShow() }}>
                        <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                    </TouchableOpacity>
                </View>
                {!lodash.isEmpty(dataCommentFood) ?
                    <FlatList
                        style={{ backgroundColor: 'white', elevation: 2, height: 'auto', width: '100%' }}
                        data={dataCommentFood}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                                <View style={{ width: wp(50), alignItems: 'flex-start', marginLeft: 5 }}>
                                    <Text style={{ fontSize: hp(2.3), fontFamily: Fonts.Roboto_Stab_Bold, textDecorationLine: 'underline' }}>{item.CommentName}</Text>
                                </View>
                                {item.CommentID != "00000000-0000-0000-0000-000000000000" ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                                        <Checkbox.Item position={'leading'} onPress={() => { onChangeTypeNote(1, index) }} labelStyle={{ fontSize: hp(2) }} style={{ height: hp(7), width: undefined, justifyContent: 'flex-start' }} label={item.Level1} status={item.CommentLevel == 1 ? "checked" : "unchecked"} />
                                        <Checkbox.Item position={'leading'} onPress={() => { onChangeTypeNote(2, index) }} labelStyle={{ fontSize: hp(2) }} style={{ height: hp(7), width: undefined, justifyContent: 'flex-start' }} label={item.Level2} status={item.CommentLevel == 2 ? "checked" : "unchecked"} />
                                        <Checkbox.Item position={'leading'} onPress={() => { onChangeTypeNote(3, index) }} labelStyle={{ fontSize: hp(2) }} style={{ height: hp(7), width: undefined, justifyContent: 'flex-start' }} label={item.Level3} status={item.CommentLevel == 3 ? "checked" : "unchecked"} />
                                    </View> : <View></View>}
                                {item.CommentID != "00000000-0000-0000-0000-000000000000" ?
                                    <View></View>
                                    :
                                    <View style={{ width: wp(100), height: hp(12), alignItems: 'center' }}>
                                        <TextInput
                                            defaultValue={dataCommentFood[index].CommentText}
                                            placeholder={'Nhập Ghi Chú'}
                                            mode={'outlined'}
                                            onChangeText={onTextChange}
                                            style={{ height: hp(10), width: '95%',  paddingVertical: 0, fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, backgroundColor: 'white' }}
                                        />
                                    </View>}

                            </View>
                        )}
                    ></FlatList>
                    : <View></View>}

                <View style={styles.view_bottom}>

                    <TouchableOpacity onPressIn={() => { CommentFood() }} style={styles.button2_bottom}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.whiteColor }}>Xác Nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Toast position='top' autoHide={true} topOffset={0} />
        </View>
    </KeyboardAvoidingView>
};
const styles = StyleSheet.create({
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
        fontFamily: Fonts.Roboto_Slab_Regular,
        maxWidth: '60%',
        height: hp(3),

    },
    container: {
        height: 'auto',
        width: '100%',
        backgroundColor: '#E4E4E4',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    view_bottom: {
        width: wp(100),
        alignItems: 'center',
        height: hp(8),
        justifyContent: 'center',
        flexDirection: 'row',

    },
    button1_bottom: {
        height: '70%',
        width: wp(40),
        borderRadius: 5,
        elevation: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp(5)
    },
    button2_bottom: {
        height: '70%',
        width: wp(40),
        elevation: 5,
        borderRadius: 5,
        backgroundColor: mainColors.greenscolor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
