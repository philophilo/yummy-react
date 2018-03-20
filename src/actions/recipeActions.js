import * as types from './actionTypes';
import RecipeApi from '../api/mockRecipeApi';
import { push } from 'react-router-redux'
import toastr from 'toastr'

export function loadRecipesSuccess(recipes) {
    // objects: when rhs marches lhs
    // its okay to have one value
    return { type: types.LOAD_RECIPES_SUCCESS, recipes };
}

export function createRecipeSuccess(recipe){
    return { type: types.CREATE_RECIPE_SUCCESS, recipe};
}

export function updateRecipeSuccess(recipe){
    return { type: types.UPDATE_RECIPE_SUCCESS, recipe};
}

export function deleteRecipeSuccess(recipes) {
    return { type: types.LOAD_RECIPES_SUCCESS, recipes };
}

export function recipePaginationSuccess(pagination) {
    return { type: types.LOAD_PAGES_SUCCESS, pagination };
}


export function loadCategoryRecipes(category_id, page=1){
    return function(dispatch){
        return RecipeApi.getCategoryRecipes(category_id, page).then(data => {
            // arrow (anonymous) function with parameter recipes
            var [recipes, pagination] = [[], []]
            [recipes, pagination] = data
            dispatch(loadRecipesSuccess(recipes));
            dispatch(recipePaginationSuccess(pagination))
            // window.location = "/CategoriesPage"
            
        }).catch(error => {
            toastr.error(error)
            window.history.back()
        });
    }
}


export function saveRecipe(recipe, categoryId = null) {
    return function (dispatch, getState){
        return RecipeApi.saveRecipe(recipe, categoryId).then(savedRecipe => {
            recipe.id ? dispatch(updateRecipeSuccess(savedRecipe)) : 
                dispatch(createRecipeSuccess(savedRecipe));
            dispatch(push('/view/category/'+savedRecipe.category_id+'/recipes/'))
        }).catch(error => {
            toastr.error(error)
        });
    };
}

export function deleteRecipe(category_id, recipe_id) {

    return function (dispatch, getState){
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
    return function(dispatch){
        return RecipeApi.searchCategoryRecipes(q, page).then(data => {
            var [recipes, pagination] = [[], []]
            [recipes, pagination] = data
            dispatch(loadRecipesSuccess(recipes));
            dispatch(recipePaginationSuccess(pagination))
            // dispatch actions creator
        }).catch(error => {
            throw(error);
        });
    }
}
