import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function registrationReducer(state = initialState.register, action){
    switch(action.type){
        case types.LOAD_REGISTER_SUCCESS:
            return action.register;
        case types.CREATE_USER_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.register)
            ];
        case types.UPDATE_USER_SUCCESS:
            return [
                ...state.filter(register => register.id !== action.register.id),
                Object.assign({}, action.register)
            ];
        default:
            return state;
    }
}
