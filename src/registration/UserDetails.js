import React from 'react';
import PropTypes from 'prop-types';
import UserListRow from './UserListRow';
import register from '../registerServiceWorker';

const UserDetails = ({register}) => {
    console.log('------------->>>>', register)
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Length</th>
                </tr>
            </thead>
            <tbody>
                {/* Parsing props for register */}
                {register.map(user =>
                    <UserListRow key={user.id} user={user}/>
                )}
            </tbody>
        </table>
    );
};

UserDetails.propTypes = {
    register: PropTypes.array.isRequired
};

export default UserDetails;
