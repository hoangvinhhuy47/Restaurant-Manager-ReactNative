import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const SendToCookAll = async (UserID: string, OrderID: string) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
       
        };
        return await $axios.post('SendToCookAll', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
