import {
    REQUEST_GET_RULE, GET_RULE_SUCCESS, GET_RULE_ERROR,
    REQUEST_SAVE_RULE, SAVE_RULE_SUCCESS, SAVE_RULE_ERROR,
    REQUEST_DELETE_RULE, DELETE_RULE_SUCCESS, DELETE_RULE_ERROR,
} from './types'
import { AXIOS_CONFIG } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getRuleAction = () => async dispatch => {
    dispatch({ type: REQUEST_GET_RULE })
    try {
        const res = await axios.get('/rule')
        dispatch({
            type: GET_RULE_SUCCESS,
            payload: res.data,
        })
    } catch (err) {
        dispatch({ type: GET_RULE_ERROR })
    }
}

export const saveRuleAction = (data) => async dispatch => {
    dispatch({ type: REQUEST_SAVE_RULE });
    try {
        const res = await axios.post('/rule/save', { data }, AXIOS_CONFIG)
        toast.info('Rule has been saved!', {
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
            type: SAVE_RULE_SUCCESS,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: SAVE_RULE_ERROR,
            error: err
        })
    }
}

export const deleteRuleAction = (id) => async dispatch => {
    dispatch({ type: REQUEST_DELETE_RULE })
    try {
        const res = await axios.delete(`/rule/${id}`)
        dispatch({
            type: DELETE_RULE_SUCCESS,
            payload: res.data,
        })
        toast.info('Rule Deleted!', {
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
        dispatch({ type: DELETE_RULE_ERROR })
    }
}

