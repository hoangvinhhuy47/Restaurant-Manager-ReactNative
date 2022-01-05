import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const AddServiceCharge = async (UserID: string, OrderID: string, Price: string) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            Price: Price
        };
        return await $axios.post('AddServiceCharge', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
