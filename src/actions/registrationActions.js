import { push } from 'react-router-redux';
import * as types from './actionTypes';
import RegistrationApi from '../api/mockRegistrationApi';

export function loadRegisterSuccess(register) {
  // objects: when rhs marches lhs
  // its okay to have one value
  return { type: types.LOAD_REGISTER_SUCCESS, register };
}

export function createUserSuccess(register) {
  return { type: types.CREATE_USER_SUCCESS, register };
}

export function updateUserSuccess(register) {
  return { type: types.UPDATE_USER_SUCCESS, register };
}

export function loadUsers() {
  // >>> thunk <<<
  return function (dispatch) {
    // getAllCourses returns a promise containing an object
    return RegistrationApi.getAllUsers().then(register => {
      // arrow (anonymous) function with parameter courses
      dispatch(loadRegisterSuccess(register));
      // dispatch actions creator
    }).catch(error => {
      throw (error);
    });
  };
}

export function saveRegistration(user) {
  return function (dispatch) {
    return RegistrationApi.saveUser(user).then(savedUser => {
      if (user.id) {
        dispatch(updateUserSuccess(savedUser));
      } else {
        dispatch(createUserSuccess(savedUser));
        // dispatch(push('/ManageLoginPage'))
      }
    }).catch(error => {
      throw (error);
    });
  };
}
