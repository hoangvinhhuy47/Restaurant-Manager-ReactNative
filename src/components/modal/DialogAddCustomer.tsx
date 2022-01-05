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
    ScrollView,
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
import { Button, Card, Searchbar, IconButton, TextInput, Checkbox, } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { IconDetailCustom } from '../iconsCustom/IconDetailCustom';
import getDataByThing from '../../utils/getDataByThing';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import lodash from 'lodash'
import { DetailDesk_Logic } from '../../screens/homeScreen/detailDesk/DetailDeskLogic'
import { FlatList } from 'react-native-gesture-handler';
import { Customer } from '../object/Order';
import Toast from 'react-native-toast-message';
interface DialogAddCustomer {
    onPressClose?: any;
    onPressOK?: any;
}
export const DialogAddCustomer = (props: DialogAddCustomer) => {
    const { onPressClose, onPressOK } = props;
    const [CityName, setCityName] = useState('')
    const [Gender, setGender] = useState(false)
    const [DistricName, setDistricName] = useState('')
    const [WardName, setWardName] = useState('')
    const [AddressString, setAddressString] = useState(WardName + ',' + DistricName + ',' + CityName)
    const [VisibleCity, setVisibleCity] = useState(false)
    const [VisibleDistric, setVisibleDistric] = useState(false)
    const [VisibleWard, setVisibleWard] = useState(false)
    const [Check, setCheck] = useState(false)
    const [Customer, setCustomer] = useState<Customer>({
        CustomerID: "00000000-0000-0000-0000-000000000000",
        Code: '',
        FullName: '',
        CellPhone: '',
        CityID: '',
        DistrictID: '',
        WardID: '',
        TaxCode: '',
        TaxCompanyName: '',
        TaxCompanyAddress: '',
        TaxEmail: '',
        ShortAddress: '',
        Gender: 1
    })
    const { AddNewCustomer_Logic, onGetTable_Logic, QuickSearchCustomer_Logic, GetAllCity_Logic, GetAllDWard_Logic, GetAllDistric_Logic, DataDistricList, DataWardList, setDataCityList, setDataDistricList, setDataWardList
        , DataCityList, CustomerList, setCusomterList } = DetailDesk_Logic(props)
    useEffect(() => {
        onGetCity()
        return () => { };
    }, []);
    const onGetCity = async () => {
        await GetAllCity_Logic()
    }
    const onGetDisTric = async () => {
        await GetAllDistric_Logic(Customer.CityID)
    }
    const onGetWard = async () => {
        await GetAllDWard_Logic(Customer.DistrictID)
    }
    const onAddNewCustomer = async () => {
        if (Customer.Code != '') {
            if (Customer.FullName != '') {
                if (Customer.CellPhone != '') {
                    if (await AddNewCustomer_Logic(Customer)) {
                        onPressOK()
                    }
                    else {
                        Toast.show({
                            type: 'error',
                            text1: 'Thông báo',
                            text2: 'Không Thành Công'
                        });
                    }
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: 'Vui Lòng Nhập SDT'
                    });
                }
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Vui Lòng Nhập Tên Khách Hàng'
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Vui Lòng Nhập Mã Khách Hàng'
            });
        }


    }
    useEffect(() => { onGetDisTric() }, [Customer.CityID])
    useEffect(() => { onGetWard() }, [Customer.DistrictID])
    useEffect(() => {
        ViewData()
    }, [DistricName, WardName, CityName])
    useEffect(() => {
        if (!lodash.isEmpty(DataDistricList)) {
            setDistricName(DataDistricList[0].DistrictName)
            setCustomer({ ...Customer, DistrictID: DataDistricList[0].DistrictID })
            setAddressString(WardName + ',' + DistricName + ',' + CityName)
            Customer.ShortAddress = WardName + ',' + DistricName + ',' + CityName
            setCustomer({ ...Customer })
            Customer.DistrictID = DataDistricList[0].DistrictID
            setCustomer({ ...Customer })
        }
    }, [DataDistricList])
    useEffect(() => {
        if (!lodash.isEmpty(DataCityList)) {
            setCityName(DataCityList[0].CityName)
            Customer.CityID = DataCityList[0].CityID
            setCustomer({ ...Customer })
            setAddressString(WardName + ',' + DistricName + ',' + CityName)
            Customer.ShortAddress = WardName + ',' + DistricName + ',' + CityName
            setCustomer({ ...Customer })
        }
    }, [DataCityList])
    useEffect(() => {
        if (!lodash.isEmpty(DataWardList)) {
            setWardName(DataWardList[0].WardName)
            setAddressString(WardName + ',' + DistricName + ',' + CityName)
            Customer.ShortAddress = WardName + ',' + DistricName + ',' + CityName
            setCustomer({ ...Customer })
            Customer.WardID = DataWardList[0].WardID
            setCustomer({ ...Customer })

        }
    }, [DataWardList])
    const ViewData = () => {
        return (
            <View style={{ height: hp(75), width: '100%', padding: 5, backgroundColor: 'white', elevation: 2 }}>
                <ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Mã Khách Hàng</Text>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                    </View>
                    <TextInput
                        style={{ height: hp(7), paddingVertical: 0, width: '100%', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                        mode='outlined'
                        onChangeText={(value) => {
                            setCustomer({ ...Customer, Code: value })
                        }}
                        placeholder='Mã Khách Hàng'
                        value={Customer.Code}
                    ></TextInput>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Tên Khách Hàng</Text>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                    </View>
                    <TextInput
                        style={{ height: hp(7), paddingVertical: 0, width: '100%', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                        mode='outlined'
                        onChangeText={(value) => {
                            setCustomer({ ...Customer, FullName: value })
                        }}
                        placeholder='Tên Khách Hàng'
                        value={Customer.FullName}
                    ></TextInput>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>SDT Khách Hàng</Text>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                    </View>
                    <TextInput
                        style={{ height: hp(7), width: '100%', paddingVertical: 0, fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                        mode='outlined'
                        keyboardType={'number-pad'}
                        onChangeText={(value) => {
                            let newText = '';
                            let numbers = '0123456789';
                            if (!!value) {
                                for (var i = 0; i < value.length; i++) {
                                    if (numbers.indexOf(value[i]) > -1) {
                                        newText = newText + value[i];
                                    }
                                }
                                setCustomer({ ...Customer, CellPhone: newText })
                            }
                            else {
                                setCustomer({ ...Customer, CellPhone: value })
                            }
                        }}
                        placeholder='Số Điện Thoại'
                        value={Customer.CellPhone}
                    ></TextInput>
                    <Toast position='top' autoHide={true} topOffset={0} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Giới Tính</Text>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                    </View>
                    <View style={{ width: '80%', flexDirection: 'row' }}>
                        {Platform.select({
                            ios: (
                                <Checkbox.Item mode='ios' position={'leading'} onPress={() => {
                                    Customer.Gender = 1
                                    setCustomer({ ...Customer })
                                    setGender(false)
                                }} labelStyle={{ fontSize: hp(2), color: mainColors.blue }} status={Gender != true ? 'checked' : 'unchecked'} label={'Nam'} ></Checkbox.Item>
                            ),
                            android: <Checkbox.Item mode='android' position={'leading'} onPress={() => {
                                Customer.Gender = 1
                                setCustomer({ ...Customer })
                                setGender(false)
                            }} labelStyle={{ fontSize: hp(2), color: mainColors.blue }} status={Gender != true ? 'checked' : 'unchecked'} label={'Nam'} ></Checkbox.Item>

                        })}
                        {Platform.select({
                            ios: (
                                <Checkbox.Item mode='ios' position={'leading'} onPress={() => {
                                    Customer.Gender = 0
                                    setCustomer({ ...Customer })
                                    setGender(true)
                                }} labelStyle={{ fontSize: hp(2), color: mainColors.blue }} status={Gender == true ? 'checked' : 'unchecked'} label={'Nữ'} ></Checkbox.Item>
                            ),
                            android: <Checkbox.Item mode='android' position={'leading'} onPress={() => {
                                Customer.Gender = 0
                                setCustomer({ ...Customer })
                                setGender(true)
                            }} labelStyle={{ fontSize: hp(2), color: mainColors.blue }} status={Gender == true ? 'checked' : 'unchecked'} label={'Nữ'} ></Checkbox.Item>

                        })}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Thành Phố</Text>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setVisibleCity(true)}
                        style={{ height: hp(7), width: '100%', backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: mainColors.blackColor, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 10, flexDirection: 'row' }}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>{CityName}</Text>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'red' }}>🔻</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Quận/Huyện</Text>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setVisibleDistric(true)}
                        style={{ height: hp(7), width: '100%', backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: mainColors.blackColor, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 10, flexDirection: 'row' }}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>{DistricName}</Text>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'red' }}>🔻</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Phường/Xã</Text>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setVisibleWard(true)}
                        style={{ height: hp(7), width: '100%', backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: mainColors.blackColor, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 10, flexDirection: 'row' }}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>{WardName}</Text>
                        <Text style={{ fontSize: hp(2.2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'red' }}>🔻</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Địa Chỉ</Text>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                    </View>
                    <View style={{ height: hp(5), width: '100%', backgroundColor: 'white', borderRadius: 3, borderWidth: 1, borderColor: mainColors.blackColor, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 10, flexDirection: 'row' }}>
                        <Text style={{ fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>{WardName},{DistricName},{CityName}</Text>
                    </View>
                    <View style={{ width: '80%' }}>
                        {Platform.select({
                            ios: (
                                <Checkbox.Item mode='ios' position={'leading'} onPress={() => { setCheck(!Check) }} labelStyle={{ fontSize: hp(2), color: mainColors.blue }} status={Check == true ? 'checked' : 'unchecked'} label={'Thông Tin Hóa Đơn VAT'} ></Checkbox.Item>
                            ),
                            android: <Checkbox.Item mode='android' position={'leading'} onPress={() => { setCheck(!Check) }} labelStyle={{ fontSize: hp(2), color: mainColors.blue }} status={Check == true ? 'checked' : 'unchecked'} label={'Thông Tin Hóa Đơn VAT'} ></Checkbox.Item>

                        })}
                    </View>
                    {Check ? <View style={{ flexDirection: 'column', width: '100%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Mã Công Ty</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(7), paddingVertical: 0, width: '100%', fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            onChangeText={(value) => {
                                setCustomer({ ...Customer, TaxCode: value })
                            }}
                            placeholder='Mã Công Ty'
                            value={Customer.TaxCode}
                        ></TextInput>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Tên Công Ty</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(7), width: '100%', paddingVertical: 0, fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            onChangeText={(value) => {
                                setCustomer({ ...Customer, TaxCompanyName: value })
                            }}
                            placeholder='Tên Công Ty'
                            value={Customer.TaxCompanyName}
                        ></TextInput>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Địa Chỉ Công Ty</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(7), width: '100%', paddingVertical: 0, fontSize: hp(2), fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            onChangeText={(value) => {
                                setCustomer({ ...Customer, TaxCompanyAddress: value })
                            }}
                            placeholder='Địa Chỉ Công Ty'
                            value={Customer.TaxCompanyAddress}
                        ></TextInput>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#050571' }}>Email Công Ty</Text>
                            <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: hp(1.8), color: '#A20101' }}>*</Text>
                        </View>
                        <TextInput
                            style={{ height: hp(7), width: '100%', fontSize: hp(2), paddingVertical: 0, fontFamily: Fonts.Roboto_Slab_Regular, color: 'black', backgroundColor: 'white' }}
                            mode='outlined'
                            onChangeText={(value) => {
                                setCustomer({ ...Customer, TaxEmail: value })
                            }}
                            placeholder='Email Công Ty'
                            value={Customer.TaxEmail}
                        ></TextInput>
                    </View> : <View></View>}
                </ScrollView>
            </View>
        )
    }
    const ViewDataCity = () => {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', height: hp(70), width: '100%' }}>
                        <View style={[styles.headerView]}>
                            <Text style={styles.headerTitle}>Danh Sách Tỉnh/Thành Phố</Text>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { setVisibleCity(false) }}>
                                <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: hp(60), width: '100%', backgroundColor: 'white', elevation: 2 }}>
                            <FlatList
                                data={DataCityList}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCustomer({ ...Customer, CityID: item.CityID })
                                            setCityName(item.CityName)
                                            setVisibleCity(false)
                                        }}
                                        style={{ margin: 2, paddingLeft: 2, height: 40, width: '100%', backgroundColor: 'white', elevation: 2, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text>{index + 1}.{item.CityName}</Text>
                                    </TouchableOpacity>}
                            ></FlatList>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    const ViewDataDistric = () => {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', height: hp(70), width: '100%' }}>
                        <View style={[styles.headerView]}>
                            <Text style={styles.headerTitle}>Danh Sách Quận/Huyện</Text>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { setVisibleDistric(false) }}>
                                <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: hp(60), width: '100%', backgroundColor: 'white', elevation: 2 }}>
                            <FlatList
                                data={DataDistricList}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity
                                        onPress={() => {

                                            setCustomer({ ...Customer, DistrictID: item.DistrictID })
                                            setDistricName(item.DistrictName)
                                            setVisibleDistric(false)
                                        }}
                                        style={{ margin: 2, paddingLeft: 2, height: 40, width: '100%', backgroundColor: 'white', elevation: 2, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text>{index + 1}.{item.DistrictName}</Text>
                                    </TouchableOpacity>}
                            ></FlatList>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    const ViewDataWard = () => {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', height: hp(70), width: '100%' }}>
                        <View style={[styles.headerView]}>
                            <Text style={styles.headerTitle}>Danh Sách Xã/Phường</Text>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { setVisibleWard(false) }}>
                                <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: hp(60), width: '100%', backgroundColor: 'white', elevation: 2 }}>
                            <FlatList
                                data={DataWardList}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Customer.ShortAddress = WardName + ',' + DistricName + ',' + CityName
                                            setCustomer({ ...Customer })
                                            setAddressString(WardName + ',' + DistricName + ',' + CityName)
                                            setWardName(item.WardName)
                                            setCustomer({ ...Customer, WardID: item.WardID })
                                            setVisibleWard(false)
                                        }}
                                        style={{ margin: 2, paddingLeft: 2, height: 40, width: '100%', backgroundColor: 'white', elevation: 2, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text>{index + 1}.{item.WardName}</Text>
                                    </TouchableOpacity>}
                            ></FlatList>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return (
        <TouchableWithoutFeedback style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', height: hp(90), width: '100%', flexDirection: 'column' }}>

                    <View style={[styles.headerView]}>
                        <Text style={styles.headerTitle}>Thêm Khách Hàng</Text>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onPressClose() }}>
                            <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                        </TouchableOpacity>
                    </View>
                    {ViewData()}

                    <View style={{ height: hp(8), width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            onPress={() => { onPressClose() }}
                            style={{ alignItems: 'center', marginRight: 5, justifyContent: 'center', height: hp(5), width: '35%', elevation: 2, backgroundColor: mainColors.smokecolor, borderRadius: 5 }}>
                            <Text style={{ fontSize: hp(1.8), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.blackColor }}>Đóng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                onAddNewCustomer()
                            }}
                            style={{ alignItems: 'center', marginRight: 5, justifyContent: 'center', height: hp(5), width: '35%', elevation: 2, backgroundColor: mainColors.greenscolor, borderRadius: 5 }}>
                            <Text style={{ fontSize: hp(1.8), fontFamily: Fonts.Roboto_Slab_Regular, color: mainColors.whiteColor }}>Xác Nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    animationType='slide'
                    transparent
                    visible={VisibleCity}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisibleCity(false) }}>
                    {ViewDataCity()}
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={VisibleDistric}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisibleDistric(false) }}>
                    {ViewDataDistric()}
                </Modal>
                <Modal
                    animationType='slide'
                    transparent
                    visible={VisibleWard}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisibleWard(false) }}>
                    {ViewDataWard()}
                </Modal>
            </View>
        </TouchableWithoutFeedback>
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
        height: hp(40),
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