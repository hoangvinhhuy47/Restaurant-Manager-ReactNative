import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';
import { OrderDetailList } from '../../components/object/Order'
export const TransferFoodToOrder = async (UserID: string, OrderID: string, OrderDetailList: Array<OrderDetailList>, OrderIDTo: string) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            OrderDetailList: OrderDetailList,
            OrderIDTo: OrderIDTo
        };
        return await $axios.post('TransferFoodToOrder', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
