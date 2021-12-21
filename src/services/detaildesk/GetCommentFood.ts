import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const GetCommentFood = async (UserID: string, OrderDetailID: string,FoodID:string) => {
    try {
        let body = {
            UserID: UserID,
            OrderDetailID:OrderDetailID,
            FoodID: FoodID,
     
       
        };
        return await $axios.post('GetCommentFood', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
