import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { TableList } from '../../../components/object/Order';
import lodash from 'lodash'
import { GetTable } from '../../../services/home/GetTable'
import { ToastAndroid } from 'react-native';
export const GetTable_Logic = (props: any) => {
    const { profileInfo } = useSelector((state: any) => ({
        profileInfo: state?.auth?.profileInfo,
    }));
    const [userID, setUserID] = useState(profileInfo.UserID);
    const [dataTable, setDataTable] = useState(new Array<TableList>());
    const onGetTable = async (ID: string) => {
        let dataresult = await GetTable(userID, ID);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let data1: Array<TableList> = result.TableList;
                if (lodash.isEmpty(data1) == false) {
                    // for (var i = 0; i < data1.length; i++) {
                    //     if (i == 0) {
                    //         data1[i].Active = true;
                    //     }
                    //     else {
                    //         data1[i].Active = false;
                    //     }
                    // }
                    setDataTable(data1)

                }
                else{
                    setDataTable([])
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
    return {
        onGetTable,
        dataTable,
        setDataTable
    }
}