import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Modal,


} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';
import { TextInputCustom } from '../userComponents/TextInputCustom';
import { Clock, TurnDowwn } from '../../assets/index';
import { Button, Card, Searchbar, IconButton, TextInput, } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { IconDetailCustom } from '../iconsCustom/IconDetailCustom';
import getDataByThing from '../../utils/getDataByThing';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import lodash from 'lodash'
import { DialogAddCustomer } from './DialogAddCustomer';
import { CustomerList } from '../object/Order';
interface DialogCustomer {
    onPressClose: any;
    onPressOK: any;
}
export const DialogCustomer = (props: DialogCustomer) => {
    const { onPressClose, onPressOK, } = props;
    const { onGetTable_Logic, QuickSearchCustomer_Logic, GetAllCity_Logic, GetAllDWard_Logic, GetAllDistric_Logic, DataDistricList, DataWardList, setDataCityList, setDataDistricList, setDataWardList
        , DataCityList, CustomerList, setCusomterList } = DetailDesk_Logic(props)
    const [SearchString, setSearchString] = useState('')
    const [PageIndex, setPageIndex] = useState(0)
    const [DataCustomer, setDataCustomer] = useState(new Array<CustomerList>())
    const [Visible, setVisible] = useState(false)

    const getDataCustomer = async () => {
        await QuickSearchCustomer_Logic(PageIndex.toString(), SearchString);
    }

    useEffect(() => {
        getDataCustomer()
        return () => { };
    }, []);
    useEffect(() => { viewData() },
        [DataCustomer])
    useEffect(() => { setDataCustomer(CustomerList) },
        [CustomerList])
    const viewHeader = () => {
        return (
            <View style={{ height: 70, width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TextInput
                    style={{ height: 40, alignContent: 'center', justifyContent: 'center', paddingVertical: 0, width: '70%', padding: 0, fontSize: 15, backgroundColor: 'white', }}
                    mode='outlined'
                    onChangeText={(value) => onTextChange(value)}
                    label='Tên/Số Điện Thoại'>
                </TextInput>
                <View style={{ flexDirection: 'column', width: '25%', justifyContent: 'space-around', height: '100%' }}>
                    <TouchableOpacity
                        onPress={() => { getDataCustomer() }}
                        style={{ height: 30, width: '100%', elevation: 1, backgroundColor: mainColors.greenscolor, borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'white', fontFamily: Fonts.Roboto_Slab_Regular }}>Tìm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true)
                        }}
                        style={{ height: 30, width: '100%', elevation: 1, backgroundColor: mainColors.greenscolor, borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'white', fontFamily: Fonts.Roboto_Slab_Regular }}>Thêm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const viewDataItem = (item, index) => {
        return (
            <View >
                <TouchableOpacity onPress={() => { onPressOK(item) }}>
                    <View style={{ width: '100%', height: 'auto', backgroundColor: index % 2 == 0 ? 'white' : '#DBFAF4', marginTop: 5, alignItems: 'flex-start', justifyContent: 'center', borderRadius: 2, elevation: 2 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 30 }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', fontSize: 12 }}>{index + 1}.{item.ObjectName}</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', fontSize: 12 }}>{item.ObjectPhone}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 'auto' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', fontSize: 12 }}>{item.ShipAddress}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    const viewData = () => {
        return (
            <View style={{ height: hp(55) - 55, width: '100%', padding: 1, backgroundColor: 'white', elevation: 1 }}>
                {!lodash.isEmpty(DataCustomer) ?
                    <FlatList
                        keyExtractor={(item, index) => 'key' + index}
                        data={DataCustomer}
                        renderItem={({ item, index }) => (viewDataItem(item, index))}
                    ></FlatList> :
                    <View></View>}
            </View>)
    }

    const onTextChange = (value) => {
        setSearchString(value)
        if (!!value) {
            let data = CustomerList;
            let result = data.filter(item => {
                let a = getDataByThing.removeAccents(item.ObjectName).indexOf(value) > -1;
                return a;
            })
            setDataCustomer(result)
        }
        else {
            setDataCustomer(CustomerList)
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.containerItem}>
                    <View style={[styles.headerView]}>
                        <Text style={styles.headerTitle}>Danh Sách Khách Hàng</Text>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onPressClose() }}>
                            <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: hp(55), width: '100%', flexDirection: 'column' }}>
                        {viewHeader()}
                        <View style={{ width: '100%', height: 1, backgroundColor: mainColors.smokecolor }}></View>
                        {viewData()}
                    </View>
                    <View style={{ height: hp(8), width: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { onPressClose() }}
                            style={{ alignItems: 'center', marginRight: 5, justifyContent: 'center', height: 35, width: 85, elevation: 2, backgroundColor: mainColors.greenscolor, borderRadius: 5 }}>
                            <Text style={{ fontSize: hp(1.8), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.whiteColor }}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible(false) }}>
                    <DialogAddCustomer
                        onPressClose={() => setVisible(false)}
                        onPressOK={() => { setVisible(false) }}
                    ></DialogAddCustomer>
                </Modal>
            </View >
        </TouchableWithoutFeedback >
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        position: 'relative',
        zIndex: 0,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    containerItem: {
        backgroundColor: '#FFF',
        borderRadius: 2,
        height: hp(70),
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    view_center: {
        height: hp(20),
        width: '100%',
        backgroundColor: '#FFFFFF',
        elevation: 2,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text_center: {
        fontFamily: Fonts.Roboto_Slab_Regular,
        fontSize: hp(2.2),
    },

    headerView: {
        height: hp(6),
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: mainColors.greenscolor,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2
    },
    headerTitle: {
        color: 'white',
        fontSize: 16,
        fontFamily: Fonts.Roboto_Slab_Regular
    },

    button: {
        backgroundColor: '#ffff',
        marginBottom: 3,
        width: wp(65),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
    },
    shadowAndroid: {
        elevation: 5,
    },
    shadowIos: {
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.21,
        shadowRadius: 4,
    },
    textButton: {
        fontSize: hp(2.5),
        fontFamily: Fonts.Roboto_Slab_Regular,
        color: mainColors.greenscolor,
    },
    viewBottomButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    },
    bodypu: {
        marginBottom: 5,
        width: '100%',
        height: hp(20),
        justifyContent: 'center',
        alignItems: 'center'
    }
});