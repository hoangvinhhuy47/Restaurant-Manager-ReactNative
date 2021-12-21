import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const TakeAwayFood= async (UserID: string, OrderID: string,OrderDetailID:string) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            OrderDetailID:OrderDetailID
       
        };
        return await $axios.post('TakeAwayFood', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
