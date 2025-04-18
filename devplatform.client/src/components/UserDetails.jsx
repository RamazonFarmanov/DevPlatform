import * as React from 'react';
import withRoute from '../withRoute';

class UserCreateForm extends React.Component {
    constructor(props) {
        super(props);
        const { location } = this.props;
        const user = location?.state?.element;
        this.state = {
            user: user,
            name: user?.name || null,
            email: user?.email || null,
            password: "",
            messages: {},
            editableField: null
        }
        this.submitData = this.submitData.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        this.nameInputRef = React.createRef();
        this.emailInputRef = React.createRef();
    }
    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside, true);
    }
    componentDidUpdate(prevProps){
        const prevId = prevProps.params?.id;
        const currentId = this.props.params?.id;
        if (prevId !== currentId) {
            const newUser = this.props.location?.state?.element;
            if (newUser) {
                this.setState({ user: newUser, name: newUser.name, email: newUser.email, messages: {}, password: "", editableField: null });
            }
        }
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside, true);
    }
    clickHandler(handler, e) {
        e.preventDefault();
        handler();
    }
    handleClickOutside = (event) => {
        if (
          !this.nameInputRef.current.contains(event.target) &&
          !this.emailInputRef.current.contains(event.target)
        ) {
          this.setState({ editableField: null });
        }
      };
    async submitPassword() {
        this.setState({ messages: {} });
        const result = await fetch('/api/usersroles/changepass', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userId: this.state.user.userId, userName: this.state.name, email: this.state.email, password: this.state.password})
        });
        var data = await result.json();
        console.log(data);
        this.setState({ messages: data });
    }
    async submitData() {
        this.setState({ messages: {} });
        const result = await fetch('/api/usersroles/edituser', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userId: this.state.user.userId, userName: this.state.name, email: this.state.email})
        });
        var data = await result.json();    
        this.setState({ messages: data });
    }
    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
    }
    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }
    onEmailChanged() {
        this.setState({ email: e.target.value });
    }
    makeEditable(fieldName) {
        this.setState({ editableField: fieldName }, () => {
            if (fieldName === "name" && this.nameInputRef.current) {
                this.nameInputRef.current.focus();
            }
            if (fieldName === "email" && this.emailInputRef.current) {
                this.emailInputRef.current.focus();
            }
          });
    }
    render() {
        return (
            <div style={{ background: "#ffffff", width: "600px", padding: "20px", height: "100vh", borderLeft: "1px solid #dee2e6" }}>
                <h2>Password</h2>
                <form onSubmit={(e) => this.clickHandler(this.submitPassword, e)}>
                    {this.state.messages.messagePassword && (<div className="text-success">{this.state.messages.messagePassword}</div>)}
                    {this.state.messages.errorPassword && (<div className="text-danger">{this.state.messages.errorPassword}</div>)}
                    <div class="mt-3">
                        <input type="text" class="form-control" value={this.state.password} onChange={this.onPasswordChanged} />
                        {this.state.messages.errorsPassword?.map(element => (
                            <div className="text-danger">{element.description}</div>
                        ))}
                    </div>
                    <div class="mt-3">
                        <input type="submit" value="Change password" class="btn btn-primary" />
                    </div>
                </form>
                <h2 className="mt-5">Data</h2>
                <form onSubmit={(e) => this.clickHandler(this.submitData, e)}>
                    {this.state.messages.errorData && (<div className="text-danger">{this.state.messages.errorData}</div>)}
                    {this.state.messages.messageData && (<div className="text-success">{this.state.messages.messageData}</div>)}
                    <div class="mt-3">
                        <label class="control-label">Name</label>
                        <table style={{width: "600px"}}>
                            <tr>
                                <td style={{ width: "80%" }}><input type="text" class="form-control" ref={this.nameInputRef} value={this.state.name} onChange={this.onNameChanged} disabled={this.state.editableField !== "name"} /></td>
                                <td style={{ width: "20%" }}><a href="#" className="ms-2" onClick={(e) => this.clickHandler(this.makeEditable("name"), e)}>Edit</a></td>
                            </tr>
                        </table>
                        {this.state.messages.errors && (<div className="text-danger">{this.state.messages.errors.Name.join(" ")}</div>)}
                    </div>
                    <div class="mt-3">
                        <label class="control-label">Email</label>
                        <table style={{width: "600px"}}>
                            <tr>
                                <td style={{ width: "80%" }}><input type="text" class="form-control" ref={this.emailInputRef} value={this.state.email} onChange={this.onEmailChanged} disabled={this.state.editableField !== "email"} /></td>
                                <td style={{ width: "20%" }}><a href="#" className="ms-2" onClick={(e) => this.clickHandler(this.makeEditable("email"), e)}>Edit</a></td>
                            </tr>
                        </table>
                        {this.state.messages.errors && (<div className="text-danger">{this.state.messages.errors.Email.join(" ")}</div>)}
                    </div>
                    <div class="mt-3">
                        <input type="submit" value="Save changes" class="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default withRoute(UserCreateForm);