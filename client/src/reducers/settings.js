import {
  REQUEST_SAVE_SETTINGS, SAVE_SETTINGS_SUCCESS, SAVE_SETTINGS_ERROR,
  REQUEST_GET_SETTINGS, GET_SETTINGS_SUCCESS, GET_SETTINGS_ERROR,
  REQUEST_DELETE_SETTINGS, DELETE_SETTINGS_SUCCESS, DELETE_SETTINGS_ERROR,
} from '../actions/types';

const initialState = {
  loading: false,
  settings: [],
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_GET_SETTINGS:
    case REQUEST_SAVE_SETTINGS:
    case REQUEST_DELETE_SETTINGS:
      return {
        ...state,
        loading: true,
      }
    case GET_SETTINGS_SUCCESS:
    case SAVE_SETTINGS_SUCCESS:
    case DELETE_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        settings: [...payload],
      }
    case SAVE_SETTINGS_ERROR:
    case GET_SETTINGS_ERROR:
    case DELETE_SETTINGS_ERROR:
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
