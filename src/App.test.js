import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, mount} from 'enzyme';
import {SignUpForm} from './TeamSignUp';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

describe('Reset Button', () => {
    it('should clear the form when the button is clicked', () => {
        const wrapper = mount(<SignUpForm/>);

        console.log(wrapper.debug());
        const blankState = {
            email:{value:'',valid:false},
            name:{value:'',valid:false},
            dob:{value:'',valid:false},
            password:{value:'',valid:false},
            passwordConf:{value:'',valid:false}
        };

        const filledInState = {
            email:{value:'text'},
            name:{value:'text'},
            dob:{value:'text'},
            password:{value:'text'},
            passwordConf:{value:'text'}
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

