import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const RecipeListRow = ({ recipe, onDelete }) => {
  return (

    <div>
      <div className="col-sm-6">
        <div className="media-wrapper">
          <div className="media">
            <div className="media-body">
              <Link to="#"><h5 className="media-heading">{recipe.recipe_name}</h5></Link>
              <div className="post-content">
                <div className="item-details">
                  {recipe.description}
                </div>
                <br />
                  ingredients
                <br />
                {recipe.ingredients}
              </div>
              <div className="timing">
                <span className="pull-right posted-date">Posted: {recipe.recipe_date}</span>
              </div>
            </div>

          </div>
          <div className="comments">
            <p className="pull-right">
              <Link to={`/recipe/${recipe.id}`}><Icon type="edit" />Edit</Link>
              <a
                id={recipe.id}
                data-id={[recipe.id, recipe.recipe_name, recipe.category_id]}
                onClick={onDelete}
                role="button"
              >
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
  onDelete: PropTypes.func.isRequired,
};

export default RecipeListRow;
