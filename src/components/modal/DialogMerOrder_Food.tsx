
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
import { DisCount, SendToSingeFood, TakeFoodAway, CancelTakeAway, WarringIC, Note, Delete, TurnDowwn } from '../../assets/index';
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

import { TableList, TableMergeList, Order, List } from '../object/Order'
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import Toast from 'react-native-toast-message';
interface DialogOrderMerge_Food {
    dataOrderList: Array<Order>
    onShow: any
    TransactionID: string;
    OrderID: string;
    onSuccesfull: any


}
export const DialogOrderMerge_Food = (props: DialogOrderMerge_Food) => {
    const { onShow, dataOrderList, TransactionID, OrderID, onSuccesfull } = props
    const { onMergeOrder_Logic } = DetailDesk_Logic(props)
    const [data, setdata] = useState(Array<Order>())
    const [list, setList] = useState(Array<List>())
    const MergerOrder = async () => {
        let OrderIDMer = '';
        for (var i = 0; i < list.length; i++) {
            OrderIDMer = OrderIDMer + list[i].Text + ';';
        }
        if (OrderIDMer != '') {
            if (await onMergeOrder_Logic(TransactionID, OrderID, OrderIDMer)) {
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


    }
    const onSelectTable = (index: any) => {
        if (data[index].isActive == true) {
            data[index].isActive = false;
            setdata([...data])
            for (var i = 0; i < list.length; i++) {
                if (list[i].Text == data[index].OrderID) {
                    list.splice(i, 1)
                    setList(list)
                }
            }
        }
        else {
            data[index].isActive = true;
            const a = { Text: "" }
            a.Text = data[index].OrderID
            setdata([...data])
            list.push(a)
            setList(list)
        }
    }

    useEffect(() => {
        for (var i = 0; i < dataOrderList.length; i++) {
            dataOrderList[i].isActive = false
            if (dataOrderList[i].OrderID != OrderID) {
                data.push(dataOrderList[i])
                setdata([...data])
            }

        }
        return () => { };
    }, []);

    const viewDataItemDesk = (item, index) => {
        return (
            <View >
                <TouchableOpacity onPress={() => { onSelectTable(index) }}>
                    <View style={{ width: wp(30), height: wp(18), backgroundColor: !item.isActive ? 'white' : 'red', margin: 5, alignItems: 'center', justifyContent: 'center', elevation: 2, borderRadius: 5 }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2.2) }}>HĐ.{item.OrderNumber.toString()}</Text>
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
                    <Text style={styles.headerTitle}>Danh Sách Hóa Đơn</Text>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onShow() }}>
                        <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                    </TouchableOpacity>
                </View>
                {!lodash.isEmpty(data) ?
                    <View style={styles.view_data}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            numColumns={3}
                            keyExtractor={(item, index) => 'key' + index}
                            data={data}
                            renderItem={({ item, index }) => (viewDataItemDesk(item, index))}
                        ></FlatList>
                    </View> : <View style={styles.view_data}></View>}
                <View style={styles.view_bottom}>
                    <TouchableOpacity onPressIn={() => { onShow() }} style={styles.button1_bottom}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => { MergerOrder() }} style={styles.button2_bottom}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Xác Nhận</Text>
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
        height: hp(50),
        width: '100%',
        backgroundColor: '#E4E4E4',
        borderRadius: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    view_data: {
        width: '100%',

        height: hp(35),
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2
    },
    view_bottom: {
        width: wp(60),
        borderRadius: 5,
        height: hp(7),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    button1_bottom: {
        height: '80%',
        width: wp(40),
        elevation: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 5
    },
    button2_bottom: {
        height: '80%',
        width: wp(40),
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5
    }
})
