import {$axios} from '../constants';
import {useSelector} from 'react-redux';


  export const login = (userName: string, password: string, UrlString: string, GuidID:string) => {
    try {
      const {UrlString, GuidID} = useSelector((state: any) => ({
          UrlString: state.config.UrlString,
          GuidID: state.config.GuidID
        }));
      let body = {
          UserName: userName,
          Password: password,
        };
        console.log({body: body})
      return $axios.post(UrlString + '/API/stock/CheckLogin?GUIID='+GuidID, body);
    } catch (error) {
      console.log(error)
    }
  };
