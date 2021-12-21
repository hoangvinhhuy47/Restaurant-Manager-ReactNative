import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';
import { ReservationList } from '../../components/object/Order'

export const AddReservation = async (UserID: string, Reservation: ReservationList) => {
    try {
        let body = {
            UserID: UserID,
            Reservation: Reservation
        };
        return await $axios.post('AddReservation', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
