import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import ManageRecipePage from '../../components/recipes/ManageRecipePage';

Enzyme.configure({ adapter: new Adapter() });
describe('<ManageRecipePage />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    categoryForRecipe: 24,
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
  it('should render itself without crashing', () => {
    mount(
      <Provider store={store}>
        <ManageRecipePage {...props} match={{ params: {} }} />
      </Provider>);
  });
});
