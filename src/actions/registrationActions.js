import * as types from './actionTypes';
import RegistrationApi from '../api/mockRegistrationApi';
import {beginAjaxCall} from './ajaxStatusActions';
import { push } from 'react-router-redux'

export function loadRegisterSuccess(register) {
    // objects: when rhs marches lhs
    // its okay to have one value
    return { type: types.LOAD_REGISTER_SUCCESS, register };
}

export function createUserSuccess(register){
    return { type: types.CREATE_USER_SUCCESS, register};
}

export function updateUserSuccess(register){
    return { type: types.UPDATE_USER_SUCCESS, register};
}

export function loadUsers(){
    // >>> thunk <<<
    return function(dispatch){
        dispatch(beginAjaxCall());
        // getAllCourses returns a promise containing an object
        return RegistrationApi.getAllUsers().then(register => {
            // arrow (anonymous) function with parameter courses
            dispatch(loadRegisterSuccess(register));
            // dispatch actions creator
        }).catch(error => {
            throw(error);
        });
    }
}

export function saveRegistration(user) {
    return function (dispatch, getState){
        dispatch(beginAjaxCall());
        return RegistrationApi.saveUser(user).then(savedUser => {
            if (user.id) {
                dispatch(updateUserSuccess(savedUser))
            }else{
                console.log("before>>>>>>>>>>", savedUser)
                dispatch(createUserSuccess(savedUser));
                // dispatch(push('/ManageLoginPage'))
                console.log("11122121221")
            }
        }).catch(error => {
            throw(error);
        });
    };
}