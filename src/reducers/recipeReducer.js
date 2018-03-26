import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function recipeReducer(state = initialState.recipes, action) {
  switch (action.type) {
    case types.LOAD_RECIPES_SUCCESS:
      return action.recipes;
    case types.CREATE_RECIPE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.recipe),
      ];
    case types.UPDATE_RECIPE_SUCCESS:
      return [
        ...state.filter(recipe => recipe.id !== action.recipe.id),
        Object.assign({}, action.recipe),
      ];
    default:
      return state;
  }
}
