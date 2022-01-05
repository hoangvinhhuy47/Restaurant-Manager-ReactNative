import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const GetTable = async (UserID: string, LayoutID: string) => {
    try {
        let body = {
            UserID: UserID,
            LayoutID: LayoutID,
        };

        return await $axios.post('GetTable', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
