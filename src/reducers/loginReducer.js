import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.login, action) {
  switch (action.type) {
    case types.DO_LOGIN_SUCESS:
      return [
        ...state,
        Object.assign({}, action.login),
      ];
    case types.DO_LOGIN_REQUEST:
      return [
        ...state,
        Object.assign({}, action.login),
      ];
    case types.DO_LOGIN_FAILURE:
      return {};
    default:
      return state;
  }
}
