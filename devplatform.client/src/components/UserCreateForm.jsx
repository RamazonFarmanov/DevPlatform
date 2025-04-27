import * as React from 'react';
import withRoute from '../withRoute';

class UserCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: {},
            name: "",
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
    }
    clickHandler(handler, e) {
        e.preventDefault();
        handler();
    }
    async handleSubmit() {
        const result = await fetch('/api/authentication/createuser', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email: this.state.email, name: this.state.name, password: this.state.password, passwordConfirm: this.state.password})
        });
        var data = await result.json();
        this.setState({messages: data});
        if (result.ok) {
            this.props.context?.getUsers();
        }
    }
    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }
    onEmailChanged(e) {
        this.setState({ email: e.target.value });
    }
    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
    }
    render() {
        return (
            <div style={{ width: "500px", background: "#ffffff", height: "100vh", padding: "20px" }}>
                <h2>User creation</h2>
                {this.state.messages.message && (<div className="text-success">{this.state.messages.message}</div>)}
                {this.state.messages.error && (<div className="text-danger">{this.state.messages.error.email}</div>)}
                <form onSubmit={(e) => this.clickHandler(this.handleSubmit, e)}>
                    <div class="mt-3">
                        <label class="control-label">Name</label>
                        <input type="text" class="form-control" value={this.state.name} onChange={this.onNameChanged}/>
                        {this.state.messages.errors && (<div className="text-danger">{this.state.messages.errors.Name.join(" ")}</div>)}
                    </div>
                    <div class="mt-3">
                        <label class="control-label">Email</label>
                        <input type="email" class="form-control" value={this.state.email} onChange={this.onEmailChanged}/>
                        {this.state.messages.errors && (<div className="text-danger">{this.state.messages.errors.Email.join(" ")}</div>)}
                    </div>
                    <div class="mt-3">
                        <label class="control-label">Password</label>
                        <input type="text" class="form-control" value={this.state.password} onChange={this.onPasswordChanged}/>
                        {this.state.messages.errors && (<div className="text-danger">{this.state.messages.errors.Password.join(" ")}</div>)}
                    </div>
                    <div class="mt-3">
                        <input type="submit" value="Create user" class="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default withRoute(UserCreateForm);