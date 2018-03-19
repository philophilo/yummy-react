import * as types from './actionTypes';
import LoginApi from '../api/mockLoginApi';
import {beginAjaxCall} from './ajaxStatusActions';
import { push } from 'react-router-redux'

export function loadLoginSuccess(login) {
    // objects: when rhs marches lhs
    // its okay to have one value
    console.log("****************", login, "_+_+_+")
    return { type: types.DO_LOGIN_SUCESS, login };
}

export function loadLoginRequest(login) {
    return { type: types.DO_LOGIN_REQUEST, login };
}

export function loadLoginFailure(login) {
    return { type: types.DO_LOGIN_FAILURE, login };
}

export function executeLogout(logout){
    console.log("logout=====================>>>>>>", logout)
    return { type: types.DO_LOGOUT_REQUEST, logout}
}


export function doLogin(login) {
    console.log("0==============", login)
    return function (dispatch, getState){
        dispatch(beginAjaxCall());
        return LoginApi.getUser(login).then(user => {
            console.log("before=========>>>", user)
            dispatch(loadLoginSuccess(user));
            // window.location = '/CategoriesPage'
            console.log("0000000000000")
        }).catch(error => {
            throw(error);
        });
    };
}

export function doLogout() {
    console.log("0==============")
    return function (dispatch, getState){
        dispatch(beginAjaxCall());
        console.log("this+++++++++++++++++++++++++")
        // return LoginApi.logoutUser().then(logout => {
            // console.log("before=========>>>", logout)
            localStorage.removeItem('token')
            dispatch(executeLogout({}));
            // window.location = '/CategoriesPage'
            console.log("0000000000000")
        // }).catch(error => {
        //     throw(error);
        // });
    };
}