import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
 
// import Testutils from 'react-addons-test-utils';
import CategoryForm from '../../category/CategoryForm';

describe('<CategoryForm />', () => {
    const store = configureMockStore([thunk])({
      
    });
  
    const props = {
        onSave: jest.fn(),
        onChange: jest.fn(),
        loading: false,
        errors: {},
        category: {
            "category_description": "this is chicken",
            "category_name": "My chicken",
            "id": 24
        }
    };

    const preventDefault = jest.fn();
    const component = mount(<Provider store={store}><CategoryForm {...props} match /></Provider>);

    it('should render itself without crashing', () => {
        const match = { params: {} }
        const { enzymeWrapper } =mount(<Provider store={store}><CategoryForm {...props} match /></Provider>);
    }),
    it('should render form', () => {
        expect(component.find('form').length).toBe(1);
        expect(component.find('form').simulate('submit', { preventDefault }));
    });

  });