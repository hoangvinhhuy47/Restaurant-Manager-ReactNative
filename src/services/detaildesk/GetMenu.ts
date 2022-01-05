import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const GetMenu = async (UserID: string) => {
    try {
        let body = {
            UserID: UserID,

        };

        return await $axios.post('GetMenu', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
