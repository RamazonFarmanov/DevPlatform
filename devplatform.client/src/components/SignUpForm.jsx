import * as React from 'react';
import withRoute from '../withRoute';
import { Link } from 'react-router-dom';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            passConfirm: "",
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onPassConfirmChanged = this.onPassConfirmChanged.bind(this);
    }
    clickHandler(handler, e){
        e.preventDefault();
        handler();
    }
    async handleSubmit(){
        this.setState({ errors: {} });
        const response = await fetch('/api/authentication/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email: this.state.email, name: this.state.name, password: this.state.password, passwordConfirm: this.state.passConfirm})
        });
        if(response.ok){
            this.props.navigate("/");
        }
        if(response.status === 400){
            const errorData = response.json();
            console.log("Errors: ", errorData);
            this.setState({ errors: errorData.errors });
        }
    }
    onNameChanged(e){
        this.setState({ name: e.target.value });
    }
    onEmailChanged(e){
        this.setState({ name: e.target.value });
    }
    onPasswordChanged(e){
        this.setState({ name: e.target.value });
    }
    onPassConfirmChanged(e){
        this.setState({ name: e.target.value });
    }
    render() {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow-sm" style={{width: "100%", maxWidth: "500px"}}>
                    <div className="card-body">
                        <h1 className="text-center mb-4">Registration</h1>
                        <form method="post" onSubmit={(e) => this.clickHandler(this.handleSubmit, e)}>
                            {this.state.errors.message && (<div className="text-danger">{this.state.errors.message}</div>)}
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input value={this.state.name} onChange={this.onNameChanged} className="form-control" placeholder="Enter username" required />
                                {this.state.errors.Name && (<div className="text-danger">{this.state.errors.Email.join(" ")}</div>)}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input value={this.state.name} onChange={this.onNameChanged} className="form-control" placeholder="Enter email" required />
                                {this.state.errors.Email && (<div className="text-danger">{this.state.errors.Name.join(" ")}</div>)}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input value={this.state.password} onChange={this.onPasswordChanged} className="form-control" placeholder="Enter password" required />
                                {this.state.errors.Password && (<div className="text-danger">{this.state.errors.Password.join(" ")}</div>)}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input value={this.state.passConfirm} onChange={this.onPassConfirmChanged} className="form-control" placeholder="Confirm password" required />
                                {this.state.errors.PasswordConfirm && (<div className="text-danger">{this.state.errors.PasswordConfirm.join(" ")}</div>)}
                            </div>
                            <div>
                                <input type="submit" className="btn btn-primary w-100" value="Sign Up" />
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <p className="mb-0">Already have an account? <Link to="/signIn">Sign in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpForm;