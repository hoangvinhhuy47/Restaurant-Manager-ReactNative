
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
import { GetArea_Logic } from '../../screens/homeScreen/home/GetArea_logic'
import { GetTable_Logic } from '../../screens/homeScreen/home/GetTable_Logic'
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import getDataByThing from '../../utils/getDataByThing';
import Toast from 'react-native-toast-message';

interface DialogTransferTable_Food {
    TranSacTionID?: string;
    onShow: any
    onSucessfull: any
    LayoutID: any
    TableID: any
}
export const DialogTransferTable_Food = (props: DialogTransferTable_Food) => {
    const { onShow, LayoutID, TableID, TranSacTionID, onSucessfull } = props
    const { data, onGetArea, setData } = GetArea_Logic(props)
    const { dataTable, onGetTable, setDataTable } = GetTable_Logic(props)
    const [DataTableListOnScreen, setDataTableListOnScreen] = useState(Array<TableList>())
    const { TransferTable_Logic } = DetailDesk_Logic(props)
    const GetData = async () => {
        await onGetArea(1);
        await onGetTable("");
    }
    const GetTable = async (ID: any) => {
        await onGetTable(ID);
    }

    const onSelectTable = async (TableID: string, index: any) => {
        if (await TransferTable_Logic(TranSacTionID, TableID)) {
            var today = new Date();
            onSucessfull(dataTable[index].LayoutID, dataTable[index].TableID, dataTable[index].Caption, getDataByThing.getDateTimeFormatToAPI(today))
        } else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Không Thành Công'
            });
        }
    }
    const onSelectArea = (index: any) => {
        for (var i = 0; i < data.length; i++) {
            if (i == index) {
                if (!data[i].Active) {
                    data[i].Active = true;
                    setDataTable([])
                    setDataTableListOnScreen([])
                    GetTable(data[i].LayoutID);
                }
            }
            else {
                data[i].Active = false;
            }
        }
        setData([...data])
    }
    const GetDataOnScreen = () => {

        let Data = dataTable.filter(x => x.Status == 1)
        let DataTable = dataTable.filter(item => Data.includes(item))
        setDataTableListOnScreen(DataTable)
    }
    useEffect(() => { viewdata() }, [DataTableListOnScreen])
    useEffect(() => { GetDataOnScreen() }, [dataTable])
    useEffect(() => {
        GetData()
        return () => { };
    }, []);
    const viewDataItemDesk = (item, index) => {
        return (
            <View >
                <TouchableOpacity onPress={() => { onSelectTable(item.TableID, index) }}>
                    <View style={{ width: wp(30), height: wp(14), backgroundColor: 'white', margin: wp(1), alignItems: 'center', justifyContent: 'center', elevation: 5, borderRadius: 2 }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2.2) }}>{item.Caption}</Text>
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
                numColumns={3}
                keyExtractor={(item, index) => 'key' + index}
                data={DataTableListOnScreen}
                renderItem={({ item, index }) => (viewDataItemDesk(item, index))}
            ></FlatList>
        )
    }
    const viewDataItemArea = (item, index) => {
        const color = item.Active == true ? 'white' : mainColors.smokecolor
        const colorText = item.Active == true ? 'white' : '#626262'
        const colorActive = item.Active == true ? 'white' : mainColors.greenscolor
        return (
            <View>
                <TouchableOpacity onPress={() => { onSelectArea(index) }}>
                    <View style={{ width: wp(30), height: hp(5), marginTop: 1, marginLeft: 2, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 2, borderBottomColor: colorActive }}>
                        <Text style={{ color: colorText, fontFamily: Fonts.Roboto_Stab_Bold, fontSize: hp(2.3) }}>{item.LayoutName}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    const viewArea = () => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item, index) => 'key' + index}
                data={data}
                renderItem={({ item, index }) => (viewDataItemArea(item, index))}
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
                {!lodash.isEmpty(data) ? <View style={{ height: hp(5.3), width: '100%', alignItems: 'center', backgroundColor: mainColors.greenscolor, justifyContent: 'center' }}>
                    {viewArea()}
                </View> : <View style={{ height: hp(5), width: '100%' }}></View>}

                {!lodash.isEmpty(DataTableListOnScreen) ?
                    <View style={styles.view_data}>
                        {viewdata()}
                    </View> : <View style={styles.view_data}></View>}

                <View style={styles.view_bottom}>
                    <TouchableOpacity onPressIn={() => { onShow() }} style={styles.button_cancel}>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Hủy</Text>
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
        height: hp(60),
        width: '100%',
        backgroundColor: '#E4E4E4',
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10
    },
    view_data: {
        width: '100%',
        height: hp(40),
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2
    },
    view_bottom: {
        width: wp(60),
        borderRadius: 5,
        height: hp(6),
        justifyContent: 'center',
        flexDirection: 'row',
    },
    button_cancel: {
        height: '95%',
        width: wp(50),
        borderRadius: 5,
        margin: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    button_accepct: {
        height: '85%',
        width: wp(30),
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 0.2,
        margin: 10,
        backgroundColor: mainColors.greenscolor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
