import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import ManageLoginPage from '../../components/login/ManageLoginPage';

Enzyme.configure({ adapter: new Adapter() });

describe('<ManageLoginPage />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    login: {},
  };
  it('should render itself without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <ManageLoginPage {...props} match={{ params: {} }} />
        </MemoryRouter>
      </Provider>,
    );
  });
});
