import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const ReAddHour = async (UserID: string, OrderID: string, OpenTime: string) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            OpenTime: OpenTime,
        };
        return await $axios.post('ReAddHour', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
