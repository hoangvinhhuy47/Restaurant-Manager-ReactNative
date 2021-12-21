import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const GetOrder = async (UserID: string, TransactionID: string,OrderID:string) => {
    try {
        let body = {
            UserID: UserID,
            TransactionID: TransactionID,
            OrderID:OrderID
        };
        return await $axios.post('GetOrder', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
