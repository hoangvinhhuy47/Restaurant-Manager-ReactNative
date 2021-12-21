import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const ViewTable = async (UserID: string, LayoutID: string, TransactionID: string) => {
    try {
        let body = {
            UserID: UserID,
            LayoutID: LayoutID,
            TransactionID: TransactionID
        };
        return await $axios.post('ViewTable', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
