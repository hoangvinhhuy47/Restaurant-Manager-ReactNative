
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
import Ripple from 'react-native-material-ripple';

import React, { useState, useEffect } from 'react';
import { DisCount, SendToSingeFood, TakeFoodAway, CancelTakeAway, WarringIC, Note, Delete, TurnDowwn } from '../../assets/index';
import ModalDropdown from 'react-native-modal-dropdown';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';

import lodash from 'lodash'

import { TableList, TableMergeList } from '../object/Order'
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import Toast from 'react-native-toast-message';

interface DialogTableMerge_Food {
    TranSacTionID?: string;
    onShow: any
    LayoutID: any
    TableID: any;
    onSucessFull
}
export const DialogTableMerge_Food = (props: DialogTableMerge_Food) => {
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
        onTakeAwayFood_onMenu } = DetailDesk_Logic(props)

    const [DataTableMer, setDataTableMer] = useState(new Array<TableMergeList>())
    const [DataTableScreen, setDataTableScreen] = useState(new Array<TableList>())
    const GetData = async () => {
        await onGetTableToMer_Logic(LayoutID);
    }
    const MerGerTable = async (TablelistMer: Array<TableMergeList>) => {
        if (DataTableMer != null || DataTableMer.length != 0) {
            if (await onMergeTable_Logic(TranSacTionID, TablelistMer)) {
                onSucessFull()
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Không Thành Công'
                });
            }
        }
        else {
            onShow()
        }

    }
    const onSelectTable = (index: any) => {
        if (DataTableScreen[index].Status == 0) {
            DataTableScreen[index].Status = 1;
            setDataTableScreen([...DataTableScreen])
            const dataMer = {
                TableMergeID: "",
                TransactionID: TranSacTionID,
                TableID: "",
                TableCaption: "",
            }
            dataMer.TableMergeID = "00000000-0000-0000-0000-000000000000";
            dataMer.TableCaption = DataTableScreen[index].Caption;
            dataMer.TransactionID = TranSacTionID;
            dataMer.TableID = DataTableScreen[index].TableID;
            DataTableMer.push(dataMer)
            setDataTableMer(DataTableMer)
        }
        else {
            DataTableScreen[index].Status = 0;
            setDataTableScreen([...DataTableScreen])
            try {
                for (var i = 0; i < DataTableMer.length; i++) {
                    if (DataTableScreen[index].TableID == DataTableMer[i].TableID) {
                        DataTableMer.splice(i, 1)
                        setDataTableMer(DataTableMer)
                        break;
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    const GetDataOnScreen = () => {
        for (var i = 0; i < dataTableMer.length; i++) {
            if (dataTableMer[i].Status == 1 && dataTableMer[i].TableID != TableID) {
                const data = {
                    LayoutID: "",
                    TableID: "",
                    Caption: "",
                    LocationX: 1,
                    LocationY: 1,
                    Status: 0,
                    OpenTime: "",
                    TransactionID: "",
                    SortOrder: 1,
                    isMerge: true,
                };
                data.Caption = dataTableMer[i].Caption;
                data.TableID = dataTableMer[i].TableID;
                data.Status = 0;
                data.TransactionID = dataTableMer[i].TransactionID;
                DataTableScreen.push(data)
                setDataTableScreen([...DataTableScreen])
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
        return (
            <View >
                <TouchableOpacity onPress={() => { onSelectTable(index) }}>
                    <View style={{ width: wp(30), height: wp(15), backgroundColor: item.Status == 0 ? 'white' : 'red', margin: 2, alignItems: 'center', justifyContent: 'center', elevation: 1, borderRadius: 2 }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2.2) }}>{item.Caption}</Text>
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
                <View style={[styles.headerView]}>
                    <Text style={styles.headerTitle}>Danh Sách Bàn</Text>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onShow() }}>
                        <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                    </TouchableOpacity>
                </View>
                {!lodash.isEmpty(DataTableScreen) ?
                    <View style={styles.view_data}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            numColumns={3}
                            keyExtractor={(item, index) => 'key' + index}
                            data={DataTableScreen}
                            renderItem={({ item, index }) => (viewDataItemDesk(item, index))}
                        ></FlatList>
                    </View> : <View style={styles.view_data}></View>}
                <View style={styles.view_bottom}>

                    <TouchableOpacity onPressIn={() => { MerGerTable(DataTableMer) }} style={styles.button_accpect}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.whiteColor }}>Xác Nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Toast position='top' autoHide={true} topOffset={0} />
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
        backgroundColor: '#E4E4E4',
        borderRadius: 3,
        flexDirection: 'column',
        justifyContent: 'flex-start',

    },
    view_data: {
        width: '100%',
        height: hp(42),
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2
    },
    view_bottom: {
        width: wp(100),
        borderRadius: 5,
        height: hp(6),
        justifyContent: 'center',
        flexDirection: 'row',

    },
    button_cancel: {
        height: '85%',
        width: wp(40),
        borderRadius: 5,
        margin: 10,
        elevation: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_accpect: {
        height: '85%',
        width: wp(40),
        borderColor: 'white',
        elevation: 5,
        borderRadius: 5,
        margin: 10,
        backgroundColor: mainColors.greenscolor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
