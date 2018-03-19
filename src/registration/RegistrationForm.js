import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import EmailInput from '../common/EmailInput';
import { Link } from 'react-router-dom'

const RegistrationForm = ({register, onSave, onChange, loading, errors}) => {
    return (
        <div className='container-fluid body-bg'>
            <form>
                <h1>Yummy recipes registration</h1>
                <TextInput
                    name="name"
                    label="Name"
                    value={register.name}
                    onChange={onChange}
                    error={errors.name} />

                <EmailInput
                    name="email"
                    label="Email"
                    value={register.email}
                    onChange={onChange}
                    error={errors.email} />

                <TextInput
                    name="username"
                    label="Username"
                    value={register.username}
                    onChange={onChange}
                    error={errors.username} />

                <TextInput
                    name="password"
                    label="Password"
                    value={register.password}
                    onChange={onChange}
                    error={errors.password} />

                <TextInput
                    name="confirmPassword"
                    label="ConfirmPassword"
                    value={register.confirmPassword}
                    onChange={onChange}
                    error={errors.confirmPassword} />

                <input
                    type="submit"
                    disabled={loading}
                    value={loading ? 'Saving...' : 'Register'}
                    className="btn btn-primary "
                    onClick={onSave} />

                <span> </span>

                <Link to="/login">
                    <input
                        type="button"
                        disabled={loading}
                        value={'Login'}
                        className="btn btn-success"
                         />
                </Link>
            </form>
        </div>
    );
};

RegistrationForm.propTypes = {
    register: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    errors: PropTypes.object
};

export default RegistrationForm;
