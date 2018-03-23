import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as registrationActions from '../../actions/registrationActions';
import RegistrationForm from './RegistrationForm';


class ManageRegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      register: Object.assign({}, props.register),
      errors: {},
    };
    // TODO find best practice for binding
    this.updateRegistrationState = this.updateRegistrationState.bind(this);
    this.saveRegistration = this.saveRegistration.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.register.id !== nextProps.register.id) {
      // necessary to populate the form when existing registration is loaded directly
      this.setState({ register: Object.assign({}, nextProps.register) });
    }
  }

  updateRegistrationState(event) {
    const field = event.target.name;
    const register = this.state.register;
    register[field] = event.target.value;
    return this.setState({ register: register });
  }

  saveRegistration(event) {
    event.preventDefault();
    // in actions, save registration
    if (this.props.editUser) {
      this.props.actions.changePassword(this.state.register);
    } else {
      this.props.actions.saveRegistration(this.state.register).then(() => {
        this.redirect();
      }).catch(error => {
        toastr.error(error);
      });
    }
  }

  redirect() {
    toastr.success(this.state.register.username, 'registered successfully');
    this.context.router.history.push('/login');
  }

  render() {
    // setting props for RegistrationForm
    return (
      <RegistrationForm
        onChange={this.updateRegistrationState}
        onSave={this.saveRegistration}
        register={this.state.register}
        errors={this.state.errors}
        editUser={this.props.editUser}
      />
    );
  }
}

// setting the props of the ManageRegistrationPage
ManageRegistrationPage.propTypes = {
  register: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  editUser: PropTypes.bool.isRequired,
};

// pull in the react router context so router is vailbel in this.context.router
ManageRegistrationPage.contextTypes = {
  router: PropTypes.object,
};

function getUserById(registration, id) {
  const user = registration.filter(u => u.id === id);
  if (user) return user[0]; // since filter returns an array, grab the first
  return null;
}

// parsing the state to the class
function mapStateToProps(state, ownProps) {
  let user = { id: '', name: '', email: '', username: '', password: '', confirmPassword: '' };
  let editUser = false;
  if (ownProps.match.params) {
    const userId = ownProps.match.params.id; // from the path /course/:id
    if (userId && state.register.length > 0) {
      user = getUserById(state.register, Number(userId));
      editUser = true;
    }
  }
  return {
    register: user,
    editUser: editUser,
  };
}

// dispatch actions of the class
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(registrationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRegistrationPage);
