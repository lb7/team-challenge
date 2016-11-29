import React, { Component } from 'react';
import SignUpForm from './TeamSignUp';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.submitCallback = this.submitCallback.bind(this);
    }

    submitCallback(event) {
        if (event.email.valid && event.name.valid && event.dob.valid && event.password.valid &&
            event.passwordConf.valid) {
            this.setState({ formSubmitted: true })
        }
    }

    render() {
        if (this.state.formSubmitted) {
            var message = <div className="alert alert-success" role="alert"><p>Form Submitted</p></div>
        } else {
            var message = null;
        }

        return (
            <div className="App">
                <h1>Sign Up</h1>
                {message}
                <SignUpForm submitCallback={this.submitCallback} />
            </div>
        );
    }
}

export default App;
