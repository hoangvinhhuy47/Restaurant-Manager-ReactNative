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
    ToastAndroid,


} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts, mainColors } from '../../constants';
import Ripple from 'react-native-material-ripple';
import { Clock, TurnDowwn } from '../../assets/index';
import { Button, Card, Searchbar, IconButton, } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import getDataByThing from '../../utils/getDataByThing';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { SwipeListView } from 'react-native-swipe-list-view';
import { DialogPrintOrder } from '../../components/modal/DialogPrintOrder';
import { useDispatch, useSelector } from 'react-redux';
import { PrinterList } from '../../components/object/Order';
interface ViewPrinter {
    onShow: any;
    onSucessfull: any;
}

export const ViewPrinter = (props: ViewPrinter) => {
    const { onShow, onSucessfull, } = props;
    const [Visible_PrinterOrder, setVisible_PrinterOrder] = useState(false)
    const { isFinger } = useSelector((state: any) => ({
        isFinger: state?.auth?.isFinger,
    }));
    const [List, setList] = useState(Array<PrinterList>())
    const dispatch = useDispatch();

    useEffect(() => {
        setList(isFinger)
        return () => { };
    }, []);
    const onSetActiveDevice = (value: any) => {
        for (var i = 0; i < List.length; i++) {
            if (i == value) {
                List[i].isActive = true
                setList([...List])
            }
            else {
                List[i].isActive = false
                setList([...List])
            }
        }
        dispatch({ type: 'SET_FINGER', payload: List });
    }
    const renderHiddenItem = (data, rowMap) => {
        return (<View style={{ height: 100, width: wp(100), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <View></View>
            <View style={{ height: 100, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        List.splice(data.index, 1)
                        setList([...List])
                        dispatch({ type: 'SET_FINGER', payload: List });
                    }}
                    style={{ height: 70, width: 60, backgroundColor: mainColors.red, borderRadius: 10, marginRight: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, color: 'white', fontFamily: Fonts.Roboto_Slab_Regular }}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        onSetActiveDevice(data.index)
                    }}
                    style={{ height: 70, width: 60, backgroundColor: mainColors.blue, borderRadius: 10, marginRight: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, color: 'white', fontFamily: Fonts.Roboto_Slab_Regular }}>Đặt</Text>
                </TouchableOpacity>
            </View>
        </View>)
    }
    const ViewData = () => {
        return (<View style={{ width: '100%', backgroundColor: 'white' }}>
            <SwipeListView
                closeOnRowPress={true}
                closeOnRowOpen={true}
                data={List}
                rightOpenValue={-120}
                previewOpenDelay={3000}
                previewOpenValue={-120}
                renderHiddenItem={renderHiddenItem}
                renderItem={({ item, index }) =>
                    <View style={{ width: '100%', paddingLeft: 2, height: 90, marginTop: 5, borderRadius: 5, borderColor: mainColors.smokecolor, backgroundColor: 'white', borderWidth: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 14, color: 'red' }}>{index + 1}. {item.NamePrinter}</Text>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 13, color: 'black' }}>Khổ Giấy: {item.SizePaper}mm</Text>
                        <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 13, color: 'black' }}>Địa Chỉ IP:{item.IpAdress}:{item.Port}</Text>
                        {item.isActive ? <Text style={{ fontFamily: Fonts.Roboto_Slab_Regular, fontSize: 13, color: 'blue' }}>Tình Trạng:Máy In Mặt Định</Text> : <View></View>}
                    </View>
                }
            >
            </SwipeListView>
        </View>)
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.containerItem}>
                    <View style={[styles.headerView]}>
                        <Text style={styles.headerTitle}>Thiết Lập Máy In</Text>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 25, width: 25 }} onPress={() => { onSucessfull() }}>
                            <Image style={{ height: 25, width: 25 }} source={TurnDowwn} ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: hp(65), alignItems: 'flex-start', flexDirection: 'row', backgroundColor: 'white', elevation: 2 }}>
                        {ViewData()}

                    </View>
                    <View style={styles.viewBottomButton}>
                        <TouchableOpacity
                            style={[styles.button, { borderColor: 'white' },
                            Platform.OS == 'ios' ? styles.shadowIos : styles.shadowAndroid,
                            ]}
                            onPress={() => {
                                setVisible_PrinterOrder(true)
                            }}>
                            <Text style={styles.textButton}>Thêm Máy In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType='slide'
                    transparent
                    visible={Visible_PrinterOrder}
                    presentationStyle='formSheet'
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    onDismiss={() => { setVisible_PrinterOrder(false) }}>
                    <DialogPrintOrder
                        ListPrinter={List}
                        onPressClose={() => { setVisible_PrinterOrder(false) }}
                        onPressOK={() => {

                        }}></DialogPrintOrder>
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
        height: hp(80),
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
        width: wp(55),
        height: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
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
        fontSize: hp(2),
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