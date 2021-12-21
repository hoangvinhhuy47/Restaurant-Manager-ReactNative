import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const ChangeQuantityFood = async (UserID: string, OrderID: string, OrderDetailID: string,Quantity:number) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            OrderDetailID: OrderDetailID,
            Quantity:Quantity
        };
        return await $axios.post('ChangeQuantityFood', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
