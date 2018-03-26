import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Icon } from 'antd';


const CategoryListRow = ({ category, onDelete, index }) => {
  return (

    <div>
      <div className="col-sm-6">
        <div className="media-wrapper">
          <div className="media">
            <div className="media-body">
              <Link to={`/view/category/${category.id}/recipes/`}><h5 className="media-heading">{category.category_name}</h5></Link>
              <div className="post-content">
                <div className="item-details">
                  {category.category_description}
                </div>
              </div>
              <div className="timing">
                <span className="pull-right posted-date">Posted: {category.category_date}</span>
              </div>
            </div>

          </div>
          <div className="comments">
            <p className="pull-right">
              <Link to={`/create/category/${category.id}/recipe/`}>
                <Icon type="download" />Add recipe
              </Link>
              <Link to={`/category/${category.id}`}><Icon type="edit" />Edit </Link>
              <a
                id={category.id}
                data-id={[category.id, category.category_name]}
                onClick={onDelete}
              >
                <Icon type="delete" /> Delete
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryListRow.propTypes = {
  category: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CategoryListRow;
