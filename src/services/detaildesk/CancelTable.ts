import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const CancelTable = async (UserID: string, TableID: string) => {
    try {
        let body = {
            UserID: UserID,
            TableID: TableID,
       
        };
        return await $axios.post('CancelTable', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
