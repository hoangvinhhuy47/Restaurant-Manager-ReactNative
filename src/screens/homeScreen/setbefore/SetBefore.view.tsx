import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,

  BackHandler,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  FlatList
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ButtonCustom } from '../../../components';
import { BackgroundBigScreen } from '../../../components/backgroundScreen/backgroundBigScreen/BackgroundBigScreen.view';
import styles from './SetBefore.style';
import Ripple from 'react-native-material-ripple';
import { actionMain } from '../../../utils/mainActions';
import { Canlendar, Customer, Filter, Phone, Search } from '../../../assets';
import { TextInput } from 'react-native-paper';
import { Fonts, mainColors } from '../../../constants';
import { ItemSetBeforeCustom } from '../../../components/items/ItemSetBeforeCustom';
import { Menu, MenuItem } from 'react-native-material-menu';
import getDataByThing from '../../../utils/getDataByThing';
import DatePicker from 'react-native-date-picker'
import { SetBeforeLogic } from './SetBeforeLogic'
import lodash from 'lodash'
import { DialogAddReservation } from '../../../components/modal/DialogAddReservation';
import { DialogOpenTableNotHasHourMoney } from '../../../components/modal/DialogOpenTableNotHasHourMoney';
import { DialogUpdateReservation } from '../../../components/modal/DialogUpdateReservation';
import { DialogCancelCheckIn } from '../../../components/modal/DialogCancelCheckIn';
import Autocomplete from 'react-native-autocomplete-input';
import { List, ReservationList } from '../../../components/object/Order';
const SetBefore = (props: any) => {
  const transportion = name => {
    props.navigation.navigate(name);
  };
  const [TypeSelectDate, setTypeSelectDate] = useState(false);
  const [VisbleMenu, setVisbleMenu] = useState(false)
  const [FromDateScreen, setFromDateScreen] = useState('')
  const [ToDateScreen, setToDateScreen] = useState('')
  const [ToDateSend, setToDateSend] = useState(new Date())
  const [FromDateSend, setFromDateSend] = useState(new Date())
  const [VisbleDialogDate, setVisbleDialogDate] = useState(false)
  const [pageIndex, setpageIndex] = useState(1)
  const [SearchString, setSearchString] = useState('')
  const [VisbleAddReservation, setVisbleAddReservation] = useState(false)
  const [VisbleUpdateReservation, setVisbleUpdateReservation] = useState(false)
  const [VisbleCancelReservation, setVisbleCancelReservation] = useState(false)
  const [IndexItem, setIndexItem] = useState(0)
  const [dataSearchString, setdataSearchString] = useState(Array<ReservationList>())
  const { dataReservation, GetReservation_Logic, setdataReservation } = SetBeforeLogic(props)
  const GetDateTime = () => {
    var today = new Date();
    setFromDateScreen(getDataByThing.getDayMonthYearString(today))
    setToDateScreen(getDataByThing.getDayMonthYearString(today))
    setToDateSend(today)
    setFromDateSend(today)

  }
  const onChangeDate = (value) => {
    if (TypeSelectDate) {
      setToDateSend(value)
      setToDateScreen(getDataByThing.getDayMonthYearString(value))
    }
    else {
      setFromDateScreen(getDataByThing.getDayMonthYearString(value))
      setFromDateSend(value)
    }
  }
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      GetDateTime()
      if (!!ToDateSend && !!FromDateSend) {
        onGetReservation()
        setIndexItem(0)
      }
    });
    return () => { };
  }, []);
  useEffect(() => {
    ViewHeader()
  },
    [FromDateScreen, ToDateScreen])
  useEffect(() => {
    ViewData()
  },
    [dataReservation])
  const onGetReservation = async () => {
    setIndexItem(0)
    if (await GetReservation_Logic(getDataByThing.getDateTimeFormatToAPI(FromDateSend), getDataByThing.getDateTimeFormatToAPI(ToDateSend), pageIndex, SearchString)) {
    }
  }
  const onPressItem = (index: any) => {
    for (var i = 0; i < dataReservation.length; i++) {
      if (i == index) {
        dataReservation[i].isActive = !dataReservation[i].isActive;
        setdataReservation([...dataReservation])
      }
      else {
        dataReservation[i].isActive = false;
        setdataReservation([...dataReservation])
      }
    }
  }
  const onChangText = (text) => {
    if (!!text) {
      text = getDataByThing.removeAccents(text.toString()).toLowerCase();
      let result = dataReservation.filter(item => {
        let result1 =
          getDataByThing.removeAccents(item.SearchString).indexOf(text) > -1;
        return result1;
      })
      try {
        setdataSearchString(result)
      } catch (error) {
        console.log(error)
      }

      console.log(result)
    }
    else {
      setdataSearchString([])
    }
  }
  const ViewHeader = () => {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ height: 38, width: wp(60), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 15, color: 'black' }}>Từ Ngày</Text>
            <TouchableOpacity onPress={() => {
              setTypeSelectDate(false)
              setVisbleDialogDate(!VisbleDialogDate)
            }} style={{ marginLeft: 5, height: 32, width: wp(40), borderRadius: 2, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 15, color: 'black' }}>{FromDateScreen}🔻</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 38, width: wp(60), flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 15, color: 'black' }}>Đến Ngày</Text>
            <TouchableOpacity onPress={() => {
              setTypeSelectDate(true)
              setVisbleDialogDate(!VisbleDialogDate)
            }} style={{ marginLeft: 5, height: 32, width: wp(40), borderRadius: 2, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 15, color: 'black' }}>{ToDateScreen}🔻</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={{ height: 42, width: wp(60), backgroundColor: 'white', fontSize: hp(2), color: 'black' }}
            mode='outlined'
            // label={'SDT, Tên Khách Hàng'}
            placeholder={'SDT, Tên Khách Hàng'}
            value={SearchString}
            onChangeText={(value) => { setSearchString(value) }}
          ></TextInput>
          {/* <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            data={dataSearchString}
            defaultValue={SearchString}
            onChangeText={(text) => { onChangText(text) }}
            placeholder={"Tìm Kiếm SDT,Tên"}
            listStyle={{ maxHeight: 320, width: '100%' }}
            containerStyle={{
              backgroundColor: 'white',
              borderRadius: 2,
            }}
            style={{
              height: 40,
              width: wp(60),
              color: 'black',
              fontSize: 15,
              fontFamily: Fonts.Roboto_Slab_Regular,
            }}
            keyExtractor={item => item.ReservationID}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                }}>
                <Text style={{ fontSize: 15, color: 'black' }}>
                  {item.SearchString}
                </Text>
              </TouchableOpacity> 
            )}
          >

          </Autocomplete> */}
        </View>
        <View style={{
          height: '100%', width: wp(30),
          padding: 4,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'column'
        }}>
          <TouchableOpacity
            onPress={() => { onGetReservation() }}
            style={{ width: wp(25), height: 35, backgroundColor: mainColors.greenscolor, borderRadius: 5, elevation: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, color: 'white', fontFamily: Fonts.Roboto_Slab_Regular }}>Tìm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setVisbleAddReservation(true) }}
            style={{ width: wp(25), height: 35, backgroundColor: mainColors.greenscolor, borderRadius: 5, elevation: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, color: 'white', fontFamily: Fonts.Roboto_Slab_Regular }}>Thêm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const ViewDialogDate = () => {
    return (
      <TouchableWithoutFeedback onPress={() => setVisbleDialogDate(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white', height: hp(30), width: '100%', borderRadius: 5, flexDirection: 'column', alignItems: 'center' }}>
            <DatePicker
              style={{ height: hp(22), elevation: 2, backgroundColor: 'white', width: wp(99), borderRadius: 5 }}
              fadeToColor={'black'}
              date={TypeSelectDate ? ToDateSend : FromDateSend}
              mode={'date'}
              onDateChange={(value) => { onChangeDate(value) }}
              androidVariant={'nativeAndroid'}
              textColor={mainColors.greenscolor}
            ></DatePicker>
            <View style={{ height: hp(8), width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => {
                GetDateTime()
                setVisbleDialogDate(false)
              }
              } style={{ height: hp(5), width: '30%', backgroundColor: 'white', elevation: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 2 }}>
                <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), color: mainColors.blackColor }}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisbleDialogDate(false)} style={{ height: hp(5), width: '30%', backgroundColor: mainColors.greenscolor, elevation: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 2 }}>
                <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(2), color: mainColors.whiteColor }}>Xác Nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback >
    )
  }

  const ViewData = () => {
    return (
      <View style={{ width: '100%', height: hp(60) }}>
        <FlatList
          data={dataReservation}
          renderItem={({ item, index }) =>
            <ItemSetBeforeCustom
              CustomerName={item.CustomerName}
              VisitedDate={getDataByThing.getDayMonthYearTimeString(item.CreatedDate)}
              CustomerPhone={item.CustomerPhone}
              Persons={item.Persons}
              Notes={item.Notes}
              index={index}
              isActive={item.isActive}
              Status={item.Status}
              onPressItem={() => {
                setIndexItem(index)
                onPressItem(index)
              }}
              onPressItemUpdate={() => item.Status == 2 || item.Status == 3 ? {} : setVisbleUpdateReservation(true)}
              onPressItemCancel={() => { item.Status == 2 || item.Status == 3 ? {} : setVisbleCancelReservation(true) }}
            ></ItemSetBeforeCustom>}
        ></FlatList >
      </View >
    )
  }
  return (
    <BackgroundBigScreen navigation={props.navigation}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {ViewHeader()}
        <View style={{ height: 25, width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
          <Text style={{ fontSize: 15, color: mainColors.greenscolor, textDecorationLine: 'underline', fontFamily: Fonts.Roboto_Slab_Regular }}>Danh Sách Hóa Đơn</Text>
          <Menu
            visible={VisbleMenu}
            onRequestClose={() => { setVisbleMenu(false) }}
            anchor={<TouchableOpacity onPress={() => { setVisbleMenu(true) }}>
              <Image source={Filter} style={{ height: 25, width: 25 }}></Image>
            </TouchableOpacity>}
          >
            <MenuItem onPress={() => {
            }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 20, margin: 10 }} >
              <Text style={{ fontSize: 15 }}>All</Text></MenuItem>
            <MenuItem onPress={() => {

            }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 20, margin: 10 }} >
              <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: mainColors.blue, borderWidth: 1, borderColor: 'black' }}></View>
              <Text style={{ fontSize: 15 }}>    Mới Tạo</Text></MenuItem>
            <MenuItem onPress={() => {
            }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 20, margin: 10 }} >
              <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: mainColors.whiteColor, borderWidth: 1, borderColor: mainColors.smokecolor }}></View>
              <Text style={{ fontSize: 15, marginLeft: 10 }}>    Đã Checkin</Text></MenuItem>
            <MenuItem onPress={() => {
            }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 20, margin: 10 }} >
              <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: mainColors.red, borderWidth: 1, borderColor: mainColors.whiteColor }}></View>
              <Text style={{ fontSize: 15 }}>    Đã Hủy</Text></MenuItem>
          </Menu>
        </View>
        {ViewData()}
        <Modal
          animationType='slide'
          transparent
          visible={VisbleDialogDate}
          presentationStyle='formSheet'
          style={{ justifyContent: 'flex-end', margin: 0 }}
          onDismiss={() => { setVisbleDialogDate(false) }} >
          {ViewDialogDate()}
        </Modal>
        <Modal
          animationType='slide'
          transparent
          visible={VisbleAddReservation}
          presentationStyle='formSheet'
          style={{ justifyContent: 'flex-end', margin: 0 }}
          onDismiss={() => { setVisbleAddReservation(false) }} >
          <DialogAddReservation
            onPressClose={() => { setVisbleAddReservation(false) }}
            onPressOK={() => {
              setVisbleAddReservation(false)
              onGetReservation()
            }}
          ></DialogAddReservation>
        </Modal>
        <Modal
          animationType='slide'
          transparent
          visible={VisbleUpdateReservation}
          presentationStyle='formSheet'
          style={{ justifyContent: 'flex-end', margin: 0 }}
          onDismiss={() => { setVisbleUpdateReservation(false) }} >
          <DialogUpdateReservation
            ReservationSend={dataReservation[IndexItem]}
            onPressClose={() => { setVisbleUpdateReservation(false) }}
            onPressOK={() => {
              setVisbleUpdateReservation(false)
              onGetReservation()
            }}
          ></DialogUpdateReservation>
        </Modal>
        <Modal
          animationType='slide'
          transparent
          visible={VisbleCancelReservation}
          presentationStyle='formSheet'
          style={{ justifyContent: 'flex-end', margin: 0 }}
          onDismiss={() => { setVisbleCancelReservation(false) }} >
          <DialogCancelCheckIn
            ReservationID={!lodash.isEmpty(dataReservation) ? dataReservation[IndexItem].ReservationID : ''}
            onPressClose={() => { setVisbleCancelReservation(false) }}
            onPressOK={() => {
              setVisbleCancelReservation(false)
              onGetReservation()
            }}
          ></DialogCancelCheckIn>
        </Modal>
      </View>
    </BackgroundBigScreen>
  );
};

export default SetBefore;
