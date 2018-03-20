import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import Textarea from '../common/Textarea';

const CategoryForm = ({ category, onSave, onChange, loading, errors }) => {
  return (
    <div className="container-fluid body-bg">
      <form>
        <h1>Manage category</h1>
        <TextInput
          name="category_name"
          label="CategoryName"
          value={category.category_name}
          onChange={onChange}
          error={errors.title}
        />

        <Textarea
          name="category_description"
          label="Description"
          value={category.category_description}
          onChange={onChange}
          error={errors.title}
        />

        <input
          type="submit"
          disabled={loading}
          value={loading ? 'Saving...' : 'Save'}
          className="btn btn-primary"
          onClick={onSave}
        />
      </form>
    </div>
  );
};

CategoryForm.propTypes = {
  category: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
};

export default CategoryForm;
