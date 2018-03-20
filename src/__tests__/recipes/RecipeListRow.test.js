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
import RecipeListRow from '../../recipes/RecipeListRow';

describe('<RecipeListRow />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    onDelete: jest.fn(),
    recipe: {
      'category_id': 24,
      'category_name': 'My chicken',
      'description': 'sdfdfsdffsd',
      'id': 45,
      ingredients: [
        'sdfsdf ',
        '  sdfsd',
        ' sddfd',
      ],
      recipe_date: 'Mon, 19 Mar 2018 09:39:44 GMT',
      'recipe_name': 'ajhbdsvkjnds',
    },
  };
  it('should render itself without crashing', () => {
    const match = { params: {} };
    mount(
          <Provider store={store}>
              <MemoryRouter>
                  <RecipeListRow {...props} match />
                </MemoryRouter>
            </Provider>);
  });
});
