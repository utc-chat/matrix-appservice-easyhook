import {
  REQUEST_GET_SETTINGS, GET_SETTINGS_SUCCESS, GET_SETTINGS_ERROR,
  REQUEST_SAVE_SETTINGS, SAVE_SETTINGS_SUCCESS, SAVE_SETTINGS_ERROR,
  REQUEST_DELETE_SETTINGS, DELETE_SETTINGS_SUCCESS, DELETE_SETTINGS_ERROR,
} from './types'
import { AXIOS_CONFIG } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getSettingsAction = () => async dispatch => {
  dispatch({ type: REQUEST_GET_SETTINGS })
  try {
      const res = await axios.get('/settings')
      dispatch({
          type: GET_SETTINGS_SUCCESS,
          payload: res.data,
      })
  } catch (err) {
      dispatch({ type: GET_SETTINGS_ERROR })
  }
}

export const saveSettingsAction = (data) => async dispatch => {
  dispatch({ type: REQUEST_SAVE_SETTINGS });
  try {
      const res = await axios.post('/settings/save', { data }, AXIOS_CONFIG)
      if (res.data === "same_key") {
          toast.error('Same Settings Key Exist!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored'
          });
          dispatch({
              type: SAVE_SETTINGS_ERROR,
          })
      } else {
          dispatch({
              type: SAVE_SETTINGS_SUCCESS,
              payload: res.data,
          })
          if (data.id) {
              toast.info('Settings Updated!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'colored'
              });
          } else {
              toast.info('New Settings Added!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'colored'
              });
          }
      }
  } catch (err) {
      dispatch({
          type: SAVE_SETTINGS_ERROR,
          error: err
      })
  }
}

export const deleteSettingsAction = (id) => async dispatch => {
  dispatch({ type: REQUEST_DELETE_SETTINGS })
  try {
      const res = await axios.delete(`/settings/${id}`)
      dispatch({
          type: DELETE_SETTINGS_SUCCESS,
          payload: res.data,
      })
      toast.info('Settings Deleted!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
      });
  } catch (err) {
      dispatch({ type: DELETE_SETTINGS_ERROR })
  }
}

