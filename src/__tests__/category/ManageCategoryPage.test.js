import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
 
// import Testutils from 'react-addons-test-utils';
import ManageCategoryPage from '../../category/ManageCategoryPage';

describe('<ManageCategoryPage />', () => {
    const store = configureMockStore([thunk])({
      
    });
  
    const props = {
      categories: [{
        "category_description": "this is chicken",
        "category_name": "My chicken",
        "id": 24
      }]
    };
    it('should render itself without crashing', () => {
        const match = { params: {} }
        mount(<Provider store={store}><ManageCategoryPage {...props} match /></Provider>);
    });

  });