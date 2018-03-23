import React from 'react';
import PropTypes from 'prop-types';
import UserListRow from './UserListRow';
import register from '../../registerServiceWorker';

const UserDetails = ({ register }) => {
  return (

    register.map(user =>
      <UserListRow key={user.id} user={user} />,
    )

  );
};

UserDetails.propTypes = {
  register: PropTypes.array.isRequired,
};

export default UserDetails;
