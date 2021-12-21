import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { Order, OrderDetailList, CommentList, MenuList, TableMergeList, GroupList, FoodList, TableList, PaymentInfo } from '../../../components/object/Order';
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
    const ConnectPrinter_Logic = () => {
        RNPrint.print({
            html: '<style>.container-in{width: 80mm;height: auto;padding: 10px;}.container-in header img{width: 20px;height: 20px;}.header{display: flex;flex-direction: row;align-items: center;}.header h4{display: block;padding-left: 5px;margin-block-start: 0;margin-block-end: 0;margin-inline-start: 0;margin-inline-end: 0;font-weight: 600;}.title-head{text-align: center;}.title-head h3{margin: 10px 0;}.line{width: 100%;border-bottom: 2px gray solid;display: block;margin-block-start: 0;margin-block-end: 0;margin-inline-start: 0px;margin-inline-end: 0px;}.body-in table {width: 100%;}.footer-in p {margin-block-start: 0;margin-block-end: 0;margin-inline-start: 0px;margin-inline-end: 0px;}.text-center{text-align: center;}.text-right{text-align: right;}.text-left{text-align: left;}</style><div class="container-in"><header><div class="header"><h4>Tên công ty</h4></div><div class="title-head"><h2>Hóa đơn bán hàng</h2></div><a>Họ tên: Vĩnh Huy 47</a></header><p class="line"></p><div class="body-in"><table><thead><th class="text-center">Tên</th><th class="text-center">Số lượng</th><th class="text-right">Giá</th></thead><tbody><tr><td class="text-left">Bò xào rau muống</td><td class="text-center">x2</td><td class="text-right">60000</td></tr><tr><td class="text-left">Cơm chiên dương châu</td><td class="text-center">x1</td><td class="text-right">25000</td></tr><tr><td class="text-left">Nước suối</td><td class="text-center">x1</td><td class="text-right">10000</td></tr><tr><td class="text-left">Pepsi</td><td class="text-center">x1</td><td class="text-right">15000</td></tr></tbody><tfoot><tr><td colspan="2" class="text-right">Thanh toán:</td><td class="text-right">100000</td></tr></tfoot></table></div><p class="line"></p><div class="footer-in"><p>Ngày tháng năm</a><p>Số hóa đơn: hd01</a></div></div>',
        })
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
        ConnectPrinter_Logic, CancelOrder_Logic
    }
}