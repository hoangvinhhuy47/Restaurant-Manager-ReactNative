import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const OpenTable = async (UserID: string, LayoutID: string, TableID: string, TableCaption: string, OpenTime: string) => {
    try {
        let body = {
            UserID: UserID,
            LayoutID: LayoutID,
            TableID: TableID,
            TableCaption: TableCaption,
            OpenTime: OpenTime
        };

        return await $axios.post('OpenTable', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
