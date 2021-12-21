import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const ExtendAndStopHour = async (UserID: string, OrderID: string, CloseTime: string) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            CloseTime: CloseTime,
        };
        return await $axios.post('ExtendAndStopHour', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
