import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import React from 'react';

// import Testutils from 'react-addons-test-utils';
import ManageRegistrationPage from '../../components/registration/ManageRegistrationPage';


Enzyme.configure({ adapter: new Adapter() });
describe('<ManageRegistrationPage />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    register: {
      category_description: 'this is chicken',
      category_name: 'My chicken',
      id: 24,
    },
  };
  it('should render itself without crashing', () => {
    const match = { params: {} };
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <ManageRegistrationPage {...props} match />
        </MemoryRouter>
      </Provider>);
  });
});
