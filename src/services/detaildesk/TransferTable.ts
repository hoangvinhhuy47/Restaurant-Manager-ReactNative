import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const TransferTable = async (UserID: string, TransactionID: string, TableID: string) => {
    try {
        let body = {
            UserID: UserID,
            TransactionID: TransactionID,
            TableID: TableID


        };
        return await $axios.post('TransferTable', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
