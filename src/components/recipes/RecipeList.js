import React from 'react';
import PropTypes from 'prop-types';
import RecipeListRow from './RecipeListRow';

const RecipeList = ({ recipes, onDelete }) => {
  return (
    recipes.map(recipe =>
      <RecipeListRow
        key={recipe.id}
        category={recipe.category_id}
        recipe={recipe}
        onDelete={onDelete}
      />,
    )
  );
};

// validating props
RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RecipeList;
