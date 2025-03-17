import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import SignInForm from './components/SignInForm.jsx';
import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

class RootComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signUp: false,
            signIn: false
        }
        this.toSignIn = this.toSignIn.bind(this);
        this.toSignUp = this.toSignUp.bind(this);
        this.toMain = this.toMain.bind(this);
    }
    toSignIn() {
        this.setState({ signIn: true, signUp: false });
    }
    toSignUp() {
        this.setState({ signUp: true, signIn: false });
    }
    toMain() {
        this.setState({ signUp: false, signIn: false });
    }
    render() {
        return (
            <StrictMode>
                {
                    this.state.signIn ? <SignInForm toSignUp={this.toSignUp} toMain={this.toMain} />
                        : this.state.signUp ? <SignUpForm toSignIn={this.toSignIn} toMain={this.toMain} />
                            : <App toSignIn={this.toSignIn} toSignUp={this.toSignUp} />
                }
            </StrictMode>
        );
    }
}
createRoot(document.getElementById('root')).render(
    <RootComponent />
)
