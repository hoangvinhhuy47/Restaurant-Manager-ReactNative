import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { Order, OrderDetailList, Customer, CommentList, MenuList, TableMergeList, GroupList, FoodList, TableList, PaymentInfo, CustomerList, CityList, DistrictList, WardList } from '../../../components/object/Order';
import lodash from 'lodash'
import { OpenTable } from '../../../services/detaildesk/OpenTable'
import { AddFood } from '../../../services/detaildesk/AddFood';
import { CancelTable } from '../../../services/detaildesk/CancelTable';
import { ChangeQuantityFood } from '../../../services/detaildesk/ChangeQuantityFood';
import { CommentFood } from '../../../services/detaildesk/CommentFood';
import { DiscountFood } from '../../../services/detaildesk/DiscountFood';
import { GetCommentFood } from '../../../services/detaildesk/GetCommentFood';
import { GetMenu } from '../../../services/detaildesk/GetMenu';
import { GetTableMerge } from '../../../services/detaildesk/GetTableMerge';
import { GetMenuDetail } from '../../../services/detaildesk/GetMenuDetail';
import { GetOrder } from '../../../services/detaildesk/GetOrder';
import { GetTableToMerge } from '../../../services/detaildesk/GetTableToMerge';
import { MergeTable } from '../../../services/detaildesk/MergeTable';
import { RemoveFood } from '../../../services/detaildesk/RemoveFood';
import { SendToCookAll } from '../../../services/detaildesk/SendToCookAll';
import { SendToCookSingle } from '../../../services/detaildesk/SendToCookSingle';
import { SplitOrder } from '../../../services/detaildesk/SplitOrder';
import { TakeAwayFood } from '../../../services/detaildesk/TakeAwayFood_Logic';
import { MergeOrder } from '../../../services/detaildesk/MergeOrder';
import { TransferTable } from '../../../services/detaildesk/TransferTable';
import { TransferFoodToTable } from '../../../services/detaildesk/TransferFoodToTable';
import { SplitTable } from '../../../services/detaildesk/SplitTable';
import { ViewTable } from '../../../services/detaildesk/ViewTable';
import { RequestPaymentOrder } from '../../../services/detaildesk/RequestPaymentOrder';
import { PaymentOrder } from '../../../services/detaildesk/PaymentOrder';
import { CloseTable } from '../../../services/detaildesk/CloseTable';
import { CancelTakeAwayFood } from '../../../services/detaildesk/CancelTakeAwayFood';
import { ReAddHour } from '../../../services/detaildesk/ReAddHour';
import { ExtendAndStopHour } from '../../../services/detaildesk/ExtendAndStopHour';
import { DiscountOrder } from '../../../services/detaildesk/DiscountOrder';
import RNPrint from 'react-native-print';
import { CancelOrder } from '../../../services/detaildesk/CancelOrder';
import { TransferFoodToOrder } from '../../../services/detaildesk/TransferFoodToOrder';
import { QuickSearchCustomer } from '../../../services/detaildesk/QuickSearchCustomer';
import { GetAllCity } from '../../../services/detaildesk/GetAllCity';
import { GetAllDistrict } from '../../../services/detaildesk/GetAllDistrict';
import { GetAllWard } from '../../../services/detaildesk/GetAllWard';
import { AddNewCustomer } from '../../../services/detaildesk/AddNewCustomer';
import { AddServiceCharge } from '../../../services/detaildesk/AddServiceCharge';
import { AddOtherFood } from '../../../services/detaildesk/AddOtherFood';
import { UpdateCustomerOrder } from '../../../services/detaildesk/UpdateCustomerOrder';
import { AddTipCharge } from '../../../services/detaildesk/AddTipCharge';
import ThermalPrinterModule from 'react-native-thermal-printer';
import Toast from 'react-native-toast-message';
export const DetailDesk_Logic = (props: any) => {
    const { profileInfo } = useSelector((state: any) => ({
        profileInfo: state?.auth?.profileInfo,
    }));
    const [userID, setUserID] = useState(profileInfo.UserID);
    const [dataOrderList, setdataOrderList] = useState(new Array<Order>());
    const [dataOrder, setdataOrder] = useState<Order>()
    const [dataOrderDetail, setdataOrderDetail] = useState(new Array<OrderDetailList>());
    const [dataCommentFood, setdataCommentFood] = useState(new Array<CommentList>());
    const [dataMenu, setDataMenu] = useState(new Array<MenuList>());
    const [dataGroups, setdataGroups] = useState(new Array<GroupList>());
    const [dataFoodList, setdataFoodList] = useState(new Array<FoodList>());
    const [dataTableMerger, setdataTableMerger] = useState(new Array<TableMergeList>());
    const [Type, setType] = useState(0)
    const [TransactionIDresult, setTransactionIDresult] = useState('')
    const [CustomerList, setCusomterList] = useState(new Array<CustomerList>())
    const [DataCityList, setDataCityList] = useState(new Array<CityList>())
    const [DataDistricList, setDataDistricList] = useState(new Array<DistrictList>())
    const [DataWardList, setDataWardList] = useState(new Array<WardList>())
    const [dataTableMer, setdataTableMer] = useState(new Array<TableList>());
    const onGetTable_Logic = async (LayoutID: string, TableID: string, TableCaption: string, OpenTime: string) => {
        let dataresult = await OpenTable(userID, LayoutID, TableID, TableCaption, OpenTime);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let resultTable = result?.TransactionID
                if (resultTable != null) {
                    setTransactionIDresult(resultTable)
                    return resultTable;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }

    }
    /// ViewTable
    const onViewTable_Logic = async (LayoutID: string, TransactionID: string,) => {
        let dataresult = await ViewTable(userID, LayoutID, TransactionID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let resultOrder: Order = result?.Order
                let resultOrderList: Array<Order> = result?.OrderList
                let resultOrderDetail: Array<OrderDetailList> = result?.OrderDetailList
                for (var i = 0; i < resultOrderDetail.length; i++) {
                    resultOrderDetail[i].QuantityOrg = resultOrderDetail[i].Quantity
                    setdataOrderDetail(resultOrderDetail)
                }
                setdataOrderList(resultOrderList)
                setdataOrder(resultOrder)

            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }

    }
    ///AddFodd
    const onAddFood_Logic = async (OrderID: string, FoodID: string, Quantity: number) => {
        let dataresult = await AddFood(userID, OrderID, FoodID, Quantity);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }

    }
    ///Cancel Table
    const onCancelTable_Logic = async (TableID: string,) => {
        let dataresult = await CancelTable(userID, TableID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }

    }
    //// ChangeQuantity
    const onChangeQuantityFood_Logic = async (OrderID: string, OrderDetailID: string, Quantity: number) => {
        let dataresult = await ChangeQuantityFood(userID, OrderID, OrderDetailID, Quantity);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let resultOrder: Order = result?.Order
                let resultDetailOrder: Array<OrderDetailList> = result?.OrderDetailList
                setdataOrder(resultOrder)
                setdataOrderDetail(resultDetailOrder)
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }

    }
    ///CommentFood
    const onCommendFood_Logic = async (OrderDetailID: string, CommentList: Array<CommentList>) => {
        let dataresult = await CommentFood(userID, OrderDetailID, CommentList);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }

    }
    ///DisConutFood
    const onDisCountFood_Logic = async (OrderID: string, OrderDetailID: string, DiscountType: number, DiscountValue: number) => {
        let dataresult = await DiscountFood(userID, OrderID, OrderDetailID, DiscountType, DiscountValue);
        if (dataresult != null) {
            let result = dataresult.data;

            if (result?.StatusID == 1) {

                return true;
            }
            else {

                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }

    }
    ///GetComment
    const onGetCommentFood_Logic = async (OrderDetailID: string, FoodID: string) => {
        let dataresult = await GetCommentFood(userID, OrderDetailID, FoodID);
        if (dataresult != null) {
            let result = dataresult.data;

            if (result?.StatusID == 1) {
                let data1: Array<CommentList> = result.CommentList;
                if (lodash.isEmpty(data1) == false) {
                    setdataCommentFood(data1)
                }
                else {

                }
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    ///GetMenu
    const onGetMenu_Logic = async () => {
        let dataresult = await GetMenu(userID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let data1: Array<MenuList> = result.MenuList;
                if (lodash.isEmpty(data1) == false) {
                    for (var i = 0; i < data1.length; i++) {
                        if (i == 0) {
                            data1[i].Show = true;
                        }
                        else {
                            data1[i].Show = false;
                        }
                    }
                    setDataMenu([...dataMenu, ...data1])
                }
                else {


                }
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    ///GetMenuDetail
    const onGetMenuDetail_Logic = async (ID: string) => {
        setdataFoodList([])
        setdataGroups([])
        let dataresult = await GetMenuDetail(userID, ID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let data1: Array<GroupList> = result?.GroupList;
                let data2: Array<FoodList> = result.FoodList;
                let typeResult: number = result?.MenuType
                if (typeResult == 1) {
                    setType(1)
                    setdataGroups([])
                    setdataFoodList(data2)
                }
                else {
                    for (var i = 0; i < data1.length; i++) {
                        data1[i].isShow = false;
                    }
                    setType(typeResult)
                    setdataGroups(data1)
                    setdataFoodList(data2)
                }
            }
            else {
                setType(0)

            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    ///GetOrderByID
    const onGetOrder_Logic = async (TransactionID: string, OrderID: string) => {
        let dataresult = await GetOrder(userID, TransactionID, OrderID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let resultOrder: Order = result?.Order
                let resultOrderDetail: Array<OrderDetailList> = result?.OrderDetailList
                setdataOrder(resultOrder)
                setdataOrderDetail(resultOrderDetail)
            }

        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }

    }
    ////GetTableMerge
    const onGetTableMerger_Logic = async (TransactionID: string) => {
        let data = dataTableMerger.filter(x => x.TableID != '')
        let data1 = dataTableMerger.filter(item => !data.includes(item))
        setdataTableMerger(data1)
        let dataresult = await GetTableMerge(userID, TransactionID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let dataresult: Array<TableMergeList> = result.TableMergeList;
                if (lodash.isEmpty(dataresult) == false) {
                    for (var i = 0; i < dataresult.length; i++) {
                        dataresult[i].isActive = false;
                        setdataTableMerger([...dataresult])
                    }
                }
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    ///GetTableToMerge
    const onGetTableToMer_Logic = async (LayoutID: string) => {
        let dataresult = await GetTableToMerge(userID, LayoutID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let data1: Array<TableList> = result.TableList;
                if (lodash.isEmpty(data1) == false) {
                    for (var i = 0; i < data1.length; i++) {
                        data1[i].isMerge = false;
                    }
                    setdataTableMer([...dataTableMer, ...data1])
                }
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    /// MerTableLogic
    const onMergeTable_Logic = async (TransactionID: string, TableMergeListID: Array<TableMergeList>) => {
        let dataresult = await MergeTable(userID, TransactionID, TableMergeListID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    ///RemoveFood
    const onRemoveFood_Logic = async (OrderID: string, OrderDetailID: string) => {
        let dataresult = await RemoveFood(userID, OrderID, OrderDetailID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }

        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    ///SendToCookAll
    const onSendToCookAll_Logic = async (OrderID: string) => {
        let dataresult = await SendToCookAll(userID, OrderID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let resultOrder: Order = result?.Order
                let resultOrderOrderdetail: Array<OrderDetailList> = result?.OrderDetailList
                setdataOrder(resultOrder)
                setdataOrderDetail(resultOrderOrderdetail)
            }
            else {

            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }

    }
    ///SendToCookSinge
    const onSendToSinge_Logic = async (OrderID: string, OrderDetailID: string) => {
        let dataresult = await SendToCookSingle(userID, OrderID, OrderDetailID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }

        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    ///SplitOrder
    const onSplitOrder_Logic = async (TransactionID: string,) => {
        let dataresult = await SplitOrder(userID, TransactionID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let resultOrder: Order = result?.Order
                let resultOrderOrderdetail: Array<OrderDetailList> = result?.OrderDetailList
                let resultOrderOrderlist: Array<Order> = result?.OrderList
                setdataOrder(resultOrder)
                setdataOrderDetail(resultOrderOrderdetail)
                setdataOrderList(resultOrderOrderlist)
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    ///TakeAway
    const onTakeAwayFood_onMenu = async (OrderID: string, OrderDetailID: string) => {
        let dataresult = await TakeAwayFood(userID, OrderID, OrderDetailID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }

    }
    const onMergeOrder_Logic = async (TransactionID: string, OrderID: string, OrderIDMerge: string) => {
        let dataresult = await MergeOrder(userID, TransactionID, OrderID, OrderIDMerge);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const TransferTable_Logic = async (TransacetionID: string, TableID: string) => {
        let dataresult = await TransferTable(userID, TransacetionID, TableID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const TransferFoodToTable_Logic = async (OrderID: string, OrderDetailList: Array<OrderDetailList>, TableID: string) => {
        let dataresult = await TransferFoodToTable(userID, OrderID, OrderDetailList, TableID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }

        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const TransferFoodToOrder_Logic = async (OrderID: string, OrderDetailList: Array<OrderDetailList>, OrderIDTo: string) => {
        let dataresult = await TransferFoodToOrder(userID, OrderID, OrderDetailList, OrderIDTo);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const SplitTable_Logic = async (TransactionID: string, TableMergeList: Array<TableMergeList>) => {
        let dataresult = await SplitTable(userID, TransactionID, TableMergeList);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const RequestPaymentOrder_Logic = async (TransactionID: string, OrderID: string) => {
        let dataresult = await RequestPaymentOrder(userID, TransactionID, OrderID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let resultOrder: Order = result?.Order
                let resultOrderList: Array<Order> = result?.OrderList

                setdataOrderList(resultOrderList)
                setdataOrder(resultOrder)

            }

        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const PaymentOrder_Logic = async (TransactionID: string, OrderID: string, PaymentInfo: PaymentInfo) => {
        try {
            let dataresult = await PaymentOrder(userID, TransactionID, OrderID, PaymentInfo);
            if (dataresult != null) {
                let result = dataresult.data;
                if (result?.StatusID == 1) {
                    return true;
                }
                else {
                    return false;
                }

            }
            else {
                actionMain.showModalWarm({
                    status: true,
                    title: 'Lỗi',
                    content: 'Không Thể Thực Hiện',
                });
            }
        } catch (error) {
            console.log(error)
        }

    }
    const CloseTable_Logic = async (TransactionID: string) => {
        let dataresult = await CloseTable(userID, TransactionID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const CancelTakeAwayFood_Logic = async (OrderID: string, OrderDetailID) => {
        let dataresult = await CancelTakeAwayFood(userID, OrderID, OrderDetailID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const ReAddHour_Logic = async (OrderID: string, OpenTime: string) => {
        let dataresult = await ReAddHour(userID, OrderID, OpenTime);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let resultOrder: Order = result?.Order
                let resultOrderOrderdetail: Array<OrderDetailList> = result?.OrderDetailList
                setdataOrder(resultOrder)
                setdataOrderDetail(resultOrderOrderdetail)

            }

        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const ExtendAndStopHour_Logic = async (OrderID: string, CloseTime: string) => {
        let dataresult = await ExtendAndStopHour(userID, OrderID, CloseTime);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const onDisCountOrder_Logic = async (OrderID: string, DiscountType: number, DiscountValue: number) => {
        let dataresult = await DiscountOrder(userID, OrderID, DiscountType, DiscountValue);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const CancelOrder_Logic = async (TransactionID: string, OrderID: string) => {
        let dataresult = await CancelOrder(userID, TransactionID, OrderID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }

    const QuickSearchCustomer_Logic = async (PageIndex: string, SearchString: string) => {
        let dataresult = await QuickSearchCustomer(userID, PageIndex, SearchString);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let data = result.CustomerList;
                setCusomterList(data)
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const GetAllCity_Logic = async () => {
        let dataresult = await GetAllCity(userID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let data = result.CityList;
                setDataCityList(data)
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const GetAllDistric_Logic = async (CityID: string) => {
        let dataresult = await GetAllDistrict(userID, CityID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let data = result.DistrictList;
                setDataDistricList(data)
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const GetAllDWard_Logic = async (DistricID: string) => {
        let dataresult = await GetAllWard(userID, DistricID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let data = result.WardList;
                setDataWardList(data)
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }

    const AddNewCustomer_Logic = async (Customer: Customer) => {
        let dataresult = await AddNewCustomer(userID, Customer);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const AddServiceCharge_Logic = async (OrderID: string, Price: string) => {
        let dataresult = await AddServiceCharge(userID, OrderID, Price);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let resultOrder: Order = result?.Order
                let resultOrderDetail: Array<OrderDetailList> = result?.OrderDetailList
                for (var i = 0; i < resultOrderDetail.length; i++) {
                    resultOrderDetail[i].QuantityOrg = resultOrderDetail[i].Quantity
                    setdataOrderDetail(resultOrderDetail)
                }
                setdataOrder(resultOrder)
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const AddOtherFood_Logic = async (OrderID: string, Quantity: string, Price: string, Notes: string) => {
        let dataresult = await AddOtherFood(userID, OrderID, Quantity, Price, Notes);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const UpdateCustomerOrder_Logic = async (OrderID: string, CustomerID: string) => {
        let dataresult = await UpdateCustomerOrder(userID, OrderID, CustomerID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const AddTipCharge_Logic = async (OrderID: string, Price: string) => {
        let dataresult = await AddTipCharge(userID, OrderID, Price);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let resultOrder: Order = result?.Order
                let resultOrderDetail: Array<OrderDetailList> = result?.OrderDetailList
                for (var i = 0; i < resultOrderDetail.length; i++) {
                    resultOrderDetail[i].QuantityOrg = resultOrderDetail[i].Quantity
                    setdataOrderDetail(resultOrderDetail)
                }
                setdataOrder(resultOrder)
                return true;
            }
            else {
                return false;
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Không Thể Thực Hiện',
            });
        }
    }
    const PrinterOrder_Logic = async (IP: string, Port: string, CheckCut: boolean, SizeWithPrinter: number) => {
        const huy = '[C]<img>data:image/png;base64,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</img>\n' +
            '[L]\n' +
            "[C]<u><font size='big'>Hoa Don Ban Hang</font></u>\n" +
            '[L]\n' +
            '[C]------------------------------------------' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x1\n' +
            '[L]<b>Gia:9.000d</b>[R]9.000d\n' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x2\n' +
            '[L]<b>Gia:9.000d</b>[R]18.000d\n' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x3\n' +
            '[L]<b>Gia:9.000d</b>[R]27.000d\n' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x1\n' +
            '[L]<b>Gia:9.000d</b>[R]9.000d\n' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x1\n' +
            '[L]<b>Gia:9.000d</b>[R]9.000d\n' +
            '[L]\n' +
            '[L]<b>Banh Bao My Huong</b>[R]x2\n' +
            '[L]<b>Gia:9.000d</b>[R]18.000d\n' +
            '[L]\n' +
            '[C]------------------------------------------ \n' +
            '[L]<b>Tong Tien</b>[R]500.000d\n' +
            '[L]\n' +
            '[L]<b>Phi Dich Vu</b>[R]9.000d\n' +
            '[L]<b>Tien Khach Dua</b>[R]1.000.000d\n' +
            '[L]<b>Thoi Lai</b>[R]500.000d\n' +
            '[L]\n' +
            '[L]\n' +
            '[C]------------------------------------------' +
            '[L]\n' +
            "[L]<font size='normal'>Khach Hang : Hoang Vinh Huy</font>\n" +
            '[L]Thanh Toan Tien Mat\n' +
            '[L]SDT:0901909514\n' +
            "[L]<font size='normal'>Nhan Vien : Hoang Vinh Huy</font>\n" +
            '[L]\n' +
            // "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
            '[L]\n' +
            '[L]\n' +
            '[L]\n' +
            '[L]\n' +
            "[C]<font size='normal'>Cam On Quy Khach</font>\n" +
            "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
            '[L]\n' +
            '[L]\n' +
            '[L]\n' +
            '[L]\n' +
            '[L]\n';

        ThermalPrinterModule.defaultConfig.ip = IP;
        ThermalPrinterModule.defaultConfig.port = Number.parseInt(Port);
        ThermalPrinterModule.defaultConfig.autoCut = CheckCut;
        ThermalPrinterModule.defaultConfig.printerWidthMM = SizeWithPrinter;
        try {
            await ThermalPrinterModule.printTcp({ payload: huy });
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Không Thể Kết Nối Máy In'
            });
        }
    }
    return {
        onGetTable_Logic,
        dataOrderList, dataOrder, dataOrderDetail, setdataOrder,
        setdataOrderDetail, setdataOrderList, Type, setType,
        dataGroups, setdataGroups,
        dataCommentFood, setdataCommentFood,
        dataTableMer, setdataTableMer,
        dataFoodList, setdataFoodList,
        dataTableMerger, setdataTableMerger,
        dataMenu, setDataMenu,
        onAddFood_Logic,
        onCancelTable_Logic,
        onChangeQuantityFood_Logic,
        onCommendFood_Logic,
        onDisCountFood_Logic,
        onGetCommentFood_Logic,
        TransferTable_Logic,
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
        onMergeOrder_Logic,
        TransferFoodToTable_Logic,
        TransferFoodToOrder_Logic,
        SplitTable_Logic,
        onViewTable_Logic,
        TransactionIDresult,
        setTransactionIDresult,
        RequestPaymentOrder_Logic,
        PaymentOrder_Logic,
        CloseTable_Logic,
        CancelTakeAwayFood_Logic, ReAddHour_Logic,
        ExtendAndStopHour_Logic, onDisCountOrder_Logic,
        CancelOrder_Logic,
        QuickSearchCustomer_Logic,
        setCusomterList,
        AddTipCharge_Logic,
        CustomerList,
        GetAllCity_Logic,
        DataCityList, setDataCityList,
        GetAllDistric_Logic, DataDistricList, setDataDistricList,
        GetAllDWard_Logic, DataWardList, setDataWardList,
        AddNewCustomer_Logic,
        AddServiceCharge_Logic,
        AddOtherFood_Logic, UpdateCustomerOrder_Logic,
        PrinterOrder_Logic
    }
}