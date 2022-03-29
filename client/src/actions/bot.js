import {
  REQUEST_GET_BOT, GET_BOT_SUCCESS, GET_BOT_ERROR,
  REQUEST_SAVE_BOT, SAVE_BOT_SUCCESS, SAVE_BOT_ERROR,
  REQUEST_DELETE_BOT, DELETE_BOT_SUCCESS, DELETE_BOT_ERROR,
} from './types'
import { AXIOS_CONFIG } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getBotAction = () => async dispatch => {
  dispatch({ type: REQUEST_GET_BOT })
  try {
      const res = await axios.get('/bot')
      dispatch({
          type: GET_BOT_SUCCESS,
          payload: res.data,
      })
  } catch (err) {
      dispatch({ type: GET_BOT_ERROR })
  }
}

export const saveBotAction = (data) => async dispatch => {
  dispatch({ type: REQUEST_SAVE_BOT });
  try {
      const res = await axios.post('/bot/save', { data }, AXIOS_CONFIG)
      if (res.data === "same_bot_id") {
          toast.error('Same Bot Id Exist!', {
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
              type: SAVE_BOT_ERROR,
          })
      } else {
          dispatch({
              type: SAVE_BOT_SUCCESS,
              payload: res.data,
          })
          if (data.id) {
              toast.info('Bot Updated!', {
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
              toast.info('New Bot Added!', {
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
          type: SAVE_BOT_ERROR,
          error: err
      })
  }
}

export const deleteBotAction = (id) => async dispatch => {
  dispatch({ type: REQUEST_DELETE_BOT })
  try {
      const res = await axios.delete(`/bot/${id}`)
      dispatch({
          type: DELETE_BOT_SUCCESS,
          payload: res.data,
      })
      toast.info('Bot Deleted!', {
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
      dispatch({ type: DELETE_BOT_ERROR })
  }
}

