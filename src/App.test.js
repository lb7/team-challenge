import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { SignUpForm } from './TeamSignUp';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});


describe('Reset Button', () => {
    it('should clear the form when the button is clicked', () => {
        const wrapper = mount(<SignUpForm />);

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


describe('Submit Button', () => {

    // test to see if submit button is diabled when form is not filled in properly
    it('should be diabled when form is not filled in properly', () => {
        const wrapper = mount(<SignUpForm />);

        const invalidState = {
            email: { valid: false },
            name: { valid: false },
            dob: { valid: false },
            password: { valid: false },
            passwordConf: { valid: false }
        };

        wrapper.setState(invalidState);
        expect(wrapper.state()).toEqual(invalidState);
        expect(wrapper.find('#submitButton').props().disabled).toEqual(true);
    });

    // test to see if submit button is enabled when form is filled in properly
    it('should be enabled when form is not filled in properly', () => {
        const wrapper = mount(<SignUpForm />);

        const validState = {
            email: { valid: true },
            name: { valid: true },
            dob: { valid: true },
            password: { valid: true },
            passwordConf: { valid: true }
        };
        wrapper.setState(validState);

        expect(wrapper.state()).toEqual(validState);
        expect(wrapper.find('#submitButton').props().disabled).toEqual(false);
    });

    // test to see if confirmation message is displayed when form is submitted
    it('should display a alert when the form is submitted', () => {
        const wrapper = mount(<App />);
        
        const validState = {formSubmitted: true}
        wrapper.setState(validState);

        expect(wrapper.state()).toEqual(validState);  
        expect(wrapper.find('.alert').text()).toEqual("Form Submitted");
    });
});