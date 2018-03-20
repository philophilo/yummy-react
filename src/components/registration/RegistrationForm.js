import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import EmailInput from '../common/EmailInput';
import PasswordInput from '../common/PasswordInput';

const RegistrationForm = ({ register, onSave, onChange, loading, errors, editUser }) => {
  if (!editUser) {
    return (
      <div className="container body-bg">
        <div className="row">
          <div className="page-header">
            <div className="left">
              <div className="intro">
                <div className="heading">
                  <h1>Yummy recipes Registration</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="input-form">
          <form>
            <TextInput
              name="name"
              label="Name"
              value={register.name}
              onChange={onChange}
              error={errors.name}
              required
            />

            <EmailInput
              name="email"
              label="Email"
              value={register.email}
              onChange={onChange}
              error={errors.email}
            />

            <TextInput
              name="username"
              label="Username"
              value={register.username}
              onChange={onChange}
              error={errors.username}
            />

            <PasswordInput
              name="password"
              label="Password"
              value={register.password}
              onChange={onChange}
              error={errors.password}
            />

            <PasswordInput
              name="confirmPassword"
              label="ConfirmPassword"
              value={register.confirmPassword}
              onChange={onChange}
              error={errors.confirmPassword}
            />

            <input
              type="submit"
              disabled={loading}
              value={loading ? 'Saving...' : 'Register'}
              className="btn btn-primary "
              onClick={onSave}
            />

            <span> </span>

            <Link to="/login">
              <input
              type="button"
              disabled={loading}
              value="Login"
              className="btn btn-success"
            />
            </Link>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container body-bg">
        <div className="row">
          <div className="page-header">
            <div className="left">
              <div className="intro">
                <div className="heading">
                  <h1>Change password</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="input-form">
          <form>

            <TextInput
              name="name"
              label="Name"
              value={register.name}
              error={errors.name}
            />

            <EmailInput
              name="email"
              label="Email"
              className="disabled"
              value={register.email}
              error={errors.email}
            />

            <TextInput
              name="username"
              label="Username"
              className="disabled"
              value={register.username}
              error={errors.username}
            />

            <PasswordInput
              name="current_password"
              label="Current password"
              value={register.password}
              onChange={onChange}
              error={errors.password}
            />

            <PasswordInput
              name="new_password"
              label="New password"
              value={register.password}
              onChange={onChange}
              error={errors.password}
            />

            <PasswordInput
              name="confirm_password"
              label="Confirm Password"
              value={register.confirmPassword}
              onChange={onChange}
              error={errors.confirmPassword}
            />

            <input
              type="submit"
              disabled={loading}
              value={loading ? 'Saving...' : 'Change password'}
              className="btn btn-primary "
              onClick={onSave}
            />
          </form>
        </div>
      </div>);
  }
};

RegistrationForm.propTypes = {
  register: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
  editUser: PropTypes.bool.isRequired,
};

export default RegistrationForm;
