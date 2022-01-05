import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const UpdateCustomerOrder = async (UserID: string, OrderID: string, CustomerID: string) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            CustomerID: CustomerID
        };
        return await $axios.post('UpdateCustomerOrder', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
