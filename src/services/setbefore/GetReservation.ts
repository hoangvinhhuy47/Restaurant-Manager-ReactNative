import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const GetReservation = async (UserID: string, FromDate: string, ToDate: string, PageIndex: number, SearchString: string) => {
    try {
        let body = {
            UserID: UserID,
            FromDate: FromDate,
            ToDate: ToDate,
            PageIndex: PageIndex,
            SearchString: SearchString
        };
        return await $axios.post('GetReservation', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
