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
import LoginForm from '../../login/LoginForm';

describe('<LoginForm />', () => {
    const store = configureMockStore([thunk])({
      
    });
  
    const props = {
        onSave: jest.fn(),
        onChange: jest.fn(),
        loading: false,
        errors: {},
        login: {}
    };
    it('should render itself without crashing', () => {
        const match = { params: {} }
        mount(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginForm {...props} match />
                </MemoryRouter>
            </Provider>
            );
    });

  });