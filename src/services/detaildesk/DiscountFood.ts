import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const DiscountFood = async (UserID: string, OrderID: string,OrderDetailID:string,DiscountType:number,DiscountValue:number) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            OrderDetailID:OrderDetailID,
            DiscountType:DiscountType,
            DiscountValue:DiscountValue,
        };
        return await $axios.post('DiscountFood', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
