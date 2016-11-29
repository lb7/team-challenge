import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, mount} from 'enzyme';
import {SignUpForm, BirthdayInput, RequiredInput, PasswordConfirmationInput, EmailInput} from './TeamSignUp';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

describe('<BirthdayInput />', () => {
    let wrapper;
    wrapper = shallow(<BirthdayInput />);

  it('should be a required field', () => {
    wrapper.setProps({value: ''});
    expect(wrapper.find('p .help-block').hasClass('error-missing')).toBeTruthy();

  });

  // valid format: 'YYYY-MM-DD'
  it('should have a valid ISO date format', () => {

      wrapper.setProps({value: 'december 9, 2005'});
      expect(wrapper.find('p .help-block').hasClass('error-invalid')).toBeTruthy(); 

      wrapper.setProps({value: '03-03-2000'});
      expect(wrapper.find('p .help-block').hasClass('error-invalid')).toBeTruthy();

      // positive test for valid date format
      wrapper.setProps({value: '1999-03-03'});
      expect(wrapper.find('p .help-block .error-invalid').length).toEqual(0);
       
  });

  it('should be at least 13 years of age', () => {
      // not 13 years old
      wrapper.setProps({value: '2008-08-16'});
      expect(wrapper.find('p .help-block').hasClass('error-not-old')).toBeTruthy();

      //at least 13 years old
      wrapper.setProps({value: '1999-03-03'});
      expect(wrapper.find('p .help-block .error-not-old').length).toEqual(0);
  });

});

describe('<RequiredInput />', () => {
    let wrapper;
    wrapper = shallow(<RequiredInput />);

    it('should not be empty', () => {
        // empty field
        wrapper.setProps({value: ''});
        expect(wrapper.find('p .help-block').hasClass('error-missing')).toBeTruthy();

        //when there is an input
        wrapper.setProps({value: 'hello'});
        expect(wrapper.find('p .help-block .error-missing').length).toEqual(0);
    });
});

describe('<EmailInput />', () => {
    let wrapper;
    wrapper = shallow(<EmailInput />);

    it('should not be empty', () => {
        // when field is empty, field is required
        wrapper.setProps({value: ''});
        expect(wrapper.find('p .help-block').hasClass('error-missing')).toBeTruthy();

        //when there is an email input
        wrapper.setProps({value: '2acom'});
        expect(wrapper.find('p .help-block .error-invalid')).toBeTruthy();
    });
});

describe('<PasswordConfirmationInput />', () => {
    let wrapper;
    wrapper = shallow(<PasswordConfirmationInput />);

    it('should be a required field', () => {
        // empty field
        wrapper.setProps({value: ''});
        expect(wrapper.find('p .help-block').hasClass('error-missing')).toBeTruthy();
    });

    it('should match the password', () => {

        //passwords do not match
        wrapper.setProps({value:'hello', password:'goodbye'});
        expect(wrapper.find('p .help-block').hasClass('error-mismatched')).toBeTruthy();

        //passwords matched
        wrapper.setProps({value:'hello', password:'hello'});
        expect(wrapper.find('p .help-block .error-mismatched').length).toEqual(0);
    });
});

describe('Reset Button', () => {
    it('should clear the form when the button is clicked', () => {
        const wrapper = mount(<SignUpForm />);

        //console.log(wrapper.debug());
        const blankState = {
            email: { value: '', valid: false },
            name: { value: '', valid: false },
            dob: { value: '', valid: false },
            password: { value: '', valid: false },
            passwordConf: { value: '', valid: false }
        };

        const filledInState = {
            email: { value: 'text' },
            name: { value: 'text' },
            dob: { value: 'text' },
            password: { value: 'text' },
            passwordConf: { value: 'text' }
        };

        wrapper.setState(filledInState);

        //ensure the form is filled in
        expect(wrapper.state()).toEqual(filledInState);

        wrapper.find('#resetButton').simulate('click');

        //make sure state is blank after click.
        expect(wrapper.state()).toEqual(blankState);

        //Make sure the actual input on the page is blank.
        wrapper.find('input').forEach((node) => {
            expect(node.props().value).toBe('');
        });
    });
});


