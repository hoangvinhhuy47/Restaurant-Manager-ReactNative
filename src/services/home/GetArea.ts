import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const GetArea = async (UserID: string, AreaType: number) => {
    try {
        let body = {
            UserID: UserID,
            AreaType: AreaType,
        };

        return await $axios.post('GetArea', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
