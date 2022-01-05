import {combineReducers} from 'redux';
import {authReducer} from './auth/reducer';
import {configReducer } from './config/reducer'
import { systemReducer } from './system/reducer';
export default combineReducers({
  auth: authReducer,
  config: configReducer,
  system: systemReducer
});
