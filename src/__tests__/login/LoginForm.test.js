import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import LoginForm from '../../components/login/LoginForm';

Enzyme.configure({ adapter: new Adapter() });

describe('<LoginForm />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    onSave: jest.fn(),
    onChange: jest.fn(),
    loading: false,
    errors: {},
    login: {},
  };
  it('should render itself without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm {...props} match={{ params: {} }} />
        </MemoryRouter>
      </Provider>,
    );
  });
});
