import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Icon } from 'antd';


const CategoryListRow = ({category, onDelete}) => {
    
    return (
        <tr>
            <td><Link to={'/view/category/'+category.id+'/recipes/'}>{category.category_name}</Link></td>
            <td>{category.category_description}</td>
            <td>{category.category_date} </td>
            <td><Link to={'/create/category/'+category.id+'/recipe/'}><Icon type="download" />Add recipe</Link></td>
            <td><Link to={'/category/'+category.id}><Icon type="edit" />Edit</Link></td>
            <td id={category.id} data-id={[category.id,category.category_name]} onClick={onDelete}>
            <Icon type="delete" /> Delete
            {
                // '/view/category/'+category.id+'/recipes/'
            }
            </td>
        </tr>
    );
};

CategoryListRow.propTypes = {
    category: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default CategoryListRow;
