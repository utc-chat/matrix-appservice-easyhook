import jwtDecode from 'jwt-decode';
import {  
  LOGIN_SUCCESS,  
  REQUEST_LOGOUT,
  REGISTER_SUCCESS,
  SET_AUTHENTICATE,
} from './types';

export const loginAction = (userData) => dispatch => {
  const user = jwtDecode(userData);
  delete user.exp;
  delete user.sub;

  dispatch({ 
    type: LOGIN_SUCCESS, 
    payload: {
      token: userData,
      user: {...user}
    }
  })
}

export const registerAction = (userData) => dispatch => {
  const user = jwtDecode(userData);
  delete user.exp;
  delete user.sub;

  dispatch({ 
    type: REGISTER_SUCCESS,
    payload: {
      token: userData,
      user: {...user}
    }
  })
}

export const logoutAction = () => dispatch => {
  dispatch({ type: REQUEST_LOGOUT });  
}

export const setAuthenticate = () => dispatch => {
  dispatch({ type: SET_AUTHENTICATE })
}