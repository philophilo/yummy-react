import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function paginationReducer(state = initialState.pagination, action) {
  switch (action.type) {
    case types.LOAD_PAGES_SUCCESS:
      return action.pagination;
    default:
      return state;
  }
}
