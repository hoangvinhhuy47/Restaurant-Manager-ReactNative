import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
    FlatList,

} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { EXITICON, TurnDowwn } from '../../assets/index';
import { Fonts, mainColors } from '../../constants';
import { Button, Card, Searchbar, IconButton, TextInput, Checkbox } from 'react-native-paper';
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import getDataByThing, { } from '../../utils/getDataByThing'
import Toast from 'react-native-toast-message';
// import { CustomKeyBoard } from '../Keyboard/CustomKeyboard'
interface DialogDiscountDetaill_Food {

    onPressClose?: any;
    OrderDetailID: string;
    OrderID: string;
    Price: number;
    onSucessfull: any;
}

export const DialogDiscountDetaill_Food = (props: DialogDiscountDetaill_Food) => {
    const { onPressClose, OrderDetailID, OrderID, Price, onSucessfull } = props;
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
    // const { onDisCountFood } = DiscountFood_Logic(props);
    const [Check, setCheck] = useState(false);
    const [DiscountType, setDiscountType] = useState(1)
    const [DiscountValue, setDiscountValue] = useState('')
    let data = [{ key: 1, text: 10, }, { key: 2, text: 20 }, { key: 3, text: 30 }, { key: 4, text: 40 }, { key: 5, text: 50 }, { key: 6, text: 60 }, { key: 7, text: 70 }, { key: 8, text: 80 }, { key: 9, text: 90 }, { key: 10, text: 100 }]
    let dataprice = [{ key: 1, text: 10000, },
    { key: 2, text: 20000 }, { key: 3, text: 30000 }, { key: 4, text: 40000 },
    { key: 5, text: 50000 }, { key: 6, text: 60000 }, { key: 7, text: 70000 },
    { key: 8, text: 80000 }, { key: 9, text: 90000 }, { key: 10, text: 100000 }]
    const onChangeValuePercent = (value: any) => {
        let newText = '';
        let numbers = '0123456789';
        if (!!value) {
            for (var i = 0; i < value.length; i++) {
                if (numbers.indexOf(value[i]) > -1) {
                    newText = newText + value[i];
                }
            }

            if (newText != '') {
                if (Number.parseInt(newText) >= 0 && Number.parseInt(newText) <= 100) {
                    setDiscountValue(newText)
                }
                else {
                    setDiscountValue('')
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: 'Giá Trị từ 0 đến 100'
                    });
                }
            }
        }
        else {
            setDiscountValue('')
        }
    };
    const onChangeValueMoney = (value: any) => {
        let newText = '';
        let numbers = '0123456789';
        if (!!value) {
            for (var i = 0; i < value.length; i++) {
                if (numbers.indexOf(value[i]) > -1) {
                    newText = newText + value[i];
                }
            }
            setDiscountValue(newText)
        }
        else {
            setDiscountValue(value)
        }

    };
    const onSelectType = () => {
        setDiscountValue('')
        if (Check == true) {
            setCheck(false)
            setDiscountType(1)
        }
        else {
            setCheck(true)
            setDiscountType(2)
        }

    }
    const onSetDiscound = (value: any) => {
        if (Check) {
            if (value <= Price) {
                setDiscountValue(value)
            }
            else {
                setDiscountValue('')
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Giá Trị Không Thể Lớn Hơn Tiền Gốc'
                });

            }
        }
        else {
            setDiscountValue(value)
        }
    }
    const onDissCount = async () => {
        if (await onDisCountFood_Logic(OrderID, OrderDetailID, DiscountType, Number.parseInt(DiscountValue))) {
            onSucessfull()
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Không Thành Công'
            });

        }

    }

    useEffect(() => {
        ViewData()
    }, [DiscountValue])
    const onBlurTextPrice = () => {
        if (DiscountValue != '' && Number.parseInt(DiscountValue) > Price) {
            setDiscountValue('')
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Giá Trị Không Thể Lớn Hơn Tiền Gốc'
            });

        }
    }
    const ViewData = () => {
        return (
            <View style={{ width: '100%', height: hp(30), backgroundColor: 'white' }}>
                <View style={{ height: hp(8), width: '100%', elevation: 1 }}>
                    <FlatList
                        data={!Check ? data : dataprice}
                        horizontal
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => { onSetDiscound(item.text) }} style={{ height: hp(7), width: wp(30), marginLeft: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: 'white', elevation: 2 }}>
                                <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), }}>{!Check ? item.text + '%' : getDataByThing.getcurrency(item.text) + 'đ'}</Text>
                            </TouchableOpacity>}
                    ></FlatList>
                </View>
                <View style={{ width: '100%', height: hp(10), paddingLeft: 10, paddingRight: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1, backgroundColor: 'white' }}>
                    {Platform.select({
                        ios: (
                            <Checkbox.Item mode='ios' position={'leading'} onPress={() => { onSelectType() }} labelStyle={{ fontSize: hp(2) }} status={Check != true ? 'checked' : 'unchecked'} label={'Giảm %'} ></Checkbox.Item>
                        ),
                        android: <Checkbox.Item mode='android' position={'leading'} onPress={() => { onSelectType() }} labelStyle={{ fontSize: hp(2) }} status={Check != true ? 'checked' : 'unchecked'} label={'Giảm %'} ></Checkbox.Item>

                    })}
                    {Check == true ? <View></View> : <TextInput
                        keyboardType={'number-pad'}
                        maxLength={3}
                        mode={'outlined'}
                        style={{ height: hp(6), backgroundColor: 'white',  paddingVertical: 0, width: '60%', fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2) }}
                        onChangeText={onChangeValuePercent}
                        value={DiscountValue.toString()}
                        placeholder={'Giảm Giá Theo%'}
                    ></TextInput>}
                </View>
                <View style={{ width: '100%', height: hp(10), paddingLeft: 10, paddingRight: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1, backgroundColor: 'white', marginTop: 5 }}>
                    {Platform.select({
                        ios: (
                            <Checkbox.Item mode='ios' position={'leading'} onPress={() => { onSelectType() }} labelStyle={{ fontSize: hp(2) }} status={Check == true ? 'checked' : 'unchecked'} label={'Giảm Tiền'} ></Checkbox.Item>
                        ),
                        android: <Checkbox.Item mode='android' position={'leading'} onPress={() => { onSelectType() }} labelStyle={{ fontSize: hp(2) }} status={Check == true ? 'checked' : 'unchecked'} label={'Giảm Tiền'} ></Checkbox.Item>

                    })}
                    {Check == false ? <View></View> : <TextInput
                        mode={'outlined'}
                        placeholder={'Giảm Giá Theo Số Tiền'}
                        keyboardType={'number-pad'}
                        style={{ height: hp(6), backgroundColor: 'white', width: '60%', fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2) }}
                        onChangeText={onChangeValueMoney}
                        onBlur={() => onBlurTextPrice()}
                        onFocus={() => { }}
                        value={DiscountValue.toString()}
                    ></TextInput>}
                </View>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={{
                height: hp(100),
                width: wp(100),
                alignItems: 'flex-end',
                justifyContent: 'center',
            }}>
            <View style={{
                alignItems: 'center',
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            
                <View style={styles.container}>
                    <View style={[styles.headerView]}>
                        <Text style={styles.headerTitle}>Giảm Giá Theo Món Ăn</Text>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onPressClose() }}>
                            <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                        </TouchableOpacity>
                    </View>
                    {ViewData()}
                    <View style={styles.view_bottom}>

                        <TouchableOpacity onPressIn={() => { onDissCount() }} style={styles.button2_bottom}>
                            <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.whiteColor }}>Xác Nhận</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <Toast position='top' autoHide={true} topOffset={0} />
            </View>
        
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: { width: '100%', height: hp(45), backgroundColor: 'white', borderTopLeftRadius: 15, borderTopRightRadius: 15, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
    containerItem: {
        backgroundColor: '#FFF',
        borderRadius: 2,
    },
    view_bottom: {
        width: wp(100),
        height: hp(8),
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: mainColors.whiteColor
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
    button1_bottom: {
        height: '65%',
        width: wp(35),
        borderRadius: 5,
        backgroundColor: mainColors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        elevation: 5
    },
    button2_bottom: {
        borderRadius: 5,
        height: '70%',
        width: wp(40),
        backgroundColor: mainColors.greenscolor,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        elevation: 5
    }

});

