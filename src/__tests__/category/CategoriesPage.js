import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import CategoriesPage from '../../category/CategoriesPage';

Enzyme.configure({ adapter: new Adapter() });

describe('<CategoriesPage />', () => {
  const store = configureMockStore([thunk])({
    register: [],
    login: [],
    categories: [],
    recipes: [],
    pagination: [],
    ajaxCallsInProgress: 0,
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
  const preventDefault = jest.fn();
  const component = mount(
    <Provider store={store}>
      <MemoryRouter>
        <CategoriesPage {...props} />
      </MemoryRouter>
    </Provider>);
  it('should render itself without crashing', () => {
    mount(<Provider store={store}><CategoriesPage {...props} /></Provider>);
  });
  it('should search form', () => {
    expect(component.find('form').length).toBe(1);
    expect(component.find('form').simulate('submit', { preventDefault }));
    expect(preventDefault).toBeCalled();
  });
  it('should have pagination list', () => {
    expect(component.find('ul .pagination').length).toBe(2);
  });
});
