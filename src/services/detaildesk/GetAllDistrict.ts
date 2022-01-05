import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const GetAllDistrict = async (UserID: string, CityID: string) => {
    try {
        let body = {
            UserID: UserID,
            CityID: CityID
        };
        return await $axios.post('GetAllDistrict', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
