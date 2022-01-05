import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const GetAllCity = async (UserID: string) => {
    try {
        let body = {
            UserID: UserID,
        };
        return await $axios.post('GetAllCity', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
