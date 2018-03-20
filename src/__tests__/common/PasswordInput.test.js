import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
 
// import Testutils from 'react-addons-test-utils';
import PasswordInput from '../../common/PasswordInput';

describe('<PasswordInput />', () => {
    const store = configureMockStore([thunk])({
      
    });
  
    const props = {
        name: '',
        label: '',
        onChange: jest.fn(),
        placeholder: '',
        value: '',
        error: ''
    };
    it('should render itself without crashing', () => {
        shallow(<Provider store={store}><PasswordInput {...props} /></Provider>);
    });

});