import {
  REQUEST_SAVE_RULE, SAVE_RULE_SUCCESS, SAVE_RULE_ERROR,
  REQUEST_GET_RULE, GET_RULE_SUCCESS, GET_RULE_ERROR,
  REQUEST_DELETE_RULE, DELETE_RULE_SUCCESS, DELETE_RULE_ERROR,
} from '../actions/types';

const initialState = {
  loading: false,
  rule: [],
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUEST_GET_RULE:
    case REQUEST_SAVE_RULE:
    case REQUEST_DELETE_RULE:
      return {
        ...state,
        loading: true,
      }
    case GET_RULE_SUCCESS:
    case SAVE_RULE_SUCCESS:
    case DELETE_RULE_SUCCESS:
      return {
        ...state,
        loading: false,
        rule: [...payload],
      }
    case SAVE_RULE_ERROR:
    case GET_RULE_ERROR:
    case DELETE_RULE_ERROR:
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
