import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';

// import Testutils from 'react-addons-test-utils';
import RecipeList from '../../recipes/RecipeList';

describe('<RecipeList />', () => {
  const store = configureMockStore([thunk])({});

  const props = {
    onDelete: jest.fn(),
    recipes: [
      {
        category_id: 24,
        category_name: 'My chicken',
        description: 'sdfdfsdffsd',
        id: 45,
        ingredients: ['sdfsdf ', '  sdfsd', ' sddfd'],
        recipe_date: 'Mon, 19 Mar 2018 09:39:44 GMT',
        recipe_name: 'ajhbdsvkjnds',
      },
    ],
  };
  it('should render itself without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <RecipeList {...props} />
        </MemoryRouter>
      </Provider>,
    );
  });
});
