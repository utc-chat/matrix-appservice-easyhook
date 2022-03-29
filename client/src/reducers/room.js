import {
  REQUEST_SAVE_ROOM, SAVE_ROOM_SUCCESS, SAVE_ROOM_ERROR,
  REQUEST_GET_ROOM, GET_ROOM_SUCCESS, GET_ROOM_ERROR,
  REQUEST_DELETE_ROOM, DELETE_ROOM_SUCCESS, DELETE_ROOM_ERROR,
} from '../actions/types';

const initialState = {
  loading: false,
  room: [],
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_GET_ROOM:
    case REQUEST_SAVE_ROOM:
    case REQUEST_DELETE_ROOM:
      return {
        ...state,
        loading: true,
      }
    case GET_ROOM_SUCCESS:
    case SAVE_ROOM_SUCCESS:
    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        room: [...payload],
      }
    case SAVE_ROOM_ERROR:
    case GET_ROOM_ERROR:
    case DELETE_ROOM_ERROR:
      return {
        ...state,
        loading: false,
      }
    default:
      return {
        ...state,
      }
  }
}
