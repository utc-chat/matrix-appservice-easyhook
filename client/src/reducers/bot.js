import {
  REQUEST_SAVE_BOT, SAVE_BOT_SUCCESS, SAVE_BOT_ERROR,
  REQUEST_GET_BOT, GET_BOT_SUCCESS, GET_BOT_ERROR,
  REQUEST_DELETE_BOT, DELETE_BOT_SUCCESS, DELETE_BOT_ERROR,
} from '../actions/types';

const initialState = {
  loading: false,
  bot: [],
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_GET_BOT:
    case REQUEST_SAVE_BOT:
    case REQUEST_DELETE_BOT:
      return {
        ...state,
        loading: true,
      }
    case GET_BOT_SUCCESS:
    case SAVE_BOT_SUCCESS:
    case DELETE_BOT_SUCCESS:
      return {
        ...state,
        loading: false,
        bot: [...payload],
      }
    case SAVE_BOT_ERROR:
    case GET_BOT_ERROR:
    case DELETE_BOT_ERROR:
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
