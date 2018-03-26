import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import Textarea from '../common/Textarea';

const RecipeForm = ({ recipe, onSave, onChange }) => {
  return (
    <div className="container body-bg">
      <div className="row">
        <div className="page-header">
          <div className="left">
            <div className="intro">
              <div className="heading">
                {recipe.category_id ?
                  <h1>Edit Recipe</h1>
                            :
                  <h1>Add recipe</h1>
                            }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input-form">
        <form>
          <TextInput
            name="recipe_name"
            label="RecipeName"
            value={recipe.recipe_name}
            onChange={onChange}
          />

          <Textarea
            name="description"
            label="RecipeDescription"
            value={recipe.description}
            onChange={onChange}
          />

          <Textarea
            name="ingredients"
            label="Ingredients"
            value={recipe.ingredients}
            onChange={onChange}
          />

          <input
            type="submit"
            value="Save"
            className="btn btn-primary"
            onClick={onSave}
          />
        </form>
      </div>
    </div>
  );
};

RecipeForm.propTypes = {
  recipe: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RecipeForm;
