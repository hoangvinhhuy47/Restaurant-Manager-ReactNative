import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';
import { PaymentInfo } from '../../components/object/Order'
export const PaymentOrder = async (UserID: string, TransactionID: string, OrderID: string, PaymentInfo: PaymentInfo) => {
    try {
        let body = {
            UserID: UserID,
            TransactionID: TransactionID,
            OrderID: OrderID,
            PaymentInfo: PaymentInfo,
        };

        return await $axios.post('PaymentOrder', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
