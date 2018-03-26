import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import React from 'react';
 
// import Testutils from 'react-addons-test-utils';
import UserDetails from '../../components/registration/UserDetails';

Enzyme.configure({ adapter: new Adapter() });

describe('<UserDetails />', () => {
    const store = configureMockStore([thunk])({
      
    });
  
    const props = {
        register: []
    };
    it('should render itself without crashing', () => {
        const match = { params: {} }
        mount(
            <Provider store={store}>
                    <UserDetails {...props} match />
            </Provider>
            );
    });

  });