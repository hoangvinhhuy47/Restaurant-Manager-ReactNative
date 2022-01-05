import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const AddOtherFood = async (UserID: string, OrderID: string, Quantity: string, Price: string, Notes: string) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            Quantity: Quantity,
            Price: Price,
            Notes: Notes
        };
        return await $axios.post('AddOtherFood', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
