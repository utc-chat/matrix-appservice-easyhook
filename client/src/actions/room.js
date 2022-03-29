import {
  REQUEST_GET_ROOM, GET_ROOM_SUCCESS, GET_ROOM_ERROR,
  REQUEST_SAVE_ROOM, SAVE_ROOM_SUCCESS, SAVE_ROOM_ERROR,
  REQUEST_DELETE_ROOM, DELETE_ROOM_SUCCESS, DELETE_ROOM_ERROR,
} from './types'
import { AXIOS_CONFIG } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getRoomAction = () => async dispatch => {
  dispatch({ type: REQUEST_GET_ROOM })
  try {
      const res = await axios.get('/room')
      dispatch({
          type: GET_ROOM_SUCCESS,
          payload: res.data,
      })
  } catch (err) {
      dispatch({ type: GET_ROOM_ERROR })
  }
}

export const saveRoomAction = (data) => async dispatch => {
  dispatch({ type: REQUEST_SAVE_ROOM });
  try {
      const res = await axios.post('/room/save', { data }, AXIOS_CONFIG)
      if (res.data === "same_room_id") {
          toast.error('Same Room Id Exist!', {
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
              type: SAVE_ROOM_ERROR,
          })
      } else {
          dispatch({
              type: SAVE_ROOM_SUCCESS,
              payload: res.data,
          })
          if (data.id) {
              toast.info('Room Updated!', {
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
              toast.info('New Room Added!', {
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
          type: SAVE_ROOM_ERROR,
          error: err
      })
  }
}

export const deleteRoomAction = (id) => async dispatch => {
  dispatch({ type: REQUEST_DELETE_ROOM })
  try {
      const res = await axios.delete(`/room/${id}`)
      dispatch({
          type: DELETE_ROOM_SUCCESS,
          payload: res.data,
      })
      toast.info('Room Deleted!', {
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
      dispatch({ type: DELETE_ROOM_ERROR })
  }
}

