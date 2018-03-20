import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Icon } from 'antd';

const RecipeListRow = ({recipe, onDelete}) => {
    return (
        
        <div>
            <div class="col-sm-6">
                <div class="media-wrapper">
                    <div class="media">
                        <div class="media-body">
                            <Link to={'#'}><h5 class="media-heading">{recipe.recipe_name}</h5></Link>
                            <div class="post-content">
                                <div class="item-details">
                                    {recipe.description}
                                </div>
                                Ingredients
                                <ol className="list-ingredients">
                                    {recipe.ingredients.map(ingredient => <li>{ingredient}</li>)}
                                </ol>
                            </div>
                            <div class="timing">
                                <span class="pull-right posted-date">Posted: {recipe.recipe_date}</span>
                            </div>
                        </div>
                        
                    </div>
                    <div class="comments">
                        <p class="pull-right">
                            <Link to={'/recipe/'+recipe.id}><Icon type="edit" />Edit</Link>
                            <a id={recipe.id} data-id={[recipe.id,recipe.recipe_name,recipe.category_id]} onClick={onDelete}>
                                <Icon type="delete" /> Delete
                            </a>
                        </p>
                    </div>
                </div>
            </div> 
        </div>
    );
};

RecipeListRow.propTypes = {
    recipe: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default RecipeListRow;
