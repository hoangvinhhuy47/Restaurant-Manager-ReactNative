import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const QuickSearchCustomer = async (UserID: string, PageIndex: string, SearchString: string) => {
    try {
        let body = {
            UserID: UserID,
            PageIndex: PageIndex,
            SearchString: SearchString,
        };
        return await $axios.post('QuickSearchCustomer', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
