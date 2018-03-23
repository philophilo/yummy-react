import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as categoryActions from '../../actions/categoryActions';
import CategoryForm from './CategoryForm';


export class ManageCategoryPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      category: Object.assign({}, props.category),
      errors: {},
    };

    this.updateCategoryState = this.updateCategoryState.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.category.id !== nextProps.category.id) {
      // necessary to populate the form when existing category is loaded directly
      this.setState({ category: Object.assign({}, nextProps.category) });
    }
  }

  updateCategoryState(event) {
    const field = event.target.name;
    const category = this.state.category;
    category[field] = event.target.value;
    return this.setState({ category: category });
  }

  saveCategory(event) {
    event.preventDefault();
    // in actions, save course
    this.props.actions.saveCategory(this.state.category);
  }

  render() {
    // setting props for courseForm
    return (
      <CategoryForm
        onChange={this.updateCategoryState}
        onSave={this.saveCategory}
        category={this.state.category}
        errors={this.state.errors}
      />
    );
  }
}

// setting the props of the ManageCoursePage
ManageCategoryPage.propTypes = {
  category: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

// pull in the react router context so router is vailbel in this.context.router
ManageCategoryPage.contextTypes = {
  router: PropTypes.object,
};

function getCategoryById(categories, id) {
  const category = categories.filter(category => category.id === id);
  if (category) return category[0]; // since filter returns an array, grab the first
  return null;
}

// parsing the state to the class
function mapStateToProps(state, ownProps) {
  let category = { id: '', category_name: '', category_description: '', date: '' };
  if (ownProps.match.params) {
    const categoryId = ownProps.match.params.id; // from the path /category/:id
    if (categoryId && state.categories.length > 0) {
      category = getCategoryById(state.categories, categoryId);
    }
  }
  return {
    category: category,
  };
}

// dispatch actions of the class
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(categoryActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategoryPage);
