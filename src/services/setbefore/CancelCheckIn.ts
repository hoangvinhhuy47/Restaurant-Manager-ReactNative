import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const CancelReservation = async (UserID: string, ReservationID: string, Reason: string) => {
    try {
        let body = {
            UserID: UserID,
            id: ReservationID,
            Reason: Reason,
        };
        return await $axios.post('CancelReservation', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
