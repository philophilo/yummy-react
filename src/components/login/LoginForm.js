import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import TextInput from '../common/TextInput';
import EmailInput from '../common/EmailInput';
import PasswordInput from '../common/PasswordInput';


const LoginForm = ({ login, onSave, onChange, loading, errors }) => {
  return (
    <div className="container body-bg">
      <div className="row">
        <div className="page-header">
          <div className="left">
            <div className="intro">
              <div className="heading">
                <h1>Yummy recipes Login</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input-form">
        <form>
          <TextInput
            name="username"
            label="Username"
            value={login.username}
            onChange={onChange}
            error={errors.username}
          />

          <PasswordInput
            name="password"
            label="Password"
            value={login.password}
            onChange={onChange}
            error={errors.password}
          />

          <input
            type="submit"
            disabled={loading}
            value="Login"
            className="btn btn-primary"
            onClick={onSave}
          />

          <span> </span>

          <Link to="/register">
            <input
              type="button"
              disabled={loading}
              value="Register"
              className="btn btn-warning"
            />
          </Link>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
};

export default LoginForm;
