import { 
  USER_UPDATE, 
  USER_LOADED, 
  USER_UPDATE_FAIL 
} from './type';
import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

import {url} from '../../helper/url';

export const updateUser = ({updatedUser, userId}) => (dispatch, getState) => {
  axios.patch(`${url}/users/`+userId, updatedUser, tokenConfig(getState))
  .then(res => {
    dispatch({
      type: USER_UPDATE,
      payload: res.data
    })
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  })
  .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status, 'USER_UPDATE_FAIL'));
    dispatch({ type: USER_UPDATE_FAIL })
  })
}