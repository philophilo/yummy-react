import * as types from './actionTypes';
import LoginApi from '../api/mockLoginApi';

export function loadLoginSuccess(login) {
  // objects: when rhs marches lhs
  // its okay to have one value
  return { type: types.DO_LOGIN_SUCESS, login };
}

export function loadLoginRequest(login) {
  return { type: types.DO_LOGIN_REQUEST, login };
}

export function loadLoginFailure(login) {
  return { type: types.DO_LOGIN_FAILURE, login };
}

export function executeLogout(logout) {
  return { type: types.DO_LOGOUT_REQUEST, logout };
}


export function doLogin(login) {
  return function (dispatch) {
    return LoginApi.getUser(login).then(user => {
      dispatch(loadLoginSuccess(user));
    }).catch(error => {
      throw (error);
    });
  };
}

export function doLogout() {
  return function (dispatch) {
    localStorage.removeItem('token');
    dispatch(executeLogout({}));
  };
}
