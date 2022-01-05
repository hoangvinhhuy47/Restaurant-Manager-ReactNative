import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const SendToCookSingle = async (UserID: string, OrderID: string,OrderDetailID:string) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            OrderDetailID:OrderDetailID
       
        };
        return await $axios.post('SendToCookSingle', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
