import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUpForm from './TeamSignUp';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<EmailInput />', () => {
 let wrapper;

 beforeEach(() => {
   wrapper = shallow(<EmailInput />);
 });

 it('should be a required field', () => {
   const input = wrapper.find('input');
   input.simulate('change', {target:{value:''}});
   expect(wrapper.find('p .help-block')).hasClass('error-missing');

