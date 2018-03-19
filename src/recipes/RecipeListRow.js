import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Icon } from 'antd';

const RecipeListRow = ({recipe, onDelete}) => {
    return (
        <tr>
            <td>{recipe.recipe_name}</td>
            <td>{recipe.ingredients}</td>
            <td>{recipe.description}</td>
            <td>{recipe.recipe_date}</td>
            <td><Link to={'/recipe/'+recipe.id}><Icon type="edit" />Edit</Link></td>
            <td id={recipe.id} data-id={[recipe.id,recipe.recipe_name,recipe.category_id]} onClick={onDelete}>
            <Icon type="delete" /> Delete

            </td>
        </tr>
    );
};

RecipeListRow.propTypes = {
    recipe: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default RecipeListRow;
