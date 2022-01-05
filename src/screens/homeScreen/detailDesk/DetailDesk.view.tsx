import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,

    BackHandler,
    Alert,
    Modal,
    Animated,
    useWindowDimensions,
    SafeAreaView,
    FlatList,
    TouchableWithoutFeedback,

} from 'react-native';
import lodash from 'lodash'
import styles from './DetailDesk.style';
import { Left, PhuThu, SearchWhite, MenuDetail, MonKhac, PhiDV, ChuyenBan, ChuyenMon, TachHD, TachBan, GopBan, GopHD, HuyBan, HuyHD, YCThanhToan, DoanBan, MenuHeader, SendToCook, GiveMoney, PayMent, Printer, TurnUp, TurnDowwn, RefeshTime, DisCount, TurnDouwnViewPayMent, All, EXITICON } from '../../../assets';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../../constants';
import { ItemDetailDeskCustom } from '../../../components/items/ItemDetailDeskCustom';
import { IconDetailDeskCustom } from '../../../components/iconsCustom/IconDetailDeskCustom';
import { MenuDetailView } from './MenuDetail.view';
import getDataByThing from '../../../utils/getDataByThing';
import { SwipeListView } from 'react-native-swipe-list-view';
import { DialogDetail_Food } from '../../../components/modal/DialogDetail_Food';
import { DialogTableMerge_Food } from '../../../components/modal/DialogTableMerge_Food';
import { Menu, MenuItem, } from 'react-native-material-menu';
import { DialogOrderMerge_Food } from '../../../components/modal/DialogMerOrder_Food';
import { DetailDesk_Logic } from './DetailDeskLogic'
import { DialogGetTaleMerge_Food } from '../../../components/modal/DialogGetTaleMerge_Food';
import { DialogTransferTable_Food } from '../../../components/modal/DialogTransferTable_Food';
import { DialogSendFoodTo } from '../../../components/modal/DialogSendFoodTo';
import LinearGradient from 'react-native-linear-gradient'
import { DialogPaymentOrder } from '../../../components/modal/DialogPaymentOrder';
import { DialogDiscountOrder } from '../../../components/modal/DialogDiscountOrder';
import Toast from 'react-native-toast-message';
import { DialogAddOtherFood } from '../../../components/modal/DialogAddOtherFood';
import { DialogCustomer } from '../../../components/modal/DialogCustomer';
import { DialogAddServiceCharge } from '../../../components/modal/DialogAddServiceCharge';
import { DialogAddTipCharge } from '../../../components/modal/DialogAddTipCharge';
import { DialogPrintOrder } from '../../../components/modal/DialogPrintOrder';
import { DialogSelectPrinterOrder } from '../../../components/modal/DialogSelectPrinterOrder';

const DetailDeskView = (props: any) => {
    const [Refesing, setRefesing] = useState(false)
    const [Visible_ViewMenu, setVisible_ViewMenu] = useState(false)
    const [Visible_Detail, setVisible_Detail] = useState(false)
    const [Visible_TableMerge, setVisible_TableMerge] = useState(false)
    const [Visible_MenuOrder, setVisible_MenuOrder] = useState(false);
    const [Visible_OrderMerge, setVisible_OrderMerge] = useState(false);
    const [Visible_GetTableMerge, setVisible_GetTableMerge] = useState(false);
    const [Visible_TranferTable, setVisible_TranferTable] = useState(false);
    const [Visible_SendFood, setVisible_SendFood] = useState(false);
    const [Visible_Payment, setVisible_Payment] = useState(false);
    const [Visible_DicoundOrder, setVisible_DicoundOrder] = useState(false);
    const [Visible_QuestionCancel, setVisible_QuestionCancel] = useState(false)
    const [Visible_AddOtherFood, setVisible_AddOtherFood] = useState(false)
    const [Visible_Customer, setVisible_Customer] = useState(false)
    const [Visible_AddSeviceCharge, setVisible_AddSeviceCharge] = useState(false)
    const [Visible_AddTipCharge, setVisible_AddTipCharge] = useState(false)
    const [Visible_SelectPrinter, setVisible_SelectPrinter] = useState(false)
    const [QuantityInput, setQuantityInput] = useState(0)
    const openMenu = () => setVisible_MenuOrder(true);
    const closeMenu = () => setVisible_MenuOrder(false);
    const [HeightBegin, setHeightBegin] = useState(-hp(85))
    const [HeightChange, setHeightChange] = useState(hp(100))
    const [Color, setColor] = useState('transparent')
    const [ImageBottom, setImageBottom] = useState(TurnUp)
    const [IndexDetailID, setIndexDetailID] = useState(0)
    const [AreaID, setAreaID] = useState('')
    const [TableID, setTableID] = useState('')
    const [LayoutID, setLayoutID] = useState('')
    const [TransactionIDScreen, setTransactionIDScreen] = useState('')
    const [TypeTableScreen, setTypeTableScreen] = useState(0)
    const [IndexOrderlist, setIndexOrderlist] = useState(0)
    const [TableCapTion, setTableCaption] = useState('')
    const [TableCapTionMer, setTableCapTionMer] = useState('')
    const { onGetTable_Logic,
        dataOrderList, dataOrder, dataOrderDetail, setdataOrder,
        setdataOrderDetail, setdataOrderList, Type, setType,
        dataGroups, setdataGroups,
        dataCommentFood, setdataCommentFood,
        dataFoodList, setdataFoodList, AddServiceCharge_Logic,
        dataTableMerger, setdataTableMerger, CancelOrder_Logic,
        onAddFood_Logic, onCancelTable_Logic, onChangeQuantityFood_Logic, onCommendFood_Logic, onDisCountFood_Logic,
        onGetCommentFood_Logic, onGetMenu_Logic, onGetMenuDetail_Logic, onGetOrder_Logic, onGetTableMerger_Logic, onGetTableToMer_Logic, onMergeTable_Logic,
        onRemoveFood_Logic, onSendToCookAll_Logic, onSendToSinge_Logic, onSplitOrder_Logic,
        onTakeAwayFood_onMenu, onViewTable_Logic, UpdateCustomerOrder_Logic, RequestPaymentOrder_Logic, CloseTable_Logic, ReAddHour_Logic, QuickSearchCustomer_Logic } = DetailDesk_Logic(props)
    const SendToCookonMenu = async (OrderID: string) => {
        if (!lodash.isEmpty(dataOrderDetail)) {
            await onSendToCookAll_Logic(OrderID)
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'không thể thực hiện'
            });
        }
    }
    const CancelTable_onDesk = async () => {
        if (dataOrder != null) {
            if (dataOrderDetail.length == 0) {
                if (await onCancelTable_Logic(TableID)) {
                    props.navigation.goBack()
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: 'không thể thực hiện'
                    });
                }
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Vui Lòng Xóa Hết Món Ăn Đã Đặt'
                });

            }
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'không thể thực hiện'
            });
        }
    }
    const onSplitOrder_onDesk = async () => {
        if (await onSplitOrder_Logic(dataOrder != null ? dataOrder.TransactionID : '')) {
            setIndexOrderlist(dataOrderList.length)
        }
    }
    const onGetOrderByID = async (OrderID: string) => {
        if (!lodash.isEmpty(dataOrderList)) {
            await onGetOrder_Logic(dataOrder != null ? dataOrder.TransactionID : '', OrderID)
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'không thể thực hiện'
            });
        }
    }
    const GetData = async (type: number) => {
        if (type == 1) {
            try {
                if (IndexOrderlist != 0) {
                    if (!lodash.isEmpty(dataOrderList)) {
                        await onGetOrder_Logic(dataOrder != null ? dataOrder.TransactionID : '', dataOrderList[IndexOrderlist].OrderID)
                    }
                }
                else {
                    const TypeTable = await props.route.params.TypeTable;
                    const AreaID = await props.route.params.AreaID;
                    const TableID = await props.route.params.TableID;
                    const TableCaption1 = await props.route.params.TableCaption;
                    const LayoutID = await props.route.params.LayoutID;
                    const TransactionID = await props.route.params.TransactionID;
                    setLayoutID(LayoutID)
                    setAreaID(AreaID)
                    setTableID(TableID)
                    setTableCaption(TableCaption1)
                    setTypeTableScreen(TypeTable)
                    setTransactionIDScreen(TransactionID)
                    await onViewTable_Logic(LayoutID, TransactionID)
                }
            }
            catch (E) { }
        }
        else if (type == 2) {
            setTableCapTionMer('')
            let data = dataTableMerger.filter(x => x.TableID != '')
            let data1 = dataTableMerger.filter(item => !data.includes(item))
            setdataTableMerger(data1)
            GetDataTableMer(TransactionIDScreen)
        }
        else {
            const TypeTable = await props.route.params.TypeTable;
            const AreaID = await props.route.params.AreaID;
            const TableID = await props.route.params.TableID;
            const TableCaption1 = await props.route.params.TableCaption;
            const LayoutID = await props.route.params.LayoutID;
            const TransactionID = await props.route.params.TransactionID;
            setLayoutID(LayoutID)
            setAreaID(AreaID)
            setTableID(TableID)
            setTableCaption(TableCaption1)
            setTypeTableScreen(TypeTable)
            setTransactionIDScreen(TransactionID)
            setIndexOrderlist(0)
            await onViewTable_Logic(LayoutID, TransactionID)
        }

    }
    const GetDataTableMer = async (TranSacTionID: any) => {
        await onGetTableMerger_Logic(TranSacTionID);
    }
    const onUpdateCustome = async (CustomerID: string) => {
        if (!lodash.isEmpty(dataOrderList)) {
            if (await UpdateCustomerOrder_Logic(dataOrderList[IndexOrderlist].OrderID, CustomerID)) {
                GetData(1)
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Không thành công'
                });
            }
        }

    }
    useEffect(() => {
        props.navigation.addListener('focus', () => {
            GetData(1);
        });
        return () => { };
    }, []);
    useEffect(() => {

        ViewData()
        ViewDataBottom()
        ViewHeader()
    }, [dataOrderDetail, dataOrderList, dataOrder])
    useEffect(() => {
        onChangeTableCaption()
    }, [dataTableMerger])
    useEffect(() => {
        ViewHeader()
    }, [TableCapTionMer])
    useEffect(() => {
        if (TableCapTionMer == '') {
            if (dataOrder != null) {
                GetDataTableMer(dataOrder.TransactionID)
            }
        }
    }, [dataOrder])
    const onRefresh = () => {
        setRefesing(true)
        GetData(1)
        setTimeout(() => {
            setRefesing(false)
        }, 1500)
    }
    const ShowViewPayment = () => {
        if (HeightBegin == 0) {
            setHeightBegin(-hp(85))
            setHeightChange(hp(100))
            setColor('transparent')
            setImageBottom(TurnUp)
        }
        else {
            setHeightBegin(0)
            setHeightChange(hp(80))
            setColor('rgba(0,0,0,0.4)')
            setImageBottom(TurnDouwnViewPayMent)
        }
    }
    const ChangeToIndexOrderList = (value: any) => {
        setIndexOrderlist(value)
        closeMenu()
        onGetOrderByID(dataOrderList[value].OrderID)
    }
    const onChangeQuantity = async (Type: boolean, OrderDetailID: string, Quantity: number) => {
        let quantity = Quantity;
        if (Type == true) {
            quantity = quantity + 1;
        }
        else {
            quantity = quantity - 1;
        }
        if (quantity > 0) {
            await onChangeQuantityFood_Logic(!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : '', OrderDetailID, quantity)
        }
    }
    const onChangeTableCaption = () => {
        setTableCapTionMer('')
        let a = '';
        if (!lodash.isEmpty(dataTableMerger)) {

            for (var i = 0; i < dataTableMerger.length; i++) {
                a = a + dataTableMerger[i].TableCaption + ' '
            }
            setTableCapTionMer(a);
        }

    }
    const onCloseTable = async () => {
        if (await CloseTable_Logic(dataOrder != null ? dataOrder.TransactionID : '')) {
            props.navigation.goBack()
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'không thể thực hiện'
            });
        }
    }
    const onCancelOrder = async () => {
        if (await CancelOrder_Logic(dataOrder != null ? dataOrder.TransactionID : '', !lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : '')) {

            GetData(3)
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'không thể thực hiện'
            });
        }
    }
    const onReAddHour = async () => {
        if (dataOrder != null) {
            await ReAddHour_Logic(!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : '', dataOrder.OrderDate)
            ShowViewPayment()
        }
    }
    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <View></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                <TouchableOpacity
                    style={{ width: wp(18), marginRight: wp(1), height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                    onPress={() => {
                        setIndexDetailID(data.index)
                        setVisible_Detail(true)
                    }}>
                    <Image source={All} style={{ height: 20, width: wp(4), resizeMode: 'contain', tintColor: 'white' }}></Image>
                </TouchableOpacity>

            </View>
        </View>
    );
    const onChangeText = (value: any) => {

        if (!!value) {
            setQuantityInput(value)
        }
    }
    const onCheckPaymentOrder = () => {
        // if (!lodash.isEmpty(dataOrderList)) {
        //     let data = dataOrderList.filter(item => item.Status == 3)
        //     if (data.length == 0) {
        //         setVisible_QuestionCancel(true)
        //     }
        // }
    }
    const onToast = () => {
        Toast.show({
            type: 'error',
            text1: 'Thông báo',
            text2: 'Chức năng không thể thực hiện lúc này'
        });
    }
    const onBlur = async (OrderDetailID: string) => {
        if (QuantityInput > 0) {
            await onChangeQuantityFood_Logic(!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : '', OrderDetailID, QuantityInput)
        }
    }
    const ViewData = () => {
        return (
            <LinearGradient colors={['#305B3D', '#305B3D', '#305B3D']} style={{ width: '100%', paddingBottom: hp(15), height: '100%', zIndex: 1, flex: 1 }}>
                {!lodash.isEmpty(dataOrderDetail) ? <SwipeListView
                    keyExtractor={(item) => item.FoodID.toString()}
                    closeOnRowPress={true}
                    closeOnRowOpen={true}
                    data={dataOrderDetail}
                    rightOpenValue={-wp(18)}
                    previewOpenDelay={3000}
                    previewOpenValue={-wp(18)}
                    renderHiddenItem={renderHiddenItem}
                    refreshing={Refesing}
                    onRefresh={onRefresh}
                    disableRightSwipe
                    renderItem={({ item, index }) =>
                        <ItemDetailDeskCustom
                            Enable={CheckValueCondition(6) ? item.Status == 1 ? false : true : true}
                            isTakeAway={item.IsTakeAway}
                            Note={item.CommentText}
                            onBlur={() => { CheckValueCondition(6) ? item.Status == 1 ? onBlur(item.DetailID) : {} : {} }}
                            onChangeText={(value) => { CheckValueCondition(6) ? item.Status == 1 ? onChangeText(value) : {} : {} }}
                            onPressMinus={() => { CheckValueCondition(6) ? item.Status == 1 ? onChangeQuantity(false, item.DetailID, item.Quantity) : onToast() : onToast() }}
                            onPressPlus={() => { CheckValueCondition(6) ? item.Status == 1 ? onChangeQuantity(true, item.DetailID, item.Quantity) : onToast() : onToast() }}
                            TypeItem={item.Status}
                            DiscountPrice={item.DiscountAmount}
                            NameFood={item.FoodName}
                            Price={item.Price}
                            Quanliti={item.Quantity}
                            ToTalAmount={item.TotalAmount}
                            index={index}
                        ></ItemDetailDeskCustom>
                    } /> : <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), color: 'black' }}>(Trống)</Text>
                </View>}
            </LinearGradient>
        )
    }
    //Yêu Cầu Thanh toán
    const onRequestPaymentOrder = async () => {
        if (dataOrder.Status == 1) {
            await RequestPaymentOrder_Logic(TransactionIDScreen, !lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : '')
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'không thể thực hiện'
            });
        }

    }
    //Kiểm tra điều kiện  hiện Thị
    //input value:Nút hiện thị
    //Kiểm tra điều kiện hiển thị
    //output:true/false
    const CheckValueCondition = (value: number) => {
        if (dataOrder != null && dataOrder.Status == 1) {
            switch (value) {
                //Tách Bàn
                case 1:
                    if (dataTableMerger != null && dataTableMerger.length > 1 && TypeTableScreen == 1) {
                        return true;
                    } else {
                        return false;
                    }
                //Tách HD,Gộp Bàn,
                case 2:
                    if (TypeTableScreen == 1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                //Món Khác
                case 3:
                    if (TypeTableScreen == 1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                //Gộp HD
                case 4:
                    if (TypeTableScreen == 1 && dataOrderList.length > 1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                //Hủy Bàn
                case 5:
                    if (TypeTableScreen == 1 && dataOrderDetail.length == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                //Itemdetail, DialogDetailFood
                case 6:
                    return true;
                //Tách Hóa Đơn
                case 7:
                    if (TypeTableScreen == 1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                //YC Thanh Toán
                case 9:
                    return true;
                case 8:
                    return false;
                //Tinh Lại Giờ
                case 10:
                    return true;
                //Giảm Giá
                case 11:
                    return true;
                //Thanh Toán
                case 12:
                    return true;
                // Gữi Nhà Bếp
                case 13:
                    return true;
                // Hủy HĐ
                case 14:
                    if (!lodash.isEmpty(dataOrderList) && !lodash.isEmpty(dataOrderDetail)) {
                        if (dataOrderList.length > 1 && dataOrderDetail.length == 0) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                //Chuyển Món, Chuyển bàn
                case 15:
                    if (!lodash.isEmpty(dataTableMerger)) {
                        if (dataTableMerger.length == 1) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
            }
        }
        else if (dataOrder != null && dataOrder.Status == 2) {
            //Chờ Thanh Toán - Tách Hóa Đơn- Itemdetail- DialogDetailFood
            if (TypeTableScreen == 1 && value == 7 || value == 6 || value == 10 || value == 11 || value == 12 || value == 13) {
                return true;
            }
            return false;
        }
        else if (dataOrder != null && dataOrder.Status == 3) {
            if (value == 8) {
                return true;
            }
            return false;
        }

    }
    const ChangeStatusOrder = (value: number) => {
        switch (value) {
            case 1:
                return 'Chưa Thanh Toán';
            case 2:
                return 'YC Thanh Toán';
            case 3:
                return 'Đã Thanh Toán';
        }
    }
    // Dialog Ở Dưới
    const ViewDataBottom = () => {
        return (
            <View style={{ height: hp(100), width: '100%', backgroundColor: Color, position: 'absolute', bottom: HeightBegin, zIndex: 2, justifyContent: 'flex-end' }}>
                <Toast position='top' />
                <LinearGradient colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} style={{ height: HeightChange, width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15, elevation: 10, flexDirection: 'column', alignItems: 'center', borderColor: mainColors.greenscolor, borderTopWidth: 2, borderLeftWidth: 1, borderRightWidth: 1 }}>
                    <TouchableOpacity onPress={() => {
                        ShowViewPayment()
                    }} style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }} >
                        <View style={{ height: 20, width: '35%', borderRadius: 15, marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={ImageBottom} style={{ height: 20, width: 35, resizeMode: 'stretch', tintColor: 'black' }}></Image>
                        </View>
                        <Text style={{ marginTop: 2, height: hp(3), fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, textDecorationLine: 'underline', color: 'black' }}>HÓA ĐƠN BÁN HÀNG</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setVisible_Customer(true) }}
                        style={styles.heder_bottom_text}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>Khách Hàng</Text>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'blue' }}>{dataOrder != null ? dataOrder.CustomerName : ''}🔻</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#ACAEAD', width: '100%', height: 1, marginTop: 2 }}></View>
                    <View style={styles.heder_bottom_text}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>Thành Tiền:</Text>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'blue' }}>{dataOrder != null ? getDataByThing.getcurrency(dataOrder.Amount) : 0}đ</Text>
                    </View>
                    <View style={{ backgroundColor: '#AEACAC', width: '100%', height: 1, marginTop: 2 }}></View>
                    <View style={styles.heder_bottom_text}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>Giảm Giá:</Text>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'blue' }}>{dataOrder != null ? getDataByThing.getcurrency(dataOrder.DiscountAmount) : 0}đ</Text>
                    </View>
                    <View style={{ backgroundColor: '#AEACAC', width: '100%', height: 1, marginTop: 2 }}></View>
                    <View style={styles.heder_bottom_text}>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>Tổng Tiền:</Text>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'blue' }}>{dataOrder != null ? getDataByThing.getcurrency(dataOrder.TotalAmount) : 0}đ</Text>
                    </View>
                    <View style={{ backgroundColor: '#AEACAC', width: '100%', height: 1, marginTop: 2, marginBottom: 10 }}></View>
                    {/* các nút */}
                    <Toast position='top' />
                    <View style={{ width: '100%', }}  >
                        <View style={styles.view_bottom_icon}>
                            <IconDetailDeskCustom
                                Status={true}
                                sourceICon={MonKhac}
                                title={'Món Khác'}
                                onPress={() => {
                                    setVisible_AddOtherFood(true)
                                }}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={true}
                                sourceICon={PhiDV}
                                onPress={() => { setVisible_AddSeviceCharge(true) }}
                                title={'Phí DV'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(11)}
                                onPress={() => { CheckValueCondition(11) ? setVisible_DicoundOrder(true) : {} }}
                                sourceICon={DisCount}
                                title={'Giảm Giá'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={true}
                                onPress={() => { setVisible_AddTipCharge(true) }}
                                sourceICon={GiveMoney}
                                title={'Tiền Típ'}
                            ></IconDetailDeskCustom>
                        </View>
                        {/* /// */}
                        <View style={styles.view_bottom_icon}>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(9)}
                                onPress={() => { CheckValueCondition(9) ? onRequestPaymentOrder() : onToast() }}
                                sourceICon={YCThanhToan}
                                title={'YC Thanh Toán'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(12)}
                                onPress={() => {
                                    CheckValueCondition(12) ? setVisible_Payment(true) : onToast()
                                }}
                                sourceICon={PayMent}
                                title={'Thanh Toán'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={true}
                                onPress={() => { setVisible_SelectPrinter(true) }}
                                sourceICon={Printer}
                                title={'In HĐ'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={true}
                                onPress={() => { }}
                                sourceICon={PhuThu}
                                title={'Phụ Thu'}
                            ></IconDetailDeskCustom>
                        </View>
                        {/* /// */}
                        <View style={styles.view_bottom_icon}>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(13)}
                                onPress={() => { CheckValueCondition(13) ? SendToCookonMenu(!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : '') : onToast() }}
                                sourceICon={SendToCook}
                                title={'Gữi Nhà Bếp'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(15)}
                                onPress={() => { CheckValueCondition(15) ? setVisible_SendFood(true) : onToast() }}
                                sourceICon={ChuyenMon}
                                title={'Chuyển Món'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(15)}
                                onPress={() => { CheckValueCondition(15) ? setVisible_TranferTable(true) : onToast() }}
                                sourceICon={ChuyenBan}
                                title={'Chuyển Bàn'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(10)}
                                onPress={() => { CheckValueCondition(10) ? onReAddHour() : onToast() }}
                                sourceICon={RefeshTime}
                                title={'Tính Lại Giờ'}
                            ></IconDetailDeskCustom>
                        </View>
                        {/* /// */}
                        <View style={styles.view_bottom_icon}>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(7)}
                                onPress={() => { CheckValueCondition(7) ? onSplitOrder_onDesk() : onToast() }}
                                sourceICon={TachHD}
                                title={'Tách HD'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(1)}
                                onPress={() => CheckValueCondition(1) ? setVisible_GetTableMerge(true) : onToast()}
                                sourceICon={TachBan}
                                title={'Tách Bàn'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(4)}
                                onPress={() => { CheckValueCondition(4) ? setVisible_OrderMerge(true) : onToast() }}
                                sourceICon={GopHD}
                                title={'Gộp HĐ'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(2)}
                                onPress={() => { CheckValueCondition(2) ? setVisible_TableMerge(true) : onToast() }}
                                sourceICon={GopBan}
                                title={'Gộp Bàn'}
                            ></IconDetailDeskCustom>
                        </View>
                        {/* /// */}
                        <View style={styles.view_bottom_icon}>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(14)}
                                onPress={() => { CheckValueCondition(14) ? onCancelOrder() : onToast() }}
                                sourceICon={HuyHD}
                                title={'Hủy HĐ'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(5)}
                                onPress={() => { CheckValueCondition(5) ? CancelTable_onDesk() : onToast() }}
                                sourceICon={HuyBan}
                                title={'Hủy Bàn'}
                            ></IconDetailDeskCustom>
                            <IconDetailDeskCustom
                                Status={CheckValueCondition(8)}
                                onPress={() => { CheckValueCondition(8) ? onCloseTable() : onToast() }}
                                sourceICon={DoanBan}
                                title={'Đóng Bàn'}
                            ></IconDetailDeskCustom>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        )
    }
    // Thanh Header
    const ViewHeader = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                    <Image source={Left} style={{ height: hp(3), width: hp(3) }}></Image>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular }}>{TableCapTionMer}</Text>
                {lodash.isEmpty(dataOrderList) == false ? <Menu
                    style={{ height: hp(30) }}
                    visible={Visible_MenuOrder}
                    anchor={<Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), color: 'white' }} onPress={openMenu}>Hóa đơn {dataOrderList[IndexOrderlist].OrderNumber.toString()}🔻</Text>}
                    onRequestClose={closeMenu}>
                    {dataOrderList.map((item, index) => {
                        return (<MenuItem style={{ height: hp(5), justifyContent: 'center', alignItems: 'flex-start', borderBottomWidth: 1, borderBottomColor: mainColors.smokecolor }} onPress={() => { ChangeToIndexOrderList(index) }}>

                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2) }}>{item.OrderNumber}-</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.5), color: mainColors.greenscolor }}>({ChangeStatusOrder(item.Status)})</Text>
                        </MenuItem>)
                    })}
                </Menu> :
                    <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2.5), color: 'white' }} onPress={openMenu}>{TableCapTionMer}</Text>}
                <TouchableOpacity onPress={() => { setVisible_ViewMenu(true) }}>
                    <Image source={MenuDetail} style={{ height: hp(3), width: hp(3) }}></Image>
                </TouchableOpacity>
            </View>
        )
    }
    ///view dialoog
    const ViewModal = () => {
        return (
            <View>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_ViewMenu}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_ViewMenu(false) }}>
                    <MenuDetailView
                        StatusOrder={dataOrder != null ? dataOrder.Status : 0}
                        onPress={() => {
                            setVisible_ViewMenu(false);
                            GetData(1);
                        }}
                        navigation={props.navigation}
                        OrderID={!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : ''}
                    ></MenuDetailView>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_Detail}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_Detail(false) }} >
                    <DialogDetail_Food
                        FoodCode={!lodash.isEmpty(dataOrderDetail) ? dataOrderDetail[IndexDetailID].FoodCode : ''}

                        IsPast={!lodash.isEmpty(dataOrderDetail) ? dataOrderDetail[IndexDetailID].IsPast : false}
                        Caption={!lodash.isEmpty(dataOrderDetail) ? dataOrderDetail[IndexDetailID].FoodName : ''}
                        StausOrder={dataOrder != null ? dataOrder.Status : 0}
                        isTakeAway={!lodash.isEmpty(dataOrderDetail) ? dataOrderDetail[IndexDetailID].IsTakeAway : false}
                        Price={!lodash.isEmpty(dataOrderDetail) ? dataOrderDetail[IndexDetailID].Price : 0}
                        OrderDetailID={!lodash.isEmpty(dataOrderDetail) ? dataOrderDetail[IndexDetailID].DetailID : ''}
                        OrderID={!lodash.isEmpty(dataOrderDetail) ? dataOrderDetail[IndexDetailID].OrderID : ''}
                        onShow={() => {
                            setVisible_Detail(false);
                        }}
                        onSucessfull={() => {
                            setIndexDetailID(0)
                            GetData(1);
                            setVisible_Detail(false);
                        }}
                        Status={CheckValueCondition(6) ? !lodash.isEmpty(dataOrderDetail) ? dataOrderDetail[IndexDetailID].Status : 0 : 0}
                        FoodID={!lodash.isEmpty(dataOrderDetail) ? dataOrderDetail[IndexDetailID].FoodID : ''}
                    ></DialogDetail_Food>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_TableMerge}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_TableMerge(false) }} >
                    <DialogTableMerge_Food
                        TranSacTionID={dataOrder != null ? dataOrder.TransactionID : ''}
                        LayoutID={LayoutID}
                        TableID={TableID}
                        onShow={() => {
                            setVisible_TableMerge(false);
                        }}
                        onSucessFull={() => {
                            ShowViewPayment();
                            GetData(2);
                            setVisible_TableMerge(false);
                        }}
                    ></DialogTableMerge_Food>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_GetTableMerge}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_GetTableMerge(false) }}>
                    <DialogGetTaleMerge_Food
                        TranSacTionID={dataOrder != null ? dataOrder.TransactionID : ''}
                        LayoutID={LayoutID}
                        TableID={TableID}
                        onShow={() => {
                            setVisible_GetTableMerge(false);
                        }}
                        onSucessFull={() => {
                            ShowViewPayment();
                            GetData(2);
                            setVisible_GetTableMerge(false);
                        }}
                    ></DialogGetTaleMerge_Food>

                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_TranferTable}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_TranferTable(false) }}
                >
                    <DialogTransferTable_Food
                        TranSacTionID={dataOrder != null ? dataOrder.TransactionID : ''}
                        LayoutID={LayoutID}
                        TableID={TableID}
                        onShow={() => {
                            // ShowViewPayment();
                            // GetData()
                            setVisible_TranferTable(false);
                        }}
                        onSucessfull={(IDLayout, IDTable, Caption, DateTime) => {
                            setVisible_TranferTable(false);
                            ShowViewPayment();
                            GetData(2);
                        }}
                    ></DialogTransferTable_Food>

                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_OrderMerge}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_OrderMerge(false) }}>
                    <DialogOrderMerge_Food
                        OrderID={!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : ''}
                        TransactionID={dataOrder != null ? dataOrder.TransactionID : ''}
                        dataOrderList={!lodash.isEmpty(dataOrderList) ? dataOrderList : []}
                        onShow={() => {
                            setVisible_OrderMerge(false);
                        }}
                        onSuccesfull={() => {
                            setVisible_OrderMerge(false);
                            ShowViewPayment();

                            GetData(3);

                        }} ></DialogOrderMerge_Food>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_SendFood}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_SendFood(false) }}>
                    <DialogSendFoodTo
                        dataOrderList={!lodash.isEmpty(dataOrderList) ? dataOrderList : []}
                        LayoutID={LayoutID}
                        OrderID={!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : ''}
                        TransactionID={dataOrder != null ? dataOrder.TransactionID : ''}
                        dataOrderdetail={!lodash.isEmpty(dataOrderDetail) ? dataOrderDetail : []}
                        onShow={() => {
                            setVisible_SendFood(false);
                        }}
                        onSuccesfull={() => {
                            setVisible_SendFood(false);
                            ShowViewPayment();
                            GetData(1);
                        }}
                    ></DialogSendFoodTo>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_Payment}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_Payment(false) }}>
                    <DialogPaymentOrder
                        TransacTionID={dataOrder != null ? dataOrder.TransactionID : ''}
                        onPressClose={() => { setVisible_Payment(false) }}
                        onPressOK={() => {
                            setVisible_Payment(false)
                            GetData(1)
                            onCheckPaymentOrder()
                        }}
                        OrderNumner={!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderNumber : 0}
                        ToTalPrice={dataOrder != null ? dataOrder.TotalAmount : 0}
                        OrderID={!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : ''}
                        DisCound={dataOrder != null ? dataOrder.DiscountAmount : 0}
                    ></DialogPaymentOrder>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_DicoundOrder}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_DicoundOrder(false) }}>
                    <DialogDiscountOrder
                        Caption={!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderNumber : 0}
                        OrderID={!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : ''}
                        Price={dataOrder != null ? dataOrder.TotalAmount : 0}
                        onPressClose={() => { setVisible_DicoundOrder(false) }}
                        onSucessfull={() => {
                            ShowViewPayment()
                            setVisible_DicoundOrder(false)
                            GetData(1)
                        }}
                    ></DialogDiscountOrder>
                </Modal>
                {/* ViewDialogQuestionCancel */}
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_QuestionCancel}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_QuestionCancel(false) }}>
                    <TouchableWithoutFeedback
                        onPress={() => { setVisible_QuestionCancel(false) }}>
                        <View style={{ flex: 1, height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: 200, width: '100%', backgroundColor: 'white', flexDirection: 'column', borderRadius: 5 }}>
                                <View style={{ height: 35, width: '100%', backgroundColor: mainColors.greenscolor, justifyContent: 'space-between', padding: 2, flexDirection: 'row', }}>
                                    <View style={{ height: 30, justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, color: 'white', fontSize: 17 }}>Thông Báo</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => { setVisible_QuestionCancel(false) }}
                                        style={{ height: 30, width: 30, justifyContent: 'center' }}>
                                        <Image source={EXITICON} style={{ height: 17, width: 30, resizeMode: 'contain', tintColor: 'white' }}></Image>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: 120, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', fontSize: 17 }}>
                                        Tất cả hóa đơn đã được thanh toán
                                    </Text>
                                </View>
                                <View style={{ height: 40, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 5, flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => { setVisible_QuestionCancel(false) }}
                                        style={{ height: 35, width: 100, backgroundColor: mainColors.whiteColor, alignItems: 'center', justifyContent: 'center', borderRadius: 5, elevation: 5, borderWidth: 0.5, borderColor: mainColors.smokecolor }}>
                                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.greenscolor, fontSize: 15 }}>
                                            Hủy Bỏ
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { onCloseTable() }}
                                        style={{ height: 35, width: 100, marginLeft: 5, backgroundColor: mainColors.greenscolor, alignItems: 'center', justifyContent: 'center', borderRadius: 5, elevation: 5, borderWidth: 0.5, borderColor: mainColors.smokecolor }}>
                                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.whiteColor, fontSize: 15 }}>
                                            Đóng Bàn
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_AddOtherFood}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_AddOtherFood(false) }}>
                    <DialogAddOtherFood
                        OrderID={!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : ''}
                        onPressClose={() => { setVisible_AddOtherFood(false) }}
                        onPressOK={() => {
                            setVisible_AddOtherFood(false)
                            GetData(1)
                        }}></DialogAddOtherFood>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_Customer}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_Customer(false) }}>
                    <DialogCustomer

                        onPressClose={() => { setVisible_Customer(false) }}
                        onPressOK={(value) => {
                            setVisible_Customer(false)
                            onUpdateCustome(value.ObjectID)
                        }}></DialogCustomer>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_AddSeviceCharge}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_AddSeviceCharge(false) }}>
                    <DialogAddServiceCharge
                        OrderID={!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : ''}
                        onPressClose={() => { setVisible_AddSeviceCharge(false) }}
                        onPressOK={() => {
                            setVisible_AddSeviceCharge(false)
                            GetData(1)
                        }}></DialogAddServiceCharge>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_AddTipCharge}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_AddTipCharge(false) }}>
                    <DialogAddTipCharge
                        OrderID={!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : ''}
                        onPressClose={() => { setVisible_AddTipCharge(false) }}
                        onPressOK={() => {
                            setVisible_AddTipCharge(false)
                            GetData(1)
                        }}></DialogAddTipCharge>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_SelectPrinter}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_SelectPrinter(false) }}>
                    <     DialogSelectPrinterOrder
                        // OrderID={!lodash.isEmpty(dataOrderList) ? dataOrderList[IndexOrderlist].OrderID : ''}
                        onPressClose={() => { setVisible_SelectPrinter(false) }}
                        onPressOK={() => {
                            setVisible_SelectPrinter(false)
                            // GetData(1)
                        }}></     DialogSelectPrinterOrder>
                </Modal>

            </View >
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#C6C6C6', }}>

            {ViewHeader()}

            {!lodash.isEmpty(dataOrderList) ? ViewData() : <View style={{ flex: 1, backgroundColor: '#CDFBF7', }}></View>}
            {/* viewdata */}
            {ViewDataBottom()}
            {/* ViewModal */}
            {ViewModal()}

        </SafeAreaView >
    )
}
export default DetailDeskView;