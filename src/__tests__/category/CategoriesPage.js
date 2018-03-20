import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import CategoriesPage from '../../category/CategoriesPage';

Enzyme.configure({ adapter: new Adapter() });

describe('<CategoriesPage />', () => {
  const store = configureMockStore([thunk])({
    register: [],
    login:[],
    categories: [],
    recipes: [],
    pagination: [],
    ajaxCallsInProgress: 0
  });

  const props = {
    pages: {
      current_page: 1,
      message: 'categories found',
      next_page: 2,
      number_of_pages: 4,
      previous_page: null,
    },
    categories: [{
      category_description: 'this is chicken',
      category_name: 'My chicken',
      id: 24,
      message: 'category found',
    }],
  };
  it('should render itself without crashing', () => {
    mount(<Provider store={store}><CategoriesPage {...props} /></Provider>);
  });
});
