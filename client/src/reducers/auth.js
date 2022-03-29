// eslint-disable-next-line
import setAuthToken from '../utils/setAuthToken';

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REQUEST_LOGOUT,
  SET_AUTHENTICATE,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};
// eslint-disable-next-line
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      setAuthToken(payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: {...payload.user},
      }
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        isAuthenticated: false,        
      }
    case REQUEST_LOGOUT:
      localStorage.removeItem('token');
      setAuthToken();
      return {
        ...state,
        isAuthenticated: false,
      }
    case SET_AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
      }
    default:      
      return {
        ...state,
      }
  }
}
