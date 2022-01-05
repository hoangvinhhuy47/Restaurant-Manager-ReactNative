import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { AreaList } from '../../../components/object/Order';
import lodash from 'lodash'
import { GetArea } from '../../../services/home/GetArea'
import { ToastAndroid } from 'react-native';
export const GetArea_Logic = (props: any) => {
    const { profileInfo } = useSelector((state: any) => ({
        profileInfo: state?.auth?.profileInfo,
    }));
    const [userID, setUserID] = useState(profileInfo.UserID);
    const [data, setData] = useState(new Array<AreaList>());
    const onGetArea = async (Type: number) => {
        let dataresult = await GetArea(userID, Type);
        if (dataresult != null) {
            let result = dataresult.data;
            if (result?.StatusID == 1) {
                let data1: Array<AreaList> = result.AreaList;
                if (lodash.isEmpty(data1) == false) {
                    for (var i = 0; i < data1.length; i++) {
                        if (i == 0) {
                            data1[i].Active = true;
                        }
                        else {
                            data1[i].Active = false;
                        }
                    }
                    setData([...data, ...data1])

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
        onGetArea,
        data,
        setData
    }
}