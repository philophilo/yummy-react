import {combineReducers} from 'redux';
import categories from './categoryReducer';
import register from './registrationReducer';
import login from './loginReducer';
import recipes from './recipeReducer';
import pagination from './paginationReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const appReducer = combineReducers({
    register,
    login,
    categories,
    recipes,
    pagination,
    ajaxCallsInProgress,
})

const rootReducer = (state, action) => {
    if (action.type === 'DO_LOGOUT_REQUEST') {
        state = undefined
    }
    return appReducer(state, action)
}
export default rootReducer;