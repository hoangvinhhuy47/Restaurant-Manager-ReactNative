import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const CloseTable = async (UserID: string, TransactionID: string) => {
    try {
        let body = {
            UserID: UserID,
            TransactionID: TransactionID,
        };
        return await $axios.post('CloseTable', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
