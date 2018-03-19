import * as types from './actionTypes';
import RecipeApi from '../api/mockRecipeApi';
import {beginAjaxCall} from './ajaxStatusActions';
import { push } from 'react-router-redux'
import toastr from 'toastr'

export function loadRecipesSuccess(recipes) {
    // objects: when rhs marches lhs
    // its okay to have one value
    console.log('*********', types, recipes, '*********')
    return { type: types.LOAD_RECIPES_SUCCESS, recipes };
}

export function createRecipeSuccess(recipe){
    return { type: types.CREATE_RECIPE_SUCCESS, recipe};
}

export function updateRecipeSuccess(recipe){
    console.log(recipe, "<<<<<<<<<<<<<<<<<<<<<<<<<<UPDATING NOW")
    return { type: types.UPDATE_RECIPE_SUCCESS, recipe};
}

export function deleteRecipeSuccess(recipes) {
    return { type: types.LOAD_RECIPES_SUCCESS, recipes };
}

export function recipePaginationSuccess(pagination) {
    return { type: types.LOAD_PAGES_SUCCESS, pagination };
}

// export function loadRecipes(){
//     // >>> thunk <<<
//     return function(dispatch){
//         dispatch(beginAjaxCall());
//         // getAllCourses returns a promise containing an object
//         return RecipeApi.getAllRecipes().then(recipes => {
//             // arrow (anonymous) function with parameter courses
//             console.log(recipes, '++++++++++++++++LOAD RECIPES')
//             dispatch(loadRecipesSuccess(recipes));
//             // dispatch actions creator
//         }).catch(error => {
//             throw(error);
//         });
//     }
// }


export function loadCategoryRecipes(category_id, page=1){
    // >>> thunk <<<
    console.log("-----------------------------------------------------------------category id", category_id)
    return function(dispatch){
        // dispatch(beginAjaxCall());
        // getAllCourses returns a promise containing an object
        return RecipeApi.getCategoryRecipes(category_id, page).then(data => {
            // arrow (anonymous) function with parameter recipes
            var [recipes, pagination] = [[], []]
            [recipes, pagination] = data
            console.log(recipes, '++++++++++++++++LOAD RECIPES')
            dispatch(loadRecipesSuccess(recipes));
            dispatch(recipePaginationSuccess(pagination))
            console.log("!!!!!!!!!!!!!!!!!!!!!")
            // window.location = "/CategoriesPage"
            
        }).catch(error => {
            toastr.error(error)
            window.history.back()
        });
    }
}


export function saveRecipe(recipe, categoryId = null) {
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", recipe, categoryId)
    return function (dispatch, getState){
        dispatch(beginAjaxCall());
        return RecipeApi.saveRecipe(recipe, categoryId).then(savedRecipe => {
            recipe.id ? dispatch(updateRecipeSuccess(savedRecipe)) : 
                dispatch(createRecipeSuccess(savedRecipe));
            console.log("at the action>>>>>>>>>>>>>>>>>>>>>>>", savedRecipe)
            dispatch(push('/view/category/'+savedRecipe.category_id+'/recipes/'))
        }).catch(error => {
            toastr.error(error)
        });
    };
}

export function deleteRecipe(category_id, recipe_id) {

    return function (dispatch, getState){
        dispatch(beginAjaxCall());
        return RecipeApi.deleteRecipe(category_id, recipe_id).then(response => {
            dispatch(loadCategoryRecipes(category_id))
            toastr.success(response)
            // window.history.back()
            
        }).catch(error => {
            toastr.error(error);
        });
    };
}

export function searchCategoryRecipes(q, page=1){
    // >>> thunk <<<
    console.log("-----------------------------------------------------------------category id")
    return function(dispatch){
        // dispatch(beginAjaxCall());
        // getAllCourses returns a promise containing an object
        return RecipeApi.searchCategoryRecipes(q, page).then(data => {
            // arrow (anonymous) function with parameter recipes
            var [recipes, pagination] = [[], []]
            [recipes, pagination] = data
            console.log(recipes, '++++++++++++++++LOAD RECIPES')
            dispatch(loadRecipesSuccess(recipes));
            dispatch(recipePaginationSuccess(pagination))
            // dispatch actions creator
            
        }).catch(error => {
            throw(error);
        });
    }
}
