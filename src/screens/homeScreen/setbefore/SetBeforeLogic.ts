import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { TableList, ReservationList } from '../../../components/object/Order';
import lodash from 'lodash'
import { GetTable } from '../../../services/home/GetTable'
import { ToastAndroid } from 'react-native';
import { GetReservation } from '../../../services/setbefore/GetReservation';
import { AddReservation } from '../../../services/setbefore/AddReservation';
import { UpdateReservation } from '../../../services/setbefore/UpdateReservation';
import { CancelReservation } from '../../../services/setbefore/CancelCheckIn';
export const SetBeforeLogic = (props: any) => {
    const { profileInfo } = useSelector((state: any) => ({
        profileInfo: state?.auth?.profileInfo,
    }));
    const [userID, setUserID] = useState(profileInfo.UserID);
    const [dataReservation, setdataReservation] = useState(new Array<ReservationList>());
    const GetReservation_Logic = async (FromDate: string, ToDate: string, PageIndex: number, SearchString: string) => {
        let dataresult = await GetReservation(userID, FromDate, ToDate, PageIndex, SearchString);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let data1: Array<ReservationList> = result.ReservationList;
                if (lodash.isEmpty(data1) == false) {
                    for (var i = 0; i < data1.length; i++) {
                        data1[i].isActive = false;
                    }
                    setdataReservation(data1)
                    return true;
                }
                else {
                    setdataReservation([])
                    return false;
                }
            }
        }
        else {
            actionMain.showModalWarm({
                status: true,
                title: 'Lỗi',
                content: 'Vui Lòng Kiểm Tra Kết Nối Mạng',
            });
        }
    }
    const AddReservation_Logic = async (Reservation: ReservationList) => {
        let dataresult = await AddReservation(userID, Reservation);
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
                content: 'Vui Lòng Kiểm Tra Kết Nối Mạng',
            });
        }
    }
    const UpdateReservation_Logic = async (Reservation: ReservationList) => {
        let dataresult = await UpdateReservation(userID, Reservation);
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
                content: 'Vui Lòng Kiểm Tra Kết Nối Mạng',
            });
        }
    }
    const CancelCheckIn_Logic = async (ReservationID: string, Reason: string) => {
        let dataresult = await CancelReservation(userID, ReservationID, Reason);
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
                content: 'Vui Lòng Kiểm Tra Kết Nối Mạng',
            });
        }
    }
    return {
        GetReservation_Logic,
        dataReservation, setdataReservation, AddReservation_Logic, UpdateReservation_Logic,
        CancelCheckIn_Logic
    }
}