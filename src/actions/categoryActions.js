import { push } from 'react-router-redux';
import toastr from 'toastr';
import * as types from './actionTypes';
import CategoryApi from '../api/mockCategoryApi';

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
        // getAllCourses returns a promise containing an object
        return CategoryApi.getAllCategories(page).then(data => {
            // arrow (anonymous) function with parameter courses
            var [categories, pagination] = [[], {}];
            [categories, pagination] = data;
            dispatch(loadCategoriesSuccess(categories));
            dispatch(categoryPaginationSuccess(pagination))
            // dispatch actions creator
        }).catch(error => {
            toastr.error(error)
        });
    }
}

export function saveCategory(category) {
    return function (dispatch, getState){
        return CategoryApi.saveCategory(category).then(savedCategory => {
            category.id ? dispatch(updateCategorySuccess(savedCategory)): 
                dispatch(createCategorySuccess(savedCategory))
            dispatch(push('/categories'))
            
        }).catch(error => {
            toastr.error(error)
        });
    };
}

export function deleteCategory(category_id) {
    return function (dispatch, getState){
        return CategoryApi.deleteCategory(category_id).then(response => {
            let [categories, message] = response
            dispatch(deleteCategorySuccess(categories))
            dispatch(loadCategories())
            toastr.success(message)
            // dispatch(push('/categories'))
            
        }).catch(error => {
            throw(error);
        });
    };
}

export function searchCategories(q, page=1){
    // >>> thunk <<<
    return function(dispatch){
        // getAllCourses returns a promise containing an object
        return CategoryApi.searchCategories(q, page).then(data => {
            // arrow (anonymous) function with parameter courses
            var [categories, pagination] = [[], {}];
            [categories, pagination] = data;
            dispatch(loadCategoriesSuccess(categories));
            dispatch(categoryPaginationSuccess(pagination))
            dispatch(push('/search/categories/'+q+'/'+page))
        }).catch(error => {
            throw(error);
        });
    }
}
