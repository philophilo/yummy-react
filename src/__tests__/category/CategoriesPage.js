import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
 
// import Testutils from 'react-addons-test-utils';
import CategoriesPage from '../../category/CategoriesPage';

describe('<CategoriesPage />', () => {
    const store = configureMockStore([thunk])({
      
    });
  
    const props = {
        pages: {
            current_page: 1,
            message: "categories found",
            next_page: 2,
            number_of_pages:4,
            previous_page: null
        },
        categories: [{
            "category_description": "this is chicken",
            "category_name": "My chicken",
            "id": 24,
            "message": "category found"
        }]
    };
    it('should render itself without crashing', () => {
        shallow(<Provider store={store}><CategoriesPage {...props} /></Provider>);
    });

});