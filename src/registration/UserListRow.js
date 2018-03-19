import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const UserListRow = ({user}) => {
    return (
        <tr>
            <td><Link to={'/register/'+user.id}>{user.name}</Link></td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
        </tr>
    );
};

UserListRow.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserListRow;
