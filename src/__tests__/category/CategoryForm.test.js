import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import CategoryForm from '../../components/category/CategoryForm';


Enzyme.configure({ adapter: new Adapter() });
describe('<CategoryForm />', () => {
  const store = configureMockStore([thunk])({

  });

  const props = {
    onSave: jest.fn(),
    onChange: jest.fn(),
    loading: false,
    errors: {},
    category: {
      category_description: 'this is chicken',
      category_name: 'My chicken',
      id: 24,
    },
  };

  const preventDefault = jest.fn();
  const component = mount(<Provider store={store}><CategoryForm {...props} match /></Provider>);

  it('should render itself without crashing', () => {
    mount(<Provider store={store}><CategoryForm {...props} match={{ params: {} }} /></Provider>);
  });
  it('should render form', () => {
    expect(component.find('form').length).toBe(1);
    expect(component.find('form').simulate('submit', { preventDefault }));
  });
});
