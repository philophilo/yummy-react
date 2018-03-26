import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import Autosuggest from 'react-autosuggest';
import 'react-confirm-alert/src/react-confirm-alert.css';
import RecipeList from './RecipeList';
import * as recipeActions from '../../actions/recipeActions';

class RecipesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.props.recipes;
    this.props.actions.loadCategoryRecipes(props.match.params.id);
    this.deleteRecipes = this.deleteRecipes.bind(this);
    this.completeDelete = this.completeDelete.bind(this);
    this.redirectToAddRecipePage = this.redirectToAddRecipePage.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
    this.state = {
      value: '',
      suggestions: [],
      currentPageNumber: this.props.pages.current_page,
      search: false,
    };
    // this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue,
      });
    }

    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: this.getSuggestions(value),
      });
    }

    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: [],
      });
    };

    onSuggestionSelected = (event,
      { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
      this.props.actions.searchCategoryRecipes(suggestionValue);
    }


    getSuggestions = value => {
      if (this.props.recipes.length > 0) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : this.props.recipes.filter(recipe =>
          recipe.recipe_name.toLowerCase().slice(0, inputLength) === inputValue,
        );
      }
      return null;
    }

    getSuggestionValue = suggestion => suggestion.recipe_name;

    renderSuggestion = suggestion => (
      <div>
        {suggestion.recipe_name}
      </div>
    );

    redirectToAddRecipePage(elementObject) {
      this.context.router.history.push(`/create/category/${elementObject.category_id}/recipe/`);
    }

    completeDelete = (categoryId, recipeId) => {
      this.props.actions.deleteRecipe(categoryId, recipeId);
    }


    handleSearchQuery = (event) => {
      event.preventDefault();
      const search = event.target.elements[0].value;
      // alert(React.findDOMNode(this.refs.theInput).value)
      this.setState({ search: true });
      this.props.actions.searchCategoryRecipes(search);
    }

    deleteRecipes(event) {
      const data = event.currentTarget.dataset.id.split(',');
      const recipeId = data[0];
      const recipeName = data[1];
      const categoryId = data[2];

      confirmAlert({
        title: 'Confirm to delete',
        message: `Are you sure you want to delete ${recipeName}`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        buttons: [
          {
            label: 'Cancel',
          },
          {
            label: 'Delete',
            onClick: () => this.completeDelete(categoryId, recipeId),
          },
        ],
      });
    }

    handlePageSelect(number) {
      this.setState({ currentPageNumber: number });
      if (this.state.search) {
        this.props.actions.searchCategoryRecipes(this.state.value, number);
      } else if (this.props.recipes.length > 0) {
        this.props.actions.loadCategoryRecipes(this.props.recipes[0].category_id, number);
      }
    }


    render() {
      const { recipes, pages } = this.props;
      const elementObject = recipes[0];
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: 'search recipe',
        value,
        onChange: this.onChange,
      };
      const items = [];

      if (pages.number_of_pages) {
        items.push(
          <Pagination.First
            key={0}
            disabled={this.currentPageNumber === 1}
            onClick={this.handlePageSelect.bind(this, 1)}
          />,
          <Pagination.Prev
            key={1}
            disabled={this.state.currentPageNumber === 1}
            onClick={this.handlePageSelect.bind(this,
                (this.state.currentPageNumber - 1) > 1 ? this.state.currentPageNumber - 1 : 1)}
          />,
        );

        for (let i = 1; i <= this.props.pages.number_of_pages; i++) {
          items.push(
            <Pagination.Item
              key={i + 1}
              active={i === this.state.currentPageNumber}
              onClick={this.handlePageSelect.bind(this, i)}
            >{i}
            </Pagination.Item>,
          );
        }
        items.push(
          <Pagination.Next
            key={items.length + 1}
            disabled={this.state.currentPageNumber === this.props.pages.number_of_pages}
            onClick={this.handlePageSelect.bind(this,
                (this.state.currentPageNumber + 1) <= this.props.pages.number_of_pages
                ? this.state.currentPageNumber + 1 : this.props.pages.number_of_pages)}
          />,
          <Pagination.Last
            key={items.length + 2}
            disabled={this.state.currentPageNumber === this.props.pages.number_of_pages}
            onClick={this.handlePageSelect.bind(this, this.props.pages.number_of_pages)}
          />,
        );
      }

      return (
        <div className="container body-bg">
          <div className="row">
            <div className="page-header">
              <div className="left">
                <div className="intro">
                  <div className="heading">
                    <h1> {recipes.length > 0 ? `${elementObject.category_name} recipes` : null} </h1>
                  </div>
                  <div className="add-button">
                    {recipes.length > 0 ?
                      <Link
                        className="btn btn-primary"
                        to={`/create/category/${elementObject.category_id}/recipe/`}
                      >
                                    Add recipe
                      </Link>
                            : null}
                  </div>
                </div>
              </div>
              <div className="right">
                <form onSubmit={this.handleSearchQuery}>
                  <div className="form-group">
                    <div className="field">
                      <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        onSuggestionSelected={this.onSuggestionSelected}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <RecipeList recipes={recipes} onDelete={this.deleteRecipes} />

          <section>
            <div className="row paging">
              <Pagination>
                <Pagination bsSize="medium">{ items }</Pagination>
              </Pagination>
            </div>
          </section>

        </div>
      );
    }
}

RecipesPage.propTypes = {
  recipes: PropTypes.array.isRequired,
  pages: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    // accessing the state that is within the redux store
    recipes: state.recipes,
    pages: state.pagination,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recipeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);
