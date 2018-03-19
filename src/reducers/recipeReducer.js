import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function recipeReducer(state = initialState.recipes, action){
    switch(action.type){
        case types.LOAD_RECIPES_SUCCESS:
            console.log(action, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<state")
            return action.recipes;
        case types.CREATE_RECIPE_SUCCESS:
            console.log(state, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<state")
            return [
                ...state,
                Object.assign({}, action.recipe)
            ];
        case types.UPDATE_RECIPE_SUCCESS:
            console.log("**********>>>>>>>>>>>>>>>>recipes-update", state, action.recipe)
            return [
                ...state.filter(recipe => recipe.id !== action.recipe.id),
                Object.assign({}, action.recipe)
            ];
        default:
            return state;
    }
    //console.log("=======================<<<<<<<<after-recipe-action", action.recipe)
}