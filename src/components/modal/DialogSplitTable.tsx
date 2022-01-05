
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
import React, { useState, useEffect } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import lodash from 'lodash'
import { TableList, TableMergeList, Order, List } from '../object/Order'
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import Toast from 'react-native-toast-message';
interface DialogSplitTable {
    dataOrderList: Array<Order>
    onShow: any
    TransactionID: string;
    OrderID: string;
    onSuccesfull: any;
}
export const DialogSplitTable = (props: DialogSplitTable) => {
    const { onShow, dataOrderList, TransactionID, OrderID, onSuccesfull } = props
    const { onMergeOrder_Logic } = DetailDesk_Logic(props)
    const [dataOrderListScreen, setdataOrderListScreen] = useState(Array<Order>())
    const [ListText, setListText] = useState(Array<List>())
    const MergerOrder = async () => {
        let OrderIDMer = '';
        for (var i = 0; i < ListText.length; i++) {
            OrderIDMer = OrderIDMer + ListText[i].Text + ';';
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
        if (dataOrderListScreen[index].isActive == true) {
            dataOrderListScreen[index].isActive = false;
            setdataOrderListScreen([...dataOrderListScreen])
            for (var i = 0; i < ListText.length; i++) {
                if (ListText[i].Text == dataOrderListScreen[index].OrderID) {
                    ListText.splice(i, 1)
                    setListText(ListText)
                }
            }
        }
        else {
            dataOrderListScreen[index].isActive = true;
            const a = { Text: "" }
            a.Text = dataOrderListScreen[index].OrderID
            setdataOrderListScreen([...dataOrderListScreen])
            ListText.push(a)
            setListText(ListText)
        }
    }

    useEffect(() => {
        for (var i = 0; i < dataOrderList.length; i++) {
            dataOrderList[i].isActive = false
            setdataOrderListScreen(dataOrderList)
        }
        return () => { };
    }, []);
    const viewDataItemDesk = (item, index) => {
        return (
            <View >
                <TouchableOpacity onPress={() => { onSelectTable(index) }}>
                    <View style={{ width: wp(20), height: wp(20), backgroundColor: item.isActive ? 'white' : 'red', margin: 10, alignItems: 'center', justifyContent: 'center', elevation: 10, borderRadius: 5 }}>
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
                <Text style={{ fontSize: hp(2.5), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor, marginTop: 5 }}>Danh Sách Hóa Đơn</Text>
                <View style={{ width: '100%', height: 3, backgroundColor: mainColors.greenscolor, marginTop: 5 }}></View>
                {!lodash.isEmpty(dataOrderListScreen) ?
                    <View style={styles.view_data}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            numColumns={3}
                            keyExtractor={(item, index) => 'key' + index}
                            data={dataOrderListScreen}
                            renderItem={({ item, index }) => (viewDataItemDesk(item, index))}
                        ></FlatList>
                    </View> : <View style={styles.view_data}></View>}
                <View style={styles.view_bottom}>
                    <TouchableOpacity onPressIn={() => { onShow() }} style={styles.button_cancel}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => { MergerOrder() }} style={styles.button_accept}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor }}>Xác Nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Toast position='top' autoHide={true} topOffset={0} />
        </View>
  
    </KeyboardAvoidingView >
};
const styles = StyleSheet.create({

    container: {
        height: hp(50),
        width: '100%',
        backgroundColor: '#E4E4E4',
        borderRadius: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    view_data: {
        width: '90%',
        marginTop: 10,
        height: hp(35),
        alignItems: 'center'
    },
    view_bottom: {
        width: wp(60),
        borderRadius: 5,
        height: hp(6),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    button_cancel: {
        height: '100%',
        width: wp(35),
        elevation: 5,
        borderColor: 'white',
        borderWidth: 0.2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    button_accept: {
        height: '100%',
        width: wp(35),
        elevation: 5,
        borderColor: 'white',
        borderWidth: 0.2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    }
})
