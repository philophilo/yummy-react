import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import RecipesPage from '../../recipes/RecipesPage';

Enzyme.configure({ adapter: new Adapter() });

describe('<RecipesPage />', () => {
  const store = configureMockStore([thunk])({
    register: [],
    login: [],
    categories: [],
    recipes: [],
    pagination: [],
  });

  const props = {
    categoryForRecipe: 24,
    searchCategoryRecipes: jest.fn(),
    pages: {
      current_page: 1,
      message: 'recipes found',
      next_page: 2,
      number_of_pages: 4,
      previous_page: null,
    },
    recipes: [{
      category_id: 24,
      category_name: 'My chicken',
      description: 'sdfdfsdffsd',
      id: 45,
      ingredients: [
        'sdfsdf ',
        '  sdfsd',
        ' sddfd',
      ],
      recipe_date: 'Mon, 19 Mar 2018 09:39:44 GMT',
      recipe_name: 'ajhbdsvkjnds',
    }],
  };
  const preventDefault = jest.fn();
  const component = mount(
    <Provider store={store}>
      <MemoryRouter>
        <RecipesPage {...props} match={{ params: {} }} />
      </MemoryRouter>
    </Provider>);
  it('should render itself without crashing', () => {
    shallow(<Provider store={store}><RecipesPage {...props} /></Provider>);
  });
  it('should have search form', () => {
    expect(component.find('Autosuggest').length).toBe(1);
    expect(component.find('form').length).toBe(1);
    expect(component.find('form').simulate('submit', { preventDefault }));
    expect(preventDefault).toBeCalled();
  });
  it('should have table', () => {
    expect(component.find('table').length).toBe(1);
  });
  it('should have pagination list', () => {
    expect(component.find('ul .pagination').length).toBe(2);
  });
});
