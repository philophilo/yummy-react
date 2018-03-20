import React from 'react';
import PropTypes from 'prop-types';
import CategoryListRow from './CategoryListRow';

const CategoryList = ({ categories, onDelete }) => {
  let index = 1;
  return (

    categories.map(category =>
      <CategoryListRow index={index++} key={category.id} category={category} onDelete={onDelete} />,
    )
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CategoryList;
