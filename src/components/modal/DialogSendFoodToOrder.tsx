
import { BackgroundBigScreen } from '../backgroundScreen/backgroundBigScreen/BackgroundBigScreen.view';
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
import { DisCount, SendToSingeFood, TakeFoodAway, CancelTakeAway, WarringIC, Note, Delete } from '../../assets/index';
import ModalDropdown from 'react-native-modal-dropdown';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';

import lodash from 'lodash'

import { OrderDetailList, TableList, TableMergeList, Order } from '../object/Order'
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import Toast from 'react-native-toast-message';

interface DialogSendFoodToOrder {
    dataOrderlist: Array<Order>
    onShow: any
    LayoutID: string
    dataOrderDetailSend: Array<OrderDetailList>;
    onSuccessfull: any
    OrderID: string;
}
export const DialogSendFoodToOrder = (props: DialogSendFoodToOrder) => {
    const { onShow, LayoutID, dataOrderlist, OrderID, dataOrderDetailSend, onSuccessfull } = props
    const { onGetTable_Logic,
        dataOrderList, dataOrder, dataOrderDetail, setdataOrder,
        setdataOrderDetail, setdataOrderList, Type, setType,
        dataGroups, setdataGroups,
        dataCommentFood, setdataCommentFood,
        dataFoodList, setdataFoodList,
        dataTableMerger, setdataTableMerger,
        dataTableMer, setdataTableMer,
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
        onTakeAwayFood_onMenu, TransferFoodToOrder_Logic } = DetailDesk_Logic(props)
    const [DataOrderonScreen, setDataOrderonScreen] = useState([])
    const [OrderIDTo, setOrderIDTo] = useState('')
    const onSelectOrder = (index: any) => {
        for (var i = 0; i < DataOrderonScreen.length; i++) {
            if (i == index) {
                if (DataOrderonScreen[i].isActive) {
                    DataOrderonScreen[i].isActive = false;
                    setDataOrderonScreen([...DataOrderonScreen])
                    setOrderIDTo('')
                }
                else {
                    DataOrderonScreen[i].isActive = true;
                    setDataOrderonScreen([...DataOrderonScreen])
                    setOrderIDTo(DataOrderonScreen[i].OrderID)
                }
            }
            else {
                DataOrderonScreen[i].isActive = false;
                setDataOrderonScreen([...DataOrderonScreen])
            }
        }
    }
    const onSendFoodToOrder = async () => {
        if (OrderIDTo != '') {
            if (await TransferFoodToOrder_Logic(OrderID, dataOrderDetailSend, OrderIDTo)) {
                onShow()
                onSuccessfull()
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Không Thành Công'
                });
            }
        }
    }
    useEffect(() => {
        for (var i = 0; i < dataOrderlist.length; i++) {
            dataOrderlist[i].isActive = false
        }
        let _temp = JSON.parse(JSON.stringify(dataOrderlist.filter(item => item.OrderID != OrderID)))
        setDataOrderonScreen(_temp)
        return () => { };
    }, []);
    const viewDataItemDesk = (item, index) => {
        const color = item.isActive == false ? 'white' : 'red'
        return (
            <View >
                <TouchableOpacity onPress={() => { onSelectOrder(index) }}>
                    <View style={{ width: wp(30), height: wp(15), backgroundColor: color, margin: wp(1), alignItems: 'center', justifyContent: 'center', elevation: 5, borderRadius: 1 }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2.2) }}>HĐ.{item.OrderNumber}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    const viewData = () => {
        return (
            <View style={styles.view_data}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    numColumns={3}
                    keyExtractor={(item, index) => 'key' + index}
                    data={DataOrderonScreen}
                    renderItem={({ item, index }) => (viewDataItemDesk(item, index))}
                ></FlatList>
            </View>
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
                <View style={{ width: '100%', height: hp(5), backgroundColor: mainColors.greenscolor, paddingLeft: 5 }}>
                    <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.whiteColor, marginTop: 5 }}>Danh Sách Hóa Đơn</Text>
                </View>
                <View style={{ width: '100%', height: 3, backgroundColor: mainColors.greenscolor, marginTop: 5 }}></View>
                <View style={styles.view_data}>
                    {viewData()}
                </View>
                <View style={styles.view_bottom}>
                    <TouchableOpacity onPressIn={() => { onShow() }} style={styles.button1_bottom}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => { onSendFoodToOrder() }} style={styles.button2_bottom}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Xác Nhận</Text>
                    </TouchableOpacity>
                </View>
                <Toast position='top' autoHide={true} topOffset={0} />
            </View>
        </View>
    </KeyboardAvoidingView >
};
const styles = StyleSheet.create({

    container: {
        height: hp(45),
        width: '100%',
        backgroundColor: '#E4E4E4',
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    view_data: {
        width: '100%',
        marginTop: 10,
        height: hp(30),
        alignItems: 'center'
    },
    view_bottom: {
        width: wp(60),
        borderRadius: 5,
        height: hp(6),
        justifyContent: 'center',
        flexDirection: 'row',

    },
    button1_bottom: {
        height: '85%',
        width: wp(35),
        elevation: 5,
        margin: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button2_bottom: {
        elevation: 5,
        height: '85%',
        width: wp(35),
        margin: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
