import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registrationActions from '../actions/registrationActions';
import UserDetails from './UserDetails';
import { push } from 'react-router-redux';

class UserDetailsPage extends React.Component{
    constructor(props, context) {
        super(props, context)
        
    }
    
    render() {
        const {register} = this.props;
        return (
            <div className='container-fluid body-bg'>
                <h1>User Details</h1>
                <input type="submit"
                    value="Edit User"
                    className="btn btn-primary"
                    onClick={this.props.actions.redirectToRegister}
                    />
                <UserDetails register={register}/>
            </div>
        );
    }
}

UserDetailsPage.propTypes = {
    register: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps){
    console.log("here", state)
    return {
        // accessing the state that is within the redux store
        register: state.register
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({
            registrationActions,
            redirectToRegister: () => push('/edit-profile')
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (UserDetailsPage);
