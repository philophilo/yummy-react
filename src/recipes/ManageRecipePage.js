import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as RecipeActions from '../actions/recipeActions';
import RecipeForm from './RecipeForm';


class ManageRecipePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log(this.props.actions, "<<<<<<<<Manage recipe constructor props.actions")
        this.state = {
            recipe: Object.assign({}, props.recipe),
            errors: {}
        };
        // TODO find best practice for binding
        this.updateRecipeState = this.updateRecipeState.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (this.props.recipe.id !== nextProps.recipe.id){
            // necessary to populate the form when existing course is loaded directly
            this.setState({recipe: Object.assign({}, nextProps.recipe)});
        }
    }

    updateRecipeState(event) {
        const field = event.target.name;
        console.log(this.state, '<<<<<<<<<Manage recipe fields', field)
        let recipe = this.state.recipe;
        recipe[field] = event.target.value;
        return this.setState({recipe: recipe});
    }

    saveRecipe(event){
        event.preventDefault();
        // in actions, save course
        console.log(this.state.recipe, this.props.categoryForRecipe, "<<<<<<<<Manage recipe saving>>>>>>>>>")
        this.props.actions.saveRecipe(this.state.recipe, this.props.categoryForRecipe)
        //  .then(() => this.context.router.history.push('/recipes'))
        // this.context.router.history.push('/recipes');
    }

    render() {
        // setting props for courseForm
        return (
            <RecipeForm 
                onChange={this.updateRecipeState}
                onSave={this.saveRecipe}
                recipe={this.state.recipe}
                errors={this.state.errors}
            />
        );
    }
}

// setting the props of the ManageCoursePage
ManageRecipePage.propTypes = {
    recipe: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    categoryForRecipe: PropTypes.object
};

// pull in the react router context so router is vailbel in this.context.router
ManageRecipePage.contextTypes = {
    router: PropTypes.object
};

function getRecipeById(recipes, id){
    console.log(recipes, id, "()()()()")
    const recipe = recipes.filter(recipe => recipe.id == id);
    console.log('recipe>>>>', recipe)
    if (recipe) return recipe[0]; // since filter returns an array, grab the first
    return null;
}

// parsing the state to the class
function mapStateToProps(state, ownProps){
    let recipe = {id: '', recipe_name: '', ingredients:'', description: '', recipe_date: '', categoryId: ''};
    let categoryForRecipe = ownProps.match.params.categoryId
    console.log("--------------------------------------------------------++++++++++++++++++++++++++++category id", ownProps.match.params)
    if (ownProps.match.params){
        const recipeId = ownProps.match.params.id // from the path /recipe/:id
        if (recipeId && state.recipes.length > 0){
            recipe = getRecipeById(state.recipes, recipeId);
        }
    }
    
    return {
        recipe: recipe,
        categoryForRecipe
    };
}

// dispatch actions of the class
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(RecipeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecipePage);