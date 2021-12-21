import React, { useEffect, useState } from 'react';
import {
  BackHandler, ToastAndroid,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { configApp } from '../../services/config';
import { ModalCustom } from '../../components/modal';
import { actionMain } from '../../utils/mainActions';
import getDataByThing from '../../utils/getDataByThing';

export const configApi = (props: any) => {
  const dispatch = useDispatch();

  const [guidId, setGuidId] = useState('');
  const [siteId, setSiteId] = useState('1011');
  const [storeId, setStoreId] = useState('kbl_1011');
  const [urlString, setUrlString] = useState('https://demorestaurant.softwareviet.com');



  const onPress = async () => {
    let isValidUrl = getDataByThing.validateURL(urlString);
    if (!isValidUrl || !urlString && !siteId && !storeId) {
      ToastAndroid.show(
        'Không Thành Công',
        ToastAndroid.CENTER
      );
    }
    else if (urlString && siteId && storeId && isValidUrl) {
      let _configApp = await configApp(urlString, siteId, storeId);
      //console.log(configApp);
      let result = _configApp.data
      if (result?.StatusID == 1) {
        // Toast.show({
        //   type: 'success',
        //   text1: 'Đăng nhập cấu hình thành công!',
        // });
        const dataConfig = {
          GuidID: result?.GUID,
          SiteID: siteId,
          StoreID: storeId,
          UrlString: urlString
        };
        dispatch({ type: 'CONFIG_SUCCESS', payload: dataConfig });
      }
      else {
        actionMain.showModalWarm({
          status: true,
          title: "Đăng Nhập Thất Bại",
          content: "Dữ Liệu Của Bạn Không Đúng",
        })
      }
    } else if (!siteId) {
      ToastAndroid.show(
        'Mã công ty bị trống!',
        ToastAndroid.CENTER
      );
    } else if (!storeId) {
      ToastAndroid.show(
        'Mã cửa hàng bị trống',
        ToastAndroid.CENTER
      );
    }
  };

  const onPressBack = (value: any) => {
    // if(isExitApp == false){
    //   setTimeout(() => {
    //     setIsExitApp(true);
    //   }, 1000);
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Bấm lần nữa để thoát app!',
    //   });
    // }else{
    dispatch({ type: 'CLEAR_CONFIG' });
    BackHandler.exitApp();
    // }

  };
  return {
    guidId,
    setGuidId,
    siteId,
    setSiteId,
    storeId,
    setStoreId,
    urlString,
    setUrlString,
    onPress,
    onPressBack,
  };
};
