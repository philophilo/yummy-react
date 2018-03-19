import React from 'react';
import PropTypes from 'prop-types';
import CategoryListRow from './CategoryListRow';

const CategoryList = ({categories, onDelete}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    
                    <th>Name</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {categories.map(category =>
                    <CategoryListRow key={category.id} category={category} onDelete={onDelete}/>
                )}
            </tbody>
        </table>
    );
};

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default CategoryList;
