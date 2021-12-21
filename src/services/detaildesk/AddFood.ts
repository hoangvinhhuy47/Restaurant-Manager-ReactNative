import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const AddFood = async (UserID: string, OrderID: string, FoodID: string,Quantity:number) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            FoodID: FoodID,
            Quantity:Quantity,
        };
        return await $axios.post('AddFood', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
