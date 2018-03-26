import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import CategoryListRow from '../../components/category/CategoryListRow';


Enzyme.configure({ adapter: new Adapter() });
describe('<CategoryListRow />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    onDelete: jest.fn(),
    category: {
      category_description: 'this is chicken',
      category_name: 'My chicken',
      id: 24,
    },
  };
  it('should render itself without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <CategoryListRow {...props} match={{ params: {} }} />
        </MemoryRouter>
      </Provider>);
  });
});
