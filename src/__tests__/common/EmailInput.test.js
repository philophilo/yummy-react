import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import EmailInput from '../../common/EmailInput';

Enzyme.configure({ adapter: new Adapter() });

describe('<EmailInput />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    name: '',
    label: '',
    onChange: jest.fn(),
    placeholder: '',
    value: '',
    error: '',
  };
  it('should render itself without crashing', () => {
    shallow(<Provider store={store}><EmailInput {...props} /></Provider>);
  });
});
