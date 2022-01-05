import { $axios } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { actionMain } from '../../utils/mainActions';
import { Customer } from '../../components/object/Order'
export const AddNewCustomer = async (UserID: string, Customer: Customer) => {
    try {
        let body = {
            UserID: UserID,
            Customer: Customer,
        };
        return await $axios.post('AddNewCustomer', body);
    } catch (error) {
        actionMain.loading(false, '');
        return null;
    }
};
