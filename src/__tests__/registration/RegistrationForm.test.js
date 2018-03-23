import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import React from 'react';

// import Testutils from 'react-addons-test-utils';
import RegistrationForm from '../../components/registration/RegistrationForm';

Enzyme.configure({ adapter: new Adapter() });

describe('<CategoryForm />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    onSave: jest.fn(),
    onChange: jest.fn(),
    loading: false,
    errors: {},
    register: {},
  };
  it('should render itself without crashing', () => {
    const match = { params: {} };
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegistrationForm {...props} match />
        </MemoryRouter>
      </Provider>,
    );
  });
});
