import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import Textarea from '../common/Textarea';

const CategoryForm = ({ category, onSave, onChange, loading, errors }) => {
  return (
    <div className="container body-bg">
      <div className="row">
        <div className="page-header">
          <div className="left">
            <div className="intro">
              <div className="heading">
                <h1>Manage category</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input-form">
        <div className="">
          <form>
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
      </div>
    </div>
  );
};

CategoryForm.propTypes = {
  category: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoryForm;
