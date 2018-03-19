import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoryActions from '../actions/categoryActions';
import CategoryList from './CategoryList';
import { push } from 'react-router-redux';
import { Pagination } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Autosuggest from 'react-autosuggest';


class CategoriesPage extends React.Component{
    constructor(props, context) {
        super(props, context)
        this.deleteCategory = this.deleteCategory.bind(this);
        this.completeDelete = this.completeDelete.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
        // this.handleSearchQuery = this.handleSearchQuery.bind(this)
        this.cats = [...this.props.categories]
        
        this.state = {
            categories: [...this.props.categories],
            pages: Object.assign({}, this.props.pages),
            value: '',
            suggestions: [],
            currentPageNumber: this.props.pages.current_page,
            searchCalled: false
        }
        console.log("======================= search state cons", this.state.searchCalled)
        // this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
        console.log("========================>>>>>>>000000", this.state.categories)
    }

    onChange = ( event, { newValue } ) => {
        this.setState({
            value: newValue
        });
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
        console.log("=========================.>>>>>>> sugggestion value ", suggestionValue)
        this.props.actions.searchCategories(suggestionValue)
    }

    
    getSuggestions = value => {
        console.log("============================get suggestions", value)
        if (this.props.categories.length > 0) {
            const inputValue = value.trim().toLowerCase();
            const inputLength = inputValue.length;
            return inputLength === 0 ? [] : this.props.categories.filter(category => 
                category.category_name.toLowerCase().slice(0, inputLength) === inputValue
            );
        }else{
            return ''
        }
    }

    getSuggestionValue = suggestion => suggestion.category_name

    renderSuggestion = suggestion => (
        <div>
            {suggestion.category_name}
        </div>
    );

    handleSearchQuery = (event) => {
        event.preventDefault()
        const search = event.target.elements[0].value
        // alert(React.findDOMNode(this.refs.theInput).value)
        console.log("search function>>>>>>>>", search)
        this.state.searchCalled = true
        this.props.actions.searchCategories(search)
    }

    completeDelete = (category_id) => {
        this.props.actions.deleteCategory(category_id)
    }

    deleteCategory(event){

        var data= event.currentTarget.dataset.id.split(',')
        var category_id = data[0]
        var category_name = data[1]
        
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete '+ category_name ,
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            buttons: [
                {
                  label: 'Cancel'
                },
                {
                  label: 'Delete',
                  onClick: () => this.completeDelete(category_id)
                }
            ]
        })
        
    }

    handlePageSelect(number) {
        this.setState({ currentPageNumber: number });
        if(this.state.searchCalled){
            this.props.actions.searchCategories(this.state.value, number)
        }else{
            this.props.actions.loadCategories(number);
        }
        
    }

    render() {
        const {categories, pages} = this.props;
        const {value, suggestions } = this.state;
        const  inputProps = {
            placeholder: 'search category',
            value,
            onChange: this.onChange
        };
        const items = []
        
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
            )

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
            <div  className='container-fluid body-bg'>
                <h1>Categories</h1>
                <a className="btn btn-primary" 
                href='/add/category' >Add category</a>

                <form onSubmit={this.handleSearchQuery}>

                    <Autosuggest 
                        suggestions = {suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        onSuggestionSelected={this.onSuggestionSelected}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                    />

                </form>

                <CategoryList 
                    categories={categories} 
                    onDelete={this.deleteCategory}
                />
                <Pagination>
                    <Pagination bsSize="medium">{ items }</Pagination>
                </Pagination>
            </div>
        );
    }
}

CategoriesPage.propTypes = {
    categories: PropTypes.array.isRequired,
    pages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps){
    return {
        // accessing the state that is within the redux store
        categories: state.categories,
        pages: state.pagination
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(categoryActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (CategoriesPage);
