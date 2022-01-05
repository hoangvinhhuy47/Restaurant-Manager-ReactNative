
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
import { DisCount, SendToSingeFood, TakeFoodAway, CancelTakeAway, WarringIC, Note, Delete, TurnDowwn, Clock } from '../../assets/index';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import { DialogDiscountDetaill_Food } from './DialogDiscountDetaill_Food';
import { DialogCommentFood } from './DialogCommentFood';
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import { DialogExtendAndStopHour } from './DialogExtendAndStopHour';
import Toast from 'react-native-toast-message';
interface DialogDetail_Food {
    onShow: any
    OrderID: string;
    OrderDetailID: string;
    FoodID: string;
    onSucessfull: any;
    Status: number;
    Price: number;
    isTakeAway: boolean
    StausOrder: number;
    Caption: string;
    FoodCode: string;
    IsPast: boolean
    // "RES0030"
}
export const DialogDetail_Food = (props: DialogDetail_Food) => {
    const { onShow, OrderID, OrderDetailID, FoodID, onSucessfull, Status, Price, isTakeAway, StausOrder, Caption, FoodCode, IsPast } = props
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
        onTakeAwayFood_onMenu, CancelTakeAwayFood_Logic } = DetailDesk_Logic(props)

    const [Visible1, setVisible1] = useState(false)
    const [Visible, setVisible] = useState(false)
    const [VisibleTimeAdd, setVisibleTimeAdd] = useState(false)
    const RemoveFood = async () => {
        if (Status == 1 || Status == 2 || Status == 5) {
            if (await onRemoveFood_Logic(OrderID, OrderDetailID)) {
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
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Món Đã Được Tiến Hành Không Thể Xóa'
            });

        }
    }
    const onSendToSinge_Detail = async () => {
        if (await onSendToSinge_Logic(OrderID, OrderDetailID)) {
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
    const onTakeAway_Detail = async () => {
        if (await onTakeAwayFood_onMenu(OrderID, OrderDetailID)) {
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
    const onCancelTakeAwayFood_Detail = async () => {
        if (isTakeAway) {
            if (await CancelTakeAwayFood_Logic(OrderID, OrderDetailID)) {
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
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Không Thành Công'
            });
        }
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

                <View style={{
                    width: '100%', height: hp(6), alignItems: 'center', justifyContent: 'space-between', backgroundColor: mainColors.greenscolor, elevation: 5, borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    flexDirection: 'row',
                    paddingLeft: 10,
                    paddingRight: 10
                }}>
                    <Text style={{
                        fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.whiteColor, fontSize: hp(2.5)
                    }}>Tùy Chọn</Text>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onShow() }}>
                        <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.main}>
                    <TouchableOpacity
                        onPress={() => { StausOrder != 3 ? setVisible1(true) : {} }}
                        style={styles.main_item}>
                        <Image source={DisCount} style={{ height: '50%', width: '90%', borderRadius: 0, resizeMode: 'contain' }}></Image>
                        <Text style={{ color: '#FC0505', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular }}>Giảm Giá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { StausOrder != 3 ? onTakeAway_Detail() : {} }}
                        style={styles.main_item}>
                        <Image source={TakeFoodAway} style={{ height: '50%', width: '90%', borderRadius: 0, resizeMode: 'contain' }}></Image>
                        <Text style={{ color: 'black', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular }}>Mang Về</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { StausOrder != 3 ? onSendToSinge_Detail() : {} }}
                        style={styles.main_item}>
                        <Image source={SendToSingeFood} style={{ height: '50%', width: '90%', borderRadius: 0, resizeMode: 'contain' }}></Image>
                        <Text style={{ color: 'black', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular }}>Gữi Nhà Bếp</Text>
                    </TouchableOpacity>
                </View>
                {/* ///// */}
                <View style={styles.main}>
                    <TouchableOpacity
                        onPress={() => { StausOrder != 3 ? onCancelTakeAwayFood_Detail() : {} }}
                        style={styles.main_item}>
                        <Image source={CancelTakeAway} style={{ height: '50%', width: '90%', borderRadius: 0, resizeMode: 'contain' }}></Image>
                        <Text style={{ color: 'black', fontSize: hp(1.8), fontFamily: Fonts.Roboto_Slab_Regular, textAlign: 'center' }}>Hủy Mang Về</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            StausOrder != 3 ? RemoveFood() : {}
                        }}
                        style={styles.main_item}>
                        <Image source={Delete} style={{ height: '50%', width: '100%', borderRadius: 0, resizeMode: 'contain' }}></Image>
                        <Text style={{ color: 'black', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular }}>Xóa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPressIn={() => { StausOrder != 3 ? setVisible(true) : {} }}
                        style={styles.main_item}>
                        <Image source={Note} style={{ height: '50%', width: '90%', borderRadius: 0, resizeMode: 'contain' }}></Image>
                        <Text style={{ color: 'black', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular }}>Ghi Chú</Text>
                    </TouchableOpacity>
                </View>
                {/* ///// */}
                {IsPast == true && FoodCode == "RES0030" ?
                    <View style={styles.main}>
                        <TouchableOpacity
                            onPress={() => {
                                StausOrder != 3 ? setVisibleTimeAdd(true) : {}
                            }}
                            style={styles.main_item}>
                            <Image source={Clock} style={{ height: '50%', width: '100%', borderRadius: 0, resizeMode: 'contain' }}></Image>
                            <Text style={{ color: 'black', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular }}>+/- Giờ</Text>
                        </TouchableOpacity>

                    </View> : <View></View>}
            </View>

            <Modal
                animationType='slide'
                transparent
                visible={Visible1}
                presentationStyle='formSheet'
                style={{ justifyContent: 'flex-end', margin: 0 }}
                onDismiss={() => { setVisible1(false) }}
            >
                <DialogDiscountDetaill_Food
                    OrderDetailID={OrderDetailID}
                    OrderID={OrderID}
                    onPressClose={() => setVisible1(false)}
                    Price={Price}
                    onSucessfull={() => onSucessfull()}
                ></DialogDiscountDetaill_Food>
            </Modal>
            {/* //// */}
            <Modal
                animationType='slide'
                transparent
                visible={Visible}
                presentationStyle='formSheet'
                style={{ justifyContent: 'flex-end', margin: 0 }}
                onDismiss={() => { setVisible(false) }}
            >
                <DialogCommentFood
                    Caption={Caption}
                    FoodID={FoodID}
                    OrderDetailID={OrderDetailID}
                    onShow={() => { setVisible(false) }}
                    onSuccesfull={() => {
                        onSucessfull()
                    }}
                ></DialogCommentFood>
            </Modal>
            {/*  */}
            <Modal
                animationType='slide'
                transparent
                visible={VisibleTimeAdd}
                presentationStyle='formSheet'
                style={{ justifyContent: 'flex-end', margin: 0 }}
                onDismiss={() => { setVisibleTimeAdd(false) }}
            >
                <DialogExtendAndStopHour
                    OrderID={OrderID}
                    onPressOK={() => {
                        setVisibleTimeAdd(false)
                        onSucessfull()
                    }}
                    onPressClose={() => {

                        setVisibleTimeAdd(false)
                    }}
                ></DialogExtendAndStopHour>
            </Modal>
            <Toast position='top' autoHide={true} topOffset={0} />
        </View>

    </KeyboardAvoidingView >
};
const styles = StyleSheet.create({

    container: {
        // height: hp(47),
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    view_bottom: {
        height: hp(5),
        width: '50%',
        backgroundColor: 'white',
        marginBottom: 20,
        marginTop: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        height: hp(13),
        width: '90%',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    main_item: {
        height: '80%',
        width: '28%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 5
    },
    view_item: {
        marginTop: hp(1),
        height: hp(5),
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    view_item1: {
        marginTop: hp(1),
        height: hp(10),
        width: wp(100),

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    bottom_Button: {
        marginTop: hp(10),
        height: hp(8),
        width: wp(100),

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    }
})
