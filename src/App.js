import React, { Component } from 'react';
import SignUpForm from './TeamSignUp';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Sign Up</h1>
                <SignUpForm />
            </div>
        );
    }
}

export default App;
