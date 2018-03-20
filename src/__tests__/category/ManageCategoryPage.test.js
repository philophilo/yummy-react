import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import ManageCategoryPage from '../../category/ManageCategoryPage';


Enzyme.configure({ adapter: new Adapter() });
describe('<ManageCategoryPage />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    categories: [{
      category_description: 'this is chicken',
      category_name: 'My chicken',
      id: 24,
    }],
  };
  it('should render itself without crashing', () => {
    mount(
      <Provider store={store}>
        <ManageCategoryPage {...props} match={{ params: {} }} />
      </Provider>);
  });
});
