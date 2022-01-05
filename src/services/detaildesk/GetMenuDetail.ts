import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const GetMenuDetail = async (UserID: string, MenuID: string) => {
    try {
        let body = {
            UserID: UserID,
            MenuID: MenuID,
        };

        return await $axios.post('GetMenuDetail', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
