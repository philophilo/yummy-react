import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ name, label, onChange, defaultOption, value, error, options }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        { /* value is set here rather than on the option */}
        <textarea
          name={name}
          value={value}
          rows="8"
          cols="100"
          onChange={onChange}
          className="form-control"
        >
        </textarea>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default Textarea;
