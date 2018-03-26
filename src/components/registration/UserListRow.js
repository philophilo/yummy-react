import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserListRow = ({ user }) => {
  return (
    <table className="table">
      <tr><th>Name</th><td>{user.name}</td></tr>
      <tr><th>Username</th><td>{user.username}</td></tr>
      <tr><th>Email</th><td>{user.email}</td></tr>
      <tr><th>Change password</th><td><Link to={`/edit/user/${user.id}`}>change password</Link></td></tr>
    </table>
    
  );
};

UserListRow.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserListRow;
