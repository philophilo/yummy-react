import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as registrationActions from '../../actions/registrationActions';
import UserDetails from './UserDetails';

class UserDetailsPage extends React.Component {
  render() {
    const { register } = this.props;
    return (
      <div className="container body-bg">
        <div className="row">
          <div className="page-header">
            <div className="left">
              <div className="intro">
                <div className="heading">
                  <h1>User Details</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <UserDetails register={register} />
      </div>
    );
  }
}

UserDetailsPage.propTypes = {
  register: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    // accessing the state that is within the redux store
    register: state.register,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      registrationActions,
      redirectToRegister: () => push('/edit-profile'),
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage);
