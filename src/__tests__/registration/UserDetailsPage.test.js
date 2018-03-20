import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';

// import Testutils from 'react-addons-test-utils';
import UserDetailsPage from '../../registration/UserDetailsPage';

Enzyme.configure({ adapter: new Adapter() });

describe('<UserDetailsPage />', () => {
  const store = configureMockStore([thunk])({
    register: [],
    login: [],
    categories: [],
    recipes: [],
    pagination: [],
    ajaxCallsInProgress: 0,
  });

  const props = {
    register: {},
  };
  it('should render itself without crashing', () => {
    shallow(
      <Provider store={store}>
        <UserDetailsPage {...props} />
      </Provider>,
    );
  });
});
