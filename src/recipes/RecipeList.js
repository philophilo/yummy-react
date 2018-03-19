import React from 'react';
import PropTypes from 'prop-types';
import RecipeListRow from './RecipeListRow';

const RecipeList = ({recipes, onDelete}) => {
    console.log("-----------------", recipes)
    return (
        <table className="table">
            <thead>
                <tr>
                    
                    <th>Name</th>
                    <th>Ingredients</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {recipes.map(recipe =>
                    <RecipeListRow key={recipe.id} category={recipe.category_id} recipe={recipe} onDelete={onDelete} />
                )}
            </tbody>
        </table>
    );
};

RecipeList.propTypes = {
    recipes: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default RecipeList;
