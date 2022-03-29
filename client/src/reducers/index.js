import { combineReducers } from 'redux';
import authReducer from './auth';
import settingsReducer from './settings';
import botReducer from './bot';
import roomReducer from './room';
import ruleReducer from './rule';

export default combineReducers({
  authReducer,
  settingsReducer,
  botReducer,
  roomReducer,
  ruleReducer,
})
