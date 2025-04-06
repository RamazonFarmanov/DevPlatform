import * as React from 'react';
import withRoute from '../withRoute';
import { Link } from 'react-router-dom';

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember: false,
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onRememberChanged = this.onRememberChanged.bind(this);
    }
    clickHandler(handler, e){
        e.preventDefault();
        handler();
    }
    async handleSubmit() {
        this.setState({ errors: {} });
        const response = await fetch('/api/authentication/signin', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email: this.state.email, password: this.state.password, rememberMe: this.state.remember })
        });
        if (response.ok) {
            this.props.navigate("/");
        }
        else if (response.status === 400 || response.status === 401) {
            const errorData = await response.json();
            console.log("Errors:", errorData);
            this.setState({ errors: errorData.errors });
        }
    }
    onEmailChanged(e) {
        this.setState({ email: e.target.value });
    }
    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
    }
    onRememberChanged(e) {
        this.setState({ remember: e.target.checked });
    }
    render() {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header text-center">
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e) => this.clickHandler(this.handleSubmit, e)}>
                                    {this.state.errors.message && (<div className="text-danger">{this.state.errors.message}</div>)}
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" value={this.state.email} onChange={this.onEmailChanged} className="form-control" placeholder="Enter your email" />
                                        {this.state.errors.Email && (<div className="text-danger">{this.state.errors.Email.join(" ")}</div>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" value={this.state.password} onChange={this.onPasswordChanged} className="form-control" placeholder="Enter your password" />
                                        {this.state.errors.Password && (<div className="text-danger">{this.state.errors.Password.join(" ")}</div>)}
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="checkbox" checked={this.state.remember} onChange={this.onRememberChanged} className="form-check-input" />
                                        <label className="form-check-label">Remember me</label>
                                    </div>
                                    <div>
                                        <input type="submit" className="btn btn-primary w-100" value="Sign in" />
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center">
                                <p className="mb-0 me-1">Don't have an account? <Link to="/signUp">Sign Up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRoute(SignInForm);