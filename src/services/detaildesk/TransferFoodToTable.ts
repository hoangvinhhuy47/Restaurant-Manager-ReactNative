import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';
import { OrderDetailList } from '../../components/object/Order'
export const TransferFoodToTable = async (UserID: string, OrderID: string, OrderDetailList: Array<OrderDetailList>, TableID: string) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            OrderDetailList: OrderDetailList,
            TableID: TableID
        };
        return await $axios.post('TransferFoodToTable', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
