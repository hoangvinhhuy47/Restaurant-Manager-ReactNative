import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,


    KeyboardAvoidingView,



} from 'react-native';
import { RadioButton, List, Checkbox, ProgressBar, TextInput } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { All, EXITICON, MenuDetail, MenuHeader, Minus, Plus, Search, TurnDowwn } from '../../../assets';
import { ItemMenuListCustom } from '../../../components/items/ItemMenuListCustom';
import { Fonts, mainColors } from '../../../constants';
import styles from './MenuDetail.style';
import lodash from 'lodash'
import { FlatList } from 'react-native-gesture-handler';
import { ItemMenuItemCustom } from '../../../components/items/ItemMenuItemCustom';
import { ItemFoodListCustom } from '../../../components/items/ItemFoodListCustom';
import { DetailDesk_Logic } from './DetailDeskLogic'
import LinearGradient from 'react-native-linear-gradient'
import { ToastProvider } from '../../../components/userComponents/ToastProvider'
import { FoodList } from '../../../components/object/Order';
import { ItemFoodList_ImageCustom } from '../../../components/items/ItemFoodList_ImageCustom';
import { SwipeListView } from 'react-native-swipe-list-view';
import getDataByThing from '../../../utils/getDataByThing';
import Toast from 'react-native-toast-message';
interface MenuDetail {
    onPress: any,
    navigation?: any
    OrderID?: any
    StatusOrder: number;
}

export const MenuDetailView = (props: MenuDetail) => {
    const { onPress, navigation, OrderID, StatusOrder } = props
    const [TimeOut, setTimeOut] = useState(0);
    const [StatusALL, setStatusALL] = useState(true)
    const { onGetTable_Logic,
        dataOrderList, dataOrder, dataOrderDetail, setdataOrder,
        setdataOrderDetail, setdataOrderList, Type, setType,
        dataGroups, setdataGroups,
        dataCommentFood, setdataCommentFood,
        dataFoodList, setdataFoodList,
        dataTableMerger, setdataTableMerger,
        dataMenu, setDataMenu,
        onAddFood_Logic,
        onCancelTable_Logic,
        onChangeQuantityFood_Logic,
        onCommendFood_Logic,
        onDisCountFood_Logic,
        onGetCommentFood_Logic,
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
        onTakeAwayFood_onMenu } = DetailDesk_Logic(props)

    const [DataFoodScreen, setDataFoodScreen] = useState(Array<FoodList>())
    const [Quantity, setQuantity] = useState(1)

    const GetData = async () => {
        await onGetMenu_Logic()
        await onGetMenuDetail_Logic("");
    }
    useEffect(() => {
        setDataFoodScreen(dataFoodList)
    }, [dataFoodList])
    useEffect(() => {
        setDataMenu([])
        GetData();
        return () => { };
    }, []);
    const onPressItem = async (value: any) => {
        setStatusALL(true)
        for (var i = 0; i < dataMenu.length; i++) {
            if (i == value) {
                if (dataMenu[i].Show == false) {
                    dataMenu[i].Show = true;
                    setDataMenu([...dataMenu])
                    await onGetMenuDetail_Logic(dataMenu[value].MenuID);
                }
            }
            else {
                dataMenu[i].Show = false;
                setDataMenu([...dataMenu])
            }
        }

    }
    const onPressMenuItem = async (value: any, ID: string, OptionSelect: boolean) => {
        if (!OptionSelect) {
            setStatusALL(false)
            for (var i = 0; i < dataGroups.length; i++) {
                if (i == value) {
                    if (!dataGroups[i].isShow) {
                        dataGroups[i].isShow = true;
                        setdataGroups([...dataGroups])
                        let dataFood = dataFoodList.filter(x => x.SortOrder == ID)
                        let dataFoodShow = dataFoodList.filter(item => dataFood.includes(item))
                        setDataFoodScreen(dataFoodShow)
                    }
                }
                else {
                    dataGroups[i].isShow = false;
                    setdataGroups([...dataGroups])
                }
            }
        }
        else {
            for (var i = 0; i < dataGroups.length; i++) {
                dataGroups[i].isShow = false;
                setdataGroups([...dataGroups])
            }
            setStatusALL(true)
            setDataFoodScreen(dataFoodList)
        }
    }

    const onAddFoodToMenu = async (FoodID: string, FoodName: string, Quantity: number) => {
        if (StatusOrder == 1) {
            if (await onAddFood_Logic(OrderID, FoodID, Quantity)) {
                // ToastAndroid.show('Đã Thêm:  ' + FoodName, ToastAndroid.CENTER)
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'không thể thực hiện'
                });
            }
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: 'Vui lòng tách hóa đơn trước'
            });

        }

    }
    const ViewDataFoodList = () => {
        return (
            <LinearGradient colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']} style={{ height: '85%', width: '100%', marginTop: 2, justifyContent: 'center', alignItems: 'center', elevation: 1 }}>
                <FlatList
                    numColumns={3}
                    data={DataFoodScreen}

                    renderItem={({ item, index }) =>
                        <View>
                            <ItemFoodListCustom
                                text={item.FoodName}
                                Price={item.Price}
                                onPressItem={() => {
                                    onAddFoodToMenu(item.FoodID, item.FoodName, Quantity);
                                    setQuantity(1)
                                }}
                                index={index}
                                CategoryID={item.SortOrder}
                                FoodID={item.FoodID}
                                Color={item.Color}
                            ></ItemFoodListCustom>
                        </View>
                    }
                />

            </LinearGradient>)
    }
    const ViewDataGroupList = (item, index) => {
        return (
            <ItemMenuItemCustom
                text={item.CategoryName}
                isActive={item.isShow}
                onPressItem={() => { onPressMenuItem(index, item.SortOrder, false) }}
                index={index}
                CategoryID={item.SortOrder}
            ></ItemMenuItemCustom>
        )
    }
    const loadding = () => {
        return (
            <ProgressBar progress={TimeOut} color={mainColors.blackColor} />
        )
    }
    useEffect(() => {
        loadding()
    }, [TimeOut])
    useEffect(() => { ViewDataFoodList() }, [DataFoodScreen])
    const onChangeText = (value: any) => {
        // console.log(value)
        if (!!value) {
            let data = DataFoodScreen;
            let result = data.filter(item => {
                let a = getDataByThing.removeAccents(item.FoodName).indexOf(value) > -1;
                return a;
            })
            setDataFoodScreen(result)
        }
        else {
            setDataFoodScreen(dataFoodList)
        }
    }
    const viewHeaderSearch = () => {
        return (
            <View style={{ height: 50, width: '100%', backgroundColor: 'white', elevation: 2, flexDirection: 'row', paddingLeft: 2, paddingRight: 2, alignItems: 'center', justifyContent: 'space-around' }}>
                <TextInput
                    style={{ height: 40, width: '65%', backgroundColor: 'white', fontSize: 17, fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}
                    mode={'outlined'}
                    onChangeText={onChangeText}
                    label={'Tìm Kiếm'}>
                </TextInput>
                <View style={{ width: '30%', height: 50, justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white' }}>
                        <TouchableOpacity
                            onPress={() => { Quantity > 1 ? setQuantity(Quantity - 1) : {} }}
                            style={{ height: 20, width: 20, borderRadius: 5, borderColor: 'black', borderWidth: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={Minus} style={{ height: '80%', width: '80%' }}></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 17, fontFamily: Fonts.Roboto_Slab_Regular, color: 'black' }}>{Quantity.toString()}</Text>
                        <TouchableOpacity
                            onPress={() => { setQuantity(Quantity + 1) }}
                            style={{ height: 20, width: 20, borderRadius: 5, borderColor: 'black', borderWidth: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={Plus} style={{ height: '80%', width: '80%' }}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={false}
            style={{
                height: hp(100),
                width: wp(100),
            }}>

            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'flex-end', justifyContent: 'flex-end', }}>
                <Toast position='top' autoHide={true} topOffset={0} />
                <View style={styles.container}>

                    {lodash.isEmpty(dataMenu) == false ?
                        <View style={styles.container}>
                            <View style={{ height: hp(5), width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 10, paddingRight: 10, backgroundColor: mainColors.greenscolor }}>
                                <View style={{ height: hp(5), flexDirection: 'row', alignItems: 'center' }} >
                                    <TouchableOpacity onPress={() => { }}>
                                        <Image source={MenuHeader} style={{ height: hp(2.5), width: hp(2.5) }}></Image>
                                    </TouchableOpacity>
                                    <Text style={{ marginLeft: 5, fontSize: hp(2.5), color: 'white', fontFamily: Fonts.Roboto_Slab_Regular }}>Danh Sách Món</Text>
                                </View>
                                <TouchableOpacity onPress={() => { onPress() }}>
                                    <Image source={TurnDowwn} style={{ height: hp(2.5), width: hp(2.5) }}></Image>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: hp(6), marginBottom: 5, width: '100%', alignItems: 'center', justifyContent: 'center', paddingLeft: 2, backgroundColor: mainColors.greenscolor }}>
                                <FlatList
                                    horizontal
                                    data={dataMenu}
                                    renderItem={({ item, index }) =>
                                        <ItemMenuListCustom
                                            text={item.MenuName}
                                            isActive={item.Show}
                                            onPressItem={() => { onPressItem(index) }}
                                            index={index}
                                            MenuID={item.MenuID}
                                        ></ItemMenuListCustom>}
                                />
                            </View>
                            <View style={{ width: '100%', height: 2 }}>
                                {loadding()}
                            </View>
                            {viewHeaderSearch()}

                            {!lodash.isEmpty(dataFoodList) && Type != 1 ?
                                <View style={{ height: hp(6), width: '100%', marginTop: 10, justifyContent: 'center', flexDirection: 'row' }}>
                                    <ItemMenuItemCustom
                                        text={'ALL'}
                                        onPressItem={() => { onPressMenuItem(0, !lodash.isEmpty(dataGroups) ? dataGroups[0].SortOrder : '', true) }}
                                        isActive={StatusALL}
                                    ></ItemMenuItemCustom>
                                    <FlatList
                                        horizontal
                                        data={dataGroups}
                                        renderItem={({ item, index }) => ViewDataGroupList(item, index)}
                                    />
                                </View>
                                : <View></View>}


                            {!lodash.isEmpty(DataFoodScreen) ?
                                ViewDataFoodList()

                                : <View></View>}
                        </View>
                        :
                        <View></View>}

                </View>
            </View>
            <Toast position='top' autoHide={true} topOffset={0} />
        </KeyboardAvoidingView>
    )
}
