import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import RecipeForm from '../../recipes/RecipeForm';

Enzyme.configure({ adapter: new Adapter() });

describe('<RecipeForm />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    onSave: jest.fn(),
    onChange: jest.fn(),
    errors: {},
    recipe: {
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
    },
  };

  const preventDefault = jest.fn();
  const component = mount(
    <Provider store={store}>
      <RecipeForm {...props} match />
    </Provider>);

  it('should render itself without crashing', () => {
    mount(
      <Provider store={store}>
        <RecipeForm {...props} match={{ params: {} }} />
      </Provider>);
  });
  it('should render form', () => {
    expect(component.find('form').length).toBe(1);
    expect(component.find('form').simulate('submit', { preventDefault }));
  });
});
