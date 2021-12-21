
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
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import Ripple from 'react-native-material-ripple';

import React, { useState, useEffect } from 'react';
import { DisCount, SendToSingeFood, TakeFoodAway, CancelTakeAway, WarringIC, Note, Delete, TurnDowwn, Minus, Plus } from '../../assets/index';
import ModalDropdown from 'react-native-modal-dropdown';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';

import lodash from 'lodash'
import getDataByThing from '../../utils/getDataByThing';

import { Checkbox, RadioButton } from 'react-native-paper';
import { TextInputCustom } from '../userComponents';

import { TableList, TableMergeList, Order, List, OrderDetailList, } from '../object/Order'
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import { DialogSendFoodToTable } from './DialogSendFoodToTable';
import { DialogSendFoodToOrder } from './DialogSendFoodToOrder';
interface DialogSendFoodTo {
    dataOrderdetail: Array<OrderDetailList>
    dataOrderList: Array<Order>
    onShow: any
    TransactionID: string;
    OrderID: string;
    onSuccesfull: any;
    LayoutID: string
}
export const DialogSendFoodTo = (props: DialogSendFoodTo) => {
    const { onShow, dataOrderdetail, TransactionID, OrderID, onSuccesfull, LayoutID, dataOrderList } = props
    const [data, setdata] = useState([])
    const [dataSend, setDataSend] = useState([])
    const [VisibleToTable, setVisibleToTable] = useState(false)
    const [VisibleToOrder, setVisibleToOrder] = useState(false)
    const onSelectFoodTo = (index: any) => {
        data[index].isActive = !data[index].isActive
        setdata([...data]);
        let Data = data.filter(x => x.isActive == true)
        let DataItemFood = data.filter(item => Data.includes(item))
        setDataSend(DataItemFood)
    }

    const onSendTo = (Type: boolean) => {
        if (!lodash.isEmpty(dataSend)) {
            if (Type) {
                setVisibleToTable(true)
            }
            else {
                setVisibleToOrder(true)
            }
        }
    }
    useEffect(() => {
        viewdata()
    }, [data])
    useEffect(() => {
        setdata([])
        for (var i = 0; i < dataOrderdetail.length; i++) {
            dataOrderdetail[i].isActive = false;
        }
        let _temp = JSON.parse(JSON.stringify(dataOrderdetail))
        console.log(_temp)
        setdata(_temp)
        return () => { };
    }, []);

    const onChangeQuantityItem = (index: number, Type: boolean) => {
        if (Type) {
            if (data[index].Quantity < data[index].QuantityOrg) {
                data[index].Quantity = data[index].Quantity + 1;
                setdata([...data])
            }
        }
        else {
            if (data[index].Quantity > 1) {
                data[index].Quantity = data[index].Quantity - 1;
                setdata([...data])
            }
        }

    }

    const viewDataItemDesk = (item, index) => {
        return (
            <View >
                <TouchableOpacity onPress={() => { onSelectFoodTo(index) }}>
                    <View style={{ paddingLeft: 5, width: wp(47), height: wp(15), backgroundColor: item.isActive == false ? 'white' : 'red', margin: 2, alignItems: 'flex-start', justifyContent: 'center', borderRadius: 2, elevation: 2 }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2) }}>{(index + 1).toString()}. {item.FoodName.toString()}</Text>
                    </View>
                    <View style={{ width: wp(47), height: 35, flexDirection: 'row', elevation: 2, backgroundColor: 'white' }}>
                        <View style={{ height: 35, width: '100%', backgroundColor: 'white', borderRadius: 2, elevation: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity style={{ height: 30, width: hp(4), alignItems: 'center', justifyContent: 'center' }} onPress={() => { onChangeQuantityItem(index, false) }}>
                                <Image source={Minus} style={{ height: 15, width: 15 }}></Image>
                            </TouchableOpacity>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 15, color: 'black' }}>{item.Quantity.toString()}</Text>
                            <TouchableOpacity style={{ height: 30, width: hp(4), alignItems: 'center', justifyContent: 'center' }} onPress={() => { onChangeQuantityItem(index, true) }}>
                                <Image source={Plus} style={{ height: 15, width: 15 }}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    const viewdata = () => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item, index) => 'key' + index}
                data={data}
                renderItem={({ item, index }) => (viewDataItemDesk(item, index))}
            ></FlatList>
        )
    }
    return <KeyboardAvoidingView
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
                    <Text style={styles.headerTitle}>Danh Sách Bàn</Text>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onShow() }}>
                        <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                    </TouchableOpacity>
                </View>
                {!lodash.isEmpty(data) ?
                    <View style={styles.view_data}>
                        {viewdata()}
                    </View> : <View style={styles.view_data}></View>}
                <View style={styles.view_bottom}>
                    <TouchableOpacity onPressIn={() => { onShow() }} style={styles.button1_bottom}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => { onSendTo(false) }} style={styles.button2_bottom}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'white', textAlign: 'center' }}>Chuyển Đến HĐ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => { onSendTo(true) }} style={styles.button3_bottom}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'white', textAlign: 'center' }}>Chuyển Đến Bàn</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType='slide'
                transparent
                visible={VisibleToTable}
                presentationStyle='formSheet'
                style={{ justifyContent: 'flex-end', margin: 0 }}
                onDismiss={() => { setVisibleToTable(false) }}
            >
                <DialogSendFoodToTable
                    onSuccessfull={onSuccesfull}
                    OrderID={OrderID}
                    dataOrderDetailSend={dataSend}
                    TransactionID={TransactionID}
                    onShow={() => { setVisibleToTable(false); }}
                    LayoutID={LayoutID}
                ></DialogSendFoodToTable>
            </Modal>
            {/* DialogSendFoodToOrder */}
            <Modal
                animationType='slide'
                transparent
                visible={VisibleToOrder}
                presentationStyle='formSheet'
                style={{ justifyContent: 'flex-end', margin: 0 }}
                onDismiss={() => { setVisibleToOrder(false) }}
            >
                <DialogSendFoodToOrder
                    OrderID={OrderID}
                    onSuccessfull={onSuccesfull}
                    dataOrderDetailSend={dataSend}
                    dataOrderlist={dataOrderList}
                    onShow={() => { setVisibleToOrder(false); }}
                    LayoutID={LayoutID}
                ></DialogSendFoodToOrder>
            </Modal>
        </View>
    </KeyboardAvoidingView >
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
        fontFamily: Fonts.Roboto_Slab_Regular
    },
    container: {
        height: hp(55),
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    view_data: {
        width: '100%',
        marginTop: 5,
        height: hp(38),
        alignItems: 'center',
        elevation: 2,
        backgroundColor: 'white'
    },
    view_bottom: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        width: '100%',
        borderRadius: 5,
        height: hp(6),
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    button1_bottom: {
        height: '100%',
        width: wp(30),
        elevation: 5,

        backgroundColor: mainColors.smokecolor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    button2_bottom: {
        elevation: 5,
        height: '100%',
        width: wp(30),

        backgroundColor: mainColors.greenscolor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,

    },
    button3_bottom: {
        height: '100%',
        width: wp(30),
        elevation: 5,

        backgroundColor: mainColors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    }
})
