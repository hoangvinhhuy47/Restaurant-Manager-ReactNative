import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';
import {TableMergeList} from '../../components/object/Order'
export const MergeTable = async (UserID: string, TransactionID: string,TableMergeList:Array<TableMergeList>) => {
    try {
        let body = {
            UserID: UserID,
            TransactionID: TransactionID,
            TableMergeList:TableMergeList,

        };
        return await $axios.post('MergeTable', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
