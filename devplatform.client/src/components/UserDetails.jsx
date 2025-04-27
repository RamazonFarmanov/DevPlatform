import * as React from 'react';
import withRoute from '../withRoute';
import Avatar from './Avatar';

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
            editableField: null,
            selectedFile: null,
            imageUrl: null
        }
        this.submitData = this.submitData.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.cleanUpUrl = this.cleanUpUrl.bind(this);
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
        console.log(this.state.user);
    }
    componentDidUpdate(prevProps) {
        const prevId = prevProps.params?.id;
        const currentId = this.props.params?.id;
        if (prevId !== currentId) {
            const newUser = this.props.location?.state?.element;
            if (newUser) {
                this.setState({ user: newUser, name: newUser.name, email: newUser.email, messages: {}, password: "", editableField: null, selectedFile: null });
            }
        }
        console.log("Here it is");
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside, true);
        this.cleanUpUrl(this.state.imageUrl);
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
            body: JSON.stringify({ userId: this.state.user.userId, userName: this.state.name, email: this.state.email, password: this.state.password })
        });
        var data = await result.json();
        console.log(data);
        this.setState({ messages: data });
    }
    async submitData() {
        if (this.state.selectedFile) {
            await this.uploadAvatar();
        }
        this.setState({ messages: {} });
        const result = await fetch('/api/usersroles/edituser', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: this.state.user.userId, userName: this.state.name, email: this.state.email })
        });
        var data = await result.json();
        this.setState({ messages: data });
    }
    async handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            if (this.state.imageUrl) {
                URL.revokeObjectURL(this.state.imageUrl);
            }
            // Создаём новую
            const Url = URL.createObjectURL(file);
            this.setState({ selectedFile: file, imageUrl: Url });
        }
    }
    cleanUpUrl() {
        // После того как компонент будет размонтирован или URL не будет нужен
        this.setState(prevState => {
            if (prevState.imageUrl) {
                URL.revokeObjectURL(prevState.imageUrl);
            }
        });
    }
    async uploadAvatar() {
        const formData = new FormData();
        formData.append("file", this.state.selectedFile);
        formData.append("userId", this.state.user.userId);
        const result = await fetch("/api/avatar/uploadbyid", {
            method: "POST",
            body: formData,
        });
        const data = await result.text();
        if (result.ok) {
            this.setState({ selectedFile: null })
        }
        console.log(data);
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
            <div style={{ background: "#ffffff", width: "500px", padding: "20px", height: "100vh" }}>
                <h2>Password</h2>
                <form onSubmit={(e) => this.clickHandler(this.submitPassword, e)}>
                    {this.state.messages.messagePassword && (<div className="text-success">{this.state.messages.messagePassword}</div>)}
                    {this.state.messages.errorPassword && (<div className="text-danger">{this.state.messages.errorPassword}</div>)}
                    <div class="mt-3">
                        <input type="text" className="form-control" value={this.state.password} onChange={this.onPasswordChanged} />
                        {this.state.messages.errorsPassword?.map(element => (
                            <div className="text-danger">{element.description}</div>
                        ))}
                    </div>
                    <div class="mt-3">
                        <input type="submit" value="Change password" className="btn btn-primary" />
                    </div>
                </form>
                <h2 className="mt-5">Data</h2>
                <div>
                    {this.state.messages.messageAvatar && (<div className="text-danger">{this.state.messages.messageAvatar}</div>)}
                    <div style={{ width: "170px", height: "200px" }}>
                        <Avatar user={this.state.user} photoUrl={this.state.imageUrl} />
                    </div>
                    <input className="mt-1" type="file" accept="image/*" onChange={this.handleFileChange} />
                </div>
                <form onSubmit={(e) => this.clickHandler(this.submitData, e)}>
                    {this.state.messages.errorData && (<div className="text-danger">{this.state.messages.errorData}</div>)}
                    {this.state.messages.messageData && (<div className="text-success">{this.state.messages.messageData}</div>)}
                    <div class="mt-3">
                        <label class="control-label">Name</label>
                        <table style={{ width: "500px" }}>
                            <tr>
                                <td style={{ width: "80%" }}><input type="text" class="form-control" ref={this.nameInputRef} value={this.state.name} onChange={this.onNameChanged} disabled={this.state.editableField !== "name"} /></td>
                                <td style={{ width: "20%" }}><a href="#" className="ms-2" onClick={(e) => this.clickHandler(this.makeEditable("name"), e)}>Edit</a></td>
                            </tr>
                        </table>
                        {this.state.messages.errors?.Name && (<div className="text-danger">{this.state.messages.errors.Name.join(" ")}</div>)}
                    </div>
                    <div class="mt-3">
                        <label class="control-label">Email</label>
                        <table style={{ width: "500px" }}>
                            <tr>
                                <td style={{ width: "80%" }}><input type="text" class="form-control" ref={this.emailInputRef} value={this.state.email} onChange={this.onEmailChanged} disabled={this.state.editableField !== "email"} /></td>
                                <td style={{ width: "20%" }}><a href="#" className="ms-2" onClick={(e) => this.clickHandler(this.makeEditable("email"), e)}>Edit</a></td>
                            </tr>
                        </table>
                        {this.state.messages.errors?.Email && (<div className="text-danger">{this.state.messages.errors.Email.join(" ")}</div>)}
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