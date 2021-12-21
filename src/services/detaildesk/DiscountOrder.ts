import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';

export const DiscountOrder = async (UserID: string, OrderID: string, DiscountType: number, DiscountValue: number) => {
    try {
        let body = {
            UserID: UserID,
            OrderID: OrderID,
            DiscountType: DiscountType,
            DiscountValue: DiscountValue,
        };
        return await $axios.post('DiscountOrder', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
