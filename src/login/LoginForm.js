import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import EmailInput from '../common/EmailInput';
import { Link } from 'react-router-dom';

const LoginForm = ({login, onSave, onChange, loading, errors}) => {
    return (
        <div  className='container-fluid body-bg'>
            <form>
                <h1>Yummy recipes Login</h1>
                <TextInput
                    name="username"
                    label="Username"
                    value={login.username}
                    onChange={onChange}
                    error={errors.username} />

                <TextInput
                    name="password"
                    label="Password"
                    value={login.password}
                    onChange={onChange}
                    error={errors.password} />

                <input
                    type="submit"
                    disabled={loading}
                    value={'Login'}
                    className="btn btn-primary"
                    onClick={onSave} />

                <span> </span>

                <Link to="/register">
                    <input
                        type="button"
                        disabled={loading}
                        value={'Register'}
                        className="btn btn-warning"
                         />
                </Link>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    login: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    errors: PropTypes.object
};

export default LoginForm;
