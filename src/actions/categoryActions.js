import * as types from './actionTypes';
import CategoryApi from '../api/mockCategoryApi';
import {beginAjaxCall} from './ajaxStatusActions';
import { push } from 'react-router-redux'

export function loadCategoriesSuccess(categories) {
    // objects: when rhs marches lhs
    // its okay to have one value
    return { type: types.LOAD_CATEGORIES_SUCCESS, categories };
}

export function createCategorySuccess(category){
    return { type: types.CREATE_CATEGORY_SUCCESS, category};
}

export function updateCategorySuccess(category){
    return { type: types.UPDATE_CATEGORY_SUCCESS, category};
}

export function deleteCategorySuccess(categories) {
    // objects: when rhs marches lhs
    // its okay to have one value
    return { type: types.LOAD_CATEGORIES_SUCCESS, categories };
}

export function categoryPaginationSuccess(pagination){
    return { type: types.LOAD_PAGES_SUCCESS, pagination };
}

export function loadCategories(page = 1){
    // >>> thunk <<<
    return function(dispatch){
        dispatch(beginAjaxCall());
        // getAllCourses returns a promise containing an object
        return CategoryApi.getAllCategories(page).then(data => {
            // arrow (anonymous) function with parameter courses
            var [categories, pagination] = [[], {}]
            [categories, pagination] = data
            dispatch(loadCategoriesSuccess(categories));
            dispatch(categoryPaginationSuccess(pagination))
            // dispatch actions creator
        }).catch(error => {
            throw(error);
        });
    }
}

export function saveCategory(category) {
    return function (dispatch, getState){
        dispatch(beginAjaxCall());
        return CategoryApi.saveCategory(category).then(savedCategory => {
            console.log("..................", savedCategory)
            category.id ? dispatch(updateCategorySuccess(savedCategory)): 
                dispatch(createCategorySuccess(savedCategory))
            // window.history.back()
            
        }).catch(error => {
            throw(error);
        });
    };
}

export function deleteCategory(category_id) {
    return function (dispatch, getState){
        dispatch(beginAjaxCall());
        return CategoryApi.deleteCategory(category_id).then(categories => {
            dispatch(deleteCategorySuccess(categories))
            dispatch(push('/categories'))
            
        }).catch(error => {
            throw(error);
        });
    };
}

export function searchCategories(q, page=1){
    // >>> thunk <<<
    return function(dispatch){
        dispatch(beginAjaxCall());
        // getAllCourses returns a promise containing an object
        return CategoryApi.searchCategories(q, page).then(data => {
            // arrow (anonymous) function with parameter courses
            var [categories, pagination] = [[], {}]
            [categories, pagination] = data
            dispatch(loadCategoriesSuccess(categories));
            dispatch(categoryPaginationSuccess(pagination))
            dispatch(push('/search/categories/'+q+'/'+page))
        }).catch(error => {
            throw(error);
        });
    }
}
