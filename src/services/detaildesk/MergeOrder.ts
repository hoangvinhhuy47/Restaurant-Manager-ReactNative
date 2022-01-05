import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const MergeOrder = async (UserID: string, TransactionID: string,OrderID:string,OrderIDMerge:string) => {
    try {
        let body = {
            UserID: UserID,
            TransactionID: TransactionID,
            OrderID:OrderID,
            OrderIDMerge:OrderIDMerge,

        };
        return await $axios.post('MergeOrder', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
