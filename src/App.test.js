import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {BirthdayInput, RequiredInput, PasswordConfirmationInput} from './TeamSignUp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<BirthdayInput />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BirthdayInput />);
  });

  it('should be a required field', () => {
    const input = wrapper.find('input');
    input.simulate('change', {target:{value:''}});
    expect(wrapper.find('p .help-block')).hasClass('error-missing');
  });

  // it('should have a valid ISO date format', () => {

  // });

  // it('should be at least 13 years of age', () => {

  // });

});

// describe('<PasswordConfirmationInput />', () => {
  // let wrapper;

  // beforeEach(() => {
  //   wrapper = shallow(<PasswordConfirmationInput />);
  // })
//   it('should be a required field', () => {

//   });

//   it('should match password', () => {

//   });
// });


