import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import Textarea from '../common/Textarea';

const RecipeForm = ({recipe, onSave, onChange, loading, errors}) => {
    return (
        <div  className='container-fluid body-bg'>
            <form>
                {recipe.category_id ?
                    <h1>Edit Recipe</h1>
                :
                    <h1>Add recipe</h1>
                }
                <TextInput
                    name="recipe_name"
                    label="RecipeName"
                    value={recipe.recipe_name}
                    onChange={onChange}
                    error={errors.title} />
                
                <Textarea 
                    name="description"
                    label="RecipeDescription"
                    value={recipe.description}
                    onChange={onChange}
                    error={errors.title}/>
                
                <Textarea 
                    name="ingredients"
                    label="Ingredients"
                    value={recipe.ingredients}
                    onChange={onChange}
                    error={errors.title}/>
                
                <input
                    type="submit"
                    disabled={loading}
                    value={loading ? 'Saving...' : 'Save'}
                    className="btn btn-primary"
                    onClick={onSave} />
            </form>
        </div>
    );
};

RecipeForm.propTypes = {
    recipe: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    errors: PropTypes.object
};

export default RecipeForm;