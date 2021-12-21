
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

import { TableList, TableMergeList } from '../object/Order'
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'

interface DialogGetTaleMerge_Food {
    TranSacTionID?: string;
    onShow: any
    LayoutID: any
    TableID: any;
    onSucessFull: any
}
export const DialogGetTaleMerge_Food = (props: DialogGetTaleMerge_Food) => {
    const { TranSacTionID, onShow, LayoutID, TableID, onSucessFull } = props
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
        onTakeAwayFood_onMenu, SplitTable_Logic } = DetailDesk_Logic(props)

    const [DataTableMer, setDataTableMer] = useState(new Array<TableMergeList>())
    const GetData = async () => {
        await onGetTableMerger_Logic(TranSacTionID);
    }
    const onSelectTable = (index: any) => {
        if (dataTableMerger[index].isActive) {
            dataTableMerger[index].isActive = false;
            setdataTableMerger([...dataTableMerger]);
            let Data = dataTableMerger.filter(x => x.isActive == true)
            let DataTable = dataTableMerger.filter(item => Data.includes(item))
            setDataTableMer(DataTable)
        }
        else {
            if ((dataTableMerger.length - DataTableMer.length) > 1) {
                dataTableMerger[index].isActive = true;
                setdataTableMerger([...dataTableMerger]);
                let Data = dataTableMerger.filter(x => x.isActive == true)
                let DataTable = dataTableMerger.filter(item => Data.includes(item))
                setDataTableMer(DataTable)
            }
        }

    }
    const onSplitTable = async () => {
        if (!lodash.isEmpty(DataTableMer)) {
            if (await SplitTable_Logic(TranSacTionID, DataTableMer)) {

                onSucessFull()
            }
        }
    }
    useEffect(() => {
        GetData()
        return () => { };
    }, []);
    const viewDataItemDesk = (item, index) => {
        const color = item.isActive == false ? 'white' : 'red'
        return (
            <View >
                <TouchableOpacity onPress={() => { onSelectTable(index) }}>
                    <View style={{ width: wp(30), height: wp(15), backgroundColor: color, margin: wp(1), alignItems: 'center', justifyContent: 'center', elevation: 5, borderRadius: 1 }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2.2) }}>{item.TableCaption}</Text>
                    </View>
                </TouchableOpacity>
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
                {!lodash.isEmpty(dataTableMerger) ?
                    <View style={styles.view_data}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            numColumns={3}
                            keyExtractor={(item, index) => 'key' + index}
                            data={dataTableMerger}
                            renderItem={({ item, index }) => (viewDataItemDesk(item, index))}
                        ></FlatList>
                    </View> : <View style={styles.view_data}></View>}
                <View style={styles.view_bottom}>
                    <TouchableOpacity onPressIn={() => { onShow() }} style={styles.button1_bottom}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => { onSplitTable() }} style={styles.button2_bottom}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Xác Nhận</Text>
                    </TouchableOpacity>
                </View>
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

        margin: 10,
        backgroundColor: mainColors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button2_bottom: {
        height: '85%',
        width: wp(30),
        elevation: 5,
        margin: 10,
        backgroundColor: mainColors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
