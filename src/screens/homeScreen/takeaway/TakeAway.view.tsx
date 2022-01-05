import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  BackHandler,
  Alert,
  Modal,

} from 'react-native';
import { Menu, MenuItem, } from 'react-native-material-menu';
import { ButtonCustom } from '../../../components';
import { BackgroundBigScreen } from '../../../components/backgroundScreen/backgroundBigScreen/BackgroundBigScreen.view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';
import { actionMain } from '../../../utils/mainActions';
import {
  Filter
} from '../../../assets';
import { ItemHomeCustom } from '../../../components/items/ItemHomeCustom';
import { Fonts, mainColors } from '../../../constants';
import { FlatList } from 'react-native-gesture-handler';
import { ItemHomeDeskCustom } from '../../../components/items/ItemHomeDeskCustom';
import { GetArea_Logic } from './GetArea_logic'
import { GetTable_Logic } from './GetTable_Logic'
import lodash from 'lodash'
import { DialogOpentable } from '../../../components/modal/DialogOpentable';
import { TableList } from '../../../components/object/Order';
import getDataByThing from '../../../utils/getDataByThing';
import { DetailDesk_Logic } from '../detailDesk/DetailDeskLogic'
import { DialogOpenTableNotHasHourMoney } from '../../../components/modal/DialogOpenTableNotHasHourMoney';
const TakeAway = (props: any) => {
  const [exitApp, setExitApp] = useState(false);
  const [VisbleMenu, setVisbleMenu] = useState(false)
  const { onGetTable_Logic, TransactionIDresult,
    setTransactionIDresult } = DetailDesk_Logic(props)
  const { data, onGetArea, setData } = GetArea_Logic(props)
  const { dataTable, onGetTable, setDataTable } = GetTable_Logic(props)
  const [IndexArea, setIndexArea] = useState(0)
  const [Visible, setVisible] = useState(false)
  const [VisibleDialogNotHandHours, setVisibleDialogNotHandHours] = useState(false)
  const [AreaIDSend, setAreaIDSend] = useState('')
  const [TableIDSend, setTableIDSend] = useState('')
  const [TableCaptionSend, setTableCaptionSend] = useState('')
  const [TypeTableSend, setTypeTableSend] = useState(1)
  const [LayoutIDSend, setLayoutIDSend] = useState('')
  const [StatusSend, setStatusSend] = useState('')
  const [DataDeskScreen, setDataDeskScreen] = useState(new Array<TableList>());

  const transportion = async (name, AreaID, TableID, TableCaption, TypeTable, LayoutID, Status, TranSacTionID) => {
    setAreaIDSend(AreaID);
    setTableIDSend(TableID)
    setTableCaptionSend(TableCaption)
    setTypeTableSend(2)
    setLayoutIDSend(LayoutID)
    setStatusSend(Status)
    switch (Status) {
      case 1:
        if (!data[IndexArea].HasHourMoney) {
          setVisibleDialogNotHandHours(true)
        }
        else {
          setVisible(true)
        }
        break;
      case 2:
        props.navigation.push(name, {
          TypeTable: 2,
          AreaID: AreaID,
          TableID: TableID,
          TableCaption: TableCaption,
          LayoutID: LayoutID,
          TransactionID: TranSacTionID
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setDataDeskScreen(dataTable)
  }, [dataTable])

  useEffect(() => {
    viewItemDesk()
  }, [DataDeskScreen])
  const GoToDetailScreen = async (value) => {
    var today
    if (value != '') {
      today = new Date();
    }
    else {
      today = value;
    }
    try {

      let result = await onGetTable_Logic(LayoutIDSend, TableIDSend, TableCaptionSend, getDataByThing.getDateTimeFormatToAPI(today))
      if (result != null) {
        setVisibleDialogNotHandHours(false)
        setVisible(false)
        props.navigation.push('DetailDesk', {
          TypeTable: 2,
          AreaID: AreaIDSend,
          TableID: TableIDSend,
          TableCaption: TableCaptionSend,
          LayoutID: LayoutIDSend,
          TransactionID: result
        });

      }

    } catch (error) {

    }

  }

  const ChangeStatusDesk = (StatusDesk: any) => {
    setVisbleMenu(false)
    if (StatusDesk == 0) {
      setDataDeskScreen(dataTable)
    }
    else if (StatusDesk == 1) {
      let Data = dataTable.filter(x => x.Status == 1)
      let DataTable = dataTable.filter(item => Data.includes(item))
      setDataDeskScreen(DataTable)
    }
    else if (StatusDesk == 2) {
      let Data = dataTable.filter(x => x.Status == 2)
      let DataTable = dataTable.filter(item => Data.includes(item))
      setDataDeskScreen(DataTable)

    }
    else if (StatusDesk == 3) {
      let Data = dataTable.filter(x => x.Status == 3)
      let DataTable = dataTable.filter(item => Data.includes(item))
      setDataDeskScreen(DataTable)

    }
    else if (StatusDesk == 4) {
      let Data = dataTable.filter(x => x.Status == 4)
      let DataTable = dataTable.filter(item => Data.includes(item))
      setDataDeskScreen(DataTable)

    }
    else if (StatusDesk == 5) {
      let Data = dataTable.filter(x => x.Status == 5)
      let DataTable = dataTable.filter(item => Data.includes(item))
      setDataDeskScreen(DataTable)

    }

  }


  const viewDataItemDesk = (item, index) => {
    return (
      <ItemHomeDeskCustom
        onPressItem={() => { transportion('DetailDesk', data[IndexArea].AreaID, item.TableID, item.Caption, 1, item.LayoutID, item.Status, item.TransactionID) }}
        text={item.Caption}
        time={item.OpenTime}
        Type={item.Status}
      ></ItemHomeDeskCustom>
    )
  }
  const viewItemDesk = () => {
    return (
      <View style={styles.container_child2}>
        <View style={styles.container_child3_itemdesk}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={3}
            keyExtractor={(item, index) => 'key' + index}
            data={DataDeskScreen}
            renderItem={({ item, index }) => (viewDataItemDesk(item, index))}
          ></FlatList>
        </View>
      </View>
    )
  }
  const GetData = async () => {
    await onGetArea(2);
  }
  const GetTable = async () => {
    await onGetTable(data[IndexArea].LayoutID);
  }
  useEffect(() => {
    GetTable()
  }, [data])
  const onPressItem = async (value: any, ID: string) => {
    actionMain.loading(true, '');
    for (var i = 0; i < data.length; i++) {
      if (i == value) {
        if (!data[i].Active) {
          data[i].Active = true;
          setData([...data])
          setIndexArea(value)
          await onGetTable(ID);
        }
      }
      else {
        data[i].Active = false;
        setData([...data])
      }
    }
    actionMain.loading(false, '');
  }
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setData([])
      setDataDeskScreen([])
      GetData();
    });
    return () => { };
  }, []);
  return (
    <BackgroundBigScreen navigation={props.navigation}>
      <View style={styles.container}>
        {lodash.isEmpty(data) == false || data.length != 0 ?
          <View style={styles.container_viewArea}>
            <FlatList
              snapToAlignment={'center'}
              horizontal
              keyExtractor={(item, index) => 'key' + index}
              data={data}
              renderItem={({ item, index }) => (
                <ItemHomeCustom
                  LayoutID={item.LayoutID}
                  index={index}
                  onPressItem={() => onPressItem(index, item.LayoutID)}
                  isActive={item.Active}
                  text={item.LayoutName}
                ></ItemHomeCustom>)}
            ></FlatList>
          </View> : <View></View>}

        <View style={{ height: 25, width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flexDirection: 'row' }}>
          <Text style={{ fontSize: 15, color: mainColors.greenscolor, textDecorationLine: 'underline', fontFamily: Fonts.Roboto_Slab_Regular }}>Danh Sách Bàn</Text>
          <Menu
            visible={VisbleMenu}
            onRequestClose={() => { setVisbleMenu(false) }}
            anchor={<TouchableOpacity onPress={() => { setVisbleMenu(true) }}>
              <Image source={Filter} style={{ height: 25, width: 25 }}></Image>
            </TouchableOpacity>}
          >
            <MenuItem onPress={() => {
              ChangeStatusDesk(0)
            }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 20, margin: 10 }} >

              <Text style={{ fontSize: 15 }}>All</Text></MenuItem>
            {/* Bàn trống */}
            <MenuItem onPress={() => {

              ChangeStatusDesk(1)
            }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 20, margin: 10 }} >
              <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: mainColors.whiteColor, borderWidth: 1, borderColor: 'black' }}></View>
              <Text style={{ fontSize: 15 }}>    Trống</Text></MenuItem>
            {/* Bàn Có Người Ngồi */}
            <MenuItem onPress={() => {

              ChangeStatusDesk(2)
            }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 20, margin: 10 }} >
              <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: mainColors.red, borderWidth: 1, borderColor: mainColors.whiteColor }}></View>
              <Text style={{ fontSize: 15, marginLeft: 10 }}>    Đang Phục Vụ</Text></MenuItem>
            {/* Yêu Cầu Thanh Toán */}
            <MenuItem onPress={() => {

              ChangeStatusDesk(5)
            }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 20, margin: 10 }} >
              <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: mainColors.yellow, borderWidth: 1, borderColor: mainColors.whiteColor }}></View>
              <Text style={{ fontSize: 15 }}>    YC Thanh Toán</Text></MenuItem>
            {/* Thanh Toán */}
            <MenuItem onPress={() => {

              ChangeStatusDesk(3)
            }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 20, margin: 10 }} >
              <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: mainColors.blue, borderWidth: 1, borderColor: mainColors.whiteColor }}></View>
              <Text style={{ fontSize: 15 }}>    Đã Thanh Toán</Text></MenuItem>

            {/* Bàn Hư */}
            <MenuItem onPress={() => {

              ChangeStatusDesk(4)
            }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 20, margin: 10 }} >
              <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: mainColors.smokecolor, borderWidth: 1, borderColor: mainColors.whiteColor }}></View>
              <Text style={{ fontSize: 15 }}>    Hư</Text></MenuItem>
          </Menu>
        </View>
        {viewItemDesk()}
        <Modal
          animationType='slide'
          transparent
          visible={Visible}
          presentationStyle='formSheet'
          style={{ justifyContent: 'flex-end', margin: 0 }}
          onDismiss={() => { setVisible(false) }} >
          <DialogOpentable
            type={!lodash.isEmpty(data) ? data[IndexArea].HasHourMoney : false}
            caption={TableCaptionSend}
            onPressClose={() => { setVisible(false) }}
            onPressOK={(value) => { GoToDetailScreen(value) }}
          ></DialogOpentable>
        </Modal>
        <Modal
          animationType='slide'
          transparent
          visible={VisibleDialogNotHandHours}
          presentationStyle='formSheet'
          style={{ justifyContent: 'flex-end', margin: 0 }}
          onDismiss={() => { setVisibleDialogNotHandHours(false) }} >
          <DialogOpenTableNotHasHourMoney
            type={!lodash.isEmpty(data) ? data[IndexArea].HasHourMoney : false}
            caption={TableCaptionSend}
            onPressClose={() => { setVisibleDialogNotHandHours(false) }}
            onPressOK={() => { GoToDetailScreen('') }}
          ></DialogOpenTableNotHasHourMoney>
        </Modal>
      </View>
    </BackgroundBigScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.greenscolor,
    flex: 1,
    flexDirection: 'column',
  },
  container_viewArea: {
    backgroundColor: mainColors.whiteColor,
    height: hp(7),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp(2),
    paddingRight: wp(2),
    elevation: 5,
    marginTop: hp(2),
  },
  container_child2: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flexDirection: 'column'
  },
  text_header: {
    fontSize: hp(2.2),
    fontFamily: Fonts.Roboto_Stab_Bold,
    color: mainColors.greenscolor,
    marginTop: 5,
    marginLeft: 10
  },
  container_child2_itemheader: {
    padding: 5,
    width: '100%',
    height: hp(4),
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container_child2_itemheader_1: {
    padding: 5,
    width: '100%',
    height: hp(4),
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  container_child3_itemdesk: {
    width: '100%',
    height: hp(72),
    margin: 5,
    alignItems: 'center',

  },

})

export default TakeAway;






