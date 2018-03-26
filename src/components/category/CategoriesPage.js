import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Pagination } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Autosuggest from 'react-autosuggest';
import * as categoryActions from '../../actions/categoryActions';
import CategoryList from './CategoryList';


class CategoriesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.completeDelete = this.completeDelete.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.cats = [...this.props.categories];

    this.state = {
      categories: [...this.props.categories],
      pages: Object.assign({}, this.props.pages),
      value: '',
      suggestions: [],
      currentPageNumber: this.props.pages.current_page,
      searchCalled: false,
    };
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
      this.props.actions.searchCategories(suggestionValue);
    }


    getSuggestions = value => {
      if (this.props.categories.length > 0) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : this.props.categories.filter(category =>
          category.category_name.toLowerCase().slice(0, inputLength) === inputValue,
        );
      } else {
        return '';
      }
    }

    getSuggestionValue = suggestion => suggestion.category_name

    renderSuggestion = suggestion => (
      <div>
        { suggestion.category_name }
      </div>
    );

    handleSearchQuery = (event) => {
      event.preventDefault();
      const search = event.target.elements[0].value;
      this.setState({ searchCalled: true });
      this.props.actions.searchCategories(search);
    }

    completeDelete = (categoryId) => {
      this.props.actions.deleteCategory(categoryId);
    }

    deleteCategory(event) {
      const data = event.currentTarget.dataset.id.split(',');
      const categoryId = data[0];
      const categoryName = data[1];

      confirmAlert({
        title: 'Confirm to delete',
        message: `Are you sure you want to delete ${categoryName}`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        buttons: [
          {
            label: 'Cancel',
          },
          {
            label: 'Delete',
            onClick: () => this.completeDelete(categoryId),
          },
        ],
      });
    }

    handlePageSelect(number) {
      this.setState({ currentPageNumber: number });
      if (this.state.searchCalled) {
        this.props.actions.searchCategories(this.state.value, number);
      } else {
        this.props.actions.loadCategories(number);
      }
    }

    render() {
      const { categories, pages } = this.props;
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: 'search category',
        value,
        onChange: this.onChange,
      };
        // list to store pagination presentational components and properties
      const items = [];

      if (pages.number_of_pages) {
        // define pagination first and prev presenetational components
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
        // define and give values to pagination item
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
        // define pagination next and last
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


      // render the components
      return (
        <div className="container body-bg">

          <div className="row">
            <div className="page-header">
              <div className="left">
                <div className="intro">
                  <div className="heading">
                    <h1>Categories</h1>
                  </div>
                  <div className="add-button">
                    <Link
                      className="btn btn-primary"
                      to="/add/category"
                    >Add category
                    </Link>
                  </div>

                </div>
              </div>

              <div className="right">
                {
                  // rendering the search with autosuggest
                }
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

          {
                            // render categories component
                        }

          <CategoryList
            categories={categories}
            onDelete={this.deleteCategory}
          />

          <section>
            {
                    // render pagination component
                }
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

// validation of proptypes
CategoriesPage.propTypes = {
  categories: PropTypes.array.isRequired,
  pages: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

// map state to props
function mapStateToProps(state, ownProps) {
  return {
    // accessing the state that is within the redux store
    categories: state.categories,
    pages: state.pagination,
  };
}

// map actions to props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch),
  };
}

// export component
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
