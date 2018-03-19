import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../actions/loginActions';
import LoginForm from './LoginForm';
import toastr from 'toastr'
import { loadCategories } from '../actions/categoryActions'
import configureStore from '../store/configureStore'


class ManageLoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            login: Object.assign({}, props.login),
            errors: {}
        };
        this.updateLoginState = this.updateLoginState.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (this.props.login.id !== nextProps.login.id){
            // necessary to populate the form when existing registration is loaded directly
            this.setState({login: Object.assign({}, nextProps.login)});
        }
    }

    updateLoginState(event) {
        const field = event.target.name;
        let login = this.state.login;
        login[field] = event.target.value;
        return this.setState({login: login});
    }

    doLogin(event){
        event.preventDefault();
        // in actions, save registration
        this.props.actions.doLogin(this.state.login).then(() => {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            configureStore.dispatch(loadCategories())
            toastr.success("Hi "+ this.state.login.username + ", welcome")
            this.context.router.history.push('/categories');
        }).catch(error => {
            toastr.error(error)
        })
        console.log('1=========', this.state.login)
        
    }

    render() {
        // setting props for RegistrationForm
        return (
            <LoginForm 
                onChange={this.updateLoginState}
                onSave={this.doLogin}
                login={this.state.login} 
                errors={this.state.errors}
            />
        );
    }
}

// setting the props of the ManageLoginPage
ManageLoginPage.propTypes = {
    login: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

// pull in the react router context so router is vailbel in this.context.router
ManageLoginPage.contextTypes = {
    router: PropTypes.object
};

// parsing the state to the class
function mapStateToProps(state, ownProps){
    let login = { username: '', password: '' };
    return {
        login: login
    };
}

// dispatch actions of the class
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLoginPage);