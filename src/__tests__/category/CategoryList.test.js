import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import CategoryList from '../../components/category/CategoryList';


Enzyme.configure({ adapter: new Adapter() });
describe('<CategoryList />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    onDelete: jest.fn(),
    categories: [{
      category_description: 'this is chicken',
      category_name: 'My chicken',
      id: 24,
    }],
  };
  it('should render itself without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <CategoryList {...props} />
        </MemoryRouter>
      </Provider>);
  });
});
