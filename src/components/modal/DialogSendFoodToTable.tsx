
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
import { DisCount, SendToSingeFood, TakeFoodAway, CancelTakeAway, WarringIC, Note, Delete } from '../../assets/index';
import ModalDropdown from 'react-native-modal-dropdown';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';

import lodash from 'lodash'

import { TableList, TableMergeList, OrderDetailList } from '../object/Order'
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import Toast from 'react-native-toast-message';

interface DialogSendFoodToTable {
    TransactionID: string
    onShow: any
    LayoutID: string
    dataOrderDetailSend: Array<OrderDetailList>;
    OrderID: string;
    onSuccessfull: any
}
export const DialogSendFoodToTable = (props: DialogSendFoodToTable) => {
    const { onShow, LayoutID, TransactionID, dataOrderDetailSend, OrderID, onSuccessfull } = props
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
        onTakeAwayFood_onMenu,
        TransferFoodToTable_Logic,
        TransferFoodToOrder_Logic } = DetailDesk_Logic(props)

    const [DataTableScreen, setDataTableScreen] = useState(new Array<TableList>())
    const [TableIDSend, setTableIDSend] = useState('')
    const GetData = async () => {
        await onGetTableToMer_Logic(LayoutID);
    }

    const onSelectTable = (index: any) => {
        for (var i = 0; i < DataTableScreen.length; i++) {
            if (i == index) {
                if (DataTableScreen[i].isMerge == true) {
                    DataTableScreen[i].isMerge = false;
                    setDataTableScreen([...DataTableScreen])
                }
                else {
                    setTableIDSend(DataTableScreen[i].TableID)
                    DataTableScreen[i].isMerge = true;
                    setDataTableScreen([...DataTableScreen])
                }
            }
            else {
                DataTableScreen[i].isMerge = false;
                setDataTableScreen([...DataTableScreen])
            }
        }
    }
    const onSendFoodToTable = async () => {
        if (TableIDSend != '') {
            if (await TransferFoodToTable_Logic(OrderID, dataOrderDetailSend, TableIDSend)) {
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
    const GetDataOnScreen = () => {
        for (var i = 0; i < dataTableMer.length; i++) {
            if (dataTableMer[i].Status == 2 && dataTableMer[i].TransactionID != TransactionID) {
                DataTableScreen.push(dataTableMer[i])
                setDataTableScreen([...DataTableScreen]);
            }
        }
    }
    useEffect(() => {
        GetDataOnScreen()
    }, [dataTableMer])

    useEffect(() => {
        GetData()
        return () => { };
    }, []);
    const viewDataItemDesk = (item, index) => {
        const color = item.isMerge == false ? 'white' : 'red'
        return (
            <View >
                <TouchableOpacity onPress={() => { onSelectTable(index) }}>
                    <View style={{ width: wp(30), height: wp(15), backgroundColor: color, margin: wp(1), alignItems: 'center', justifyContent: 'center', elevation: 5, borderRadius: 1 }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2.2) }}>{item.Caption}</Text>
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
                    data={DataTableScreen}
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
                    <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.whiteColor, marginTop: 5 }}>Danh Sách Bàn</Text>
                </View>
                <View style={{ width: '100%', height: 3, backgroundColor: mainColors.greenscolor, marginTop: 5 }}></View>
                {!lodash.isEmpty(DataTableScreen) ?
                    viewData() : <View style={styles.view_data}></View>}
                <View style={styles.view_bottom}>
                    <TouchableOpacity onPressIn={() => { onShow() }} style={styles.button1_bottom}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => { onSendFoodToTable() }} style={styles.button2_bottom}>
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
