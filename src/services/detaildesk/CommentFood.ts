import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';
import {CommentList} from '../../components/object/Order'

export const CommentFood = async (UserID: string, OrderDetailID: string,CommentList:Array<CommentList>) => {
    try {
        let body = {
            UserID: UserID,
            OrderDetailID: OrderDetailID,
            CommentList:CommentList
        };
        return await $axios.post('CommentFood', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
