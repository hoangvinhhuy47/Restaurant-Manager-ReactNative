
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  ViewStyle,
  TouchableOpacity,
  SafeAreaView,
  DrawerLayoutAndroid,

} from 'react-native';
import { BackgroundBig } from '../BackgroundBig';
import { useSelector, useDispatch } from 'react-redux'
import Ripple from 'react-native-material-ripple';
import { LOGOUTICON, AVATAR, MenuHeader, ICONRIGHT } from '../../../assets';
import styles from './BackgroundBigScreen.style';

import { actionMain } from '../../../utils/mainActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, { useState, useEffect, useRef } from 'react';
import { Fonts, mainColors } from '../../../constants';
interface BackgroundBigScreen {
  containerStyle?: ViewStyle;
  children?: any;
  navigation?: any;
  onPress?: any
}
export const BackgroundBigScreen = (props: BackgroundBigScreen) => {
  const { children, containerStyle, navigation } = props;
  const dispatch = useDispatch();
  const drawer = useRef(null);
  const goBack = () => {
    () => { }
    // dispatch({ type: 'SIGN_OUT' });
  };
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,

  }));

  return (
    <BackgroundBig>
      <View style={styles.header}>
        <Ripple style={styles.iconExit} onPress={() => { }}>
          <Text style={{ fontSize: hp(2), color: 'white', fontFamily: Fonts.Roboto_Stab_Bold, textDecorationLine: 'underline' }}> HR SoftWareViet</Text>
        </Ripple>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.menuText}>{profileInfo?.FullName ?? 'Chưa đăng nhập'}</Text>
          <Image source={AVATAR} style={styles.iconAvatar} />
        </View>
      </View>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        {children}
      </SafeAreaView>
      <View></View>


    </BackgroundBig>
  );
};
