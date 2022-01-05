import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const GetAllWard = async (UserID: string, DistrictID: string) => {
    try {
        let body = {
            UserID: UserID,
            DistrictID: DistrictID
        };
        return await $axios.post('GetAllWard', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
