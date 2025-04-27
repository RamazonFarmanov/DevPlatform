import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Avatar from './Avatar';
import withRoute from '../withRoute';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        const { context } = this.props;
        const user = context?.user;
        this.state = {
            user: user,
            name: user?.name || null,
            surname: user?.surname || null,
            editableField: null,
            selestedFile: null,
            imageUrl: null,
            isLargeScreen: document.documentElement.clientWidth >= 768
        }
        console.log(props.context?.user);
        this.handleResize = this.handleResize.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.cleanUpUrl = this.cleanUpUrl.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.makeEditable = this.makeEditable.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onSurnameChanged = this.onSurnameChanged.bind(this);
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        document.addEventListener("click", this.handleClickOutside, true);
    }
    componentDidUpdate() {
        const user = this.props.context?.user;
        if(this.state.user !== user){
            console.log(this.state.user);
            console.log(user);
            this.setState({user: user, name: user?.name || null, surname: user?.surname || null});
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        document.removeEventListener("click", this.handleClickOutside, true);
        this.cleanUpUrl();
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
        const result = await fetch("/api/avatar/upload", {
            method: "POST",
            body: formData,
        });
        const data = await result.text();
        if (result.ok) {
            this.setState({ selectedFile: null })
        }
        console.log(data);
    }
    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }
    onSurnameChanged(e) {
        this.setState({ surname: e.target.value });
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
    handleResize() {
        this.setState({ isLargeScreen: document.documentElement.clientWidth >= 768 });
    }
    render() {
        const avatar = (
            <div>
                <div style={{ width: "170px", height: "200px" }}>
                    <Avatar user={this.props.context?.user} photoUrl={this.state.imageUrl} />
                </div>
                <input className="mt-1" type="file" accept="image/*" onChange={this.handleFileChange} />
            </div>
        );
        const basic = (
            <table style={{ borderCollapse: "separate", borderSpacing: "0 40px" }}>
                <tr>
                    <td><label className="control-label fs-4 me-3">Name:</label></td>
                    <td><input type="text" className="form-control" style={this.state.isLargeScreen ? ({width: "700px"}) : ({width: "250px"})} value={this.state.name} onChange={this.onNameChanged} disabled={this.state.editableField !== "name"} /></td>
                    <td><a href="#" className="ms-5" onClick={(e) => this.clickHandler(this.makeEditable("name"), e)}>Edit</a></td>
                </tr>
                <tr>
                    <td><label className="control-label fs-4 me-3">Surneme:</label></td>
                    <td><input type="text" className="form-control" style={this.state.isLargeScreen ? ({width: "700px"}) : ({width: "250px"})} value={this.state.surname} onChange={this.onSurnameChanged} disabled={this.state.editableField !== "surname"} /></td>
                    <td><a href="#" className="ms-5" onClick={(e) => this.clickHandler(this.makeEditable("name"), e)}>Edit</a></td>
                </tr>
                <tr>
                    <td><label className="control-label fs-4 me-3">Roles:</label></td>
                    <td>
                        <div className="container-fluid d-flex">
                            {this.props.context?.user?.userRoles?.map(element => (<div style={{ background: "#e6e6e6", border: "solid black 1px", borderRadius: "5px", height: "100%", padding: "5px", marginRight: "5px" }}>{element}</div>))}
                        </div>
                    </td>
                </tr>
            </table>
        );
        const control = (
            <div className="container-fluid d-flex justify-content-between" style={{ paddingTop: "20px"}}>
                <a className="btn btn-primary" href="#">Save changes</a>
                <a className="btn btn-secondary" hraf="#" onClick={this.props.context?.signOut}>Log out</a>
            </div>
        );
        if (this.state.isLargeScreen) {
            return (
                <div className="container">
                    <div style={{ paddingTop: "20px"}} className="container-fluid d-flex">
                        {avatar}
                        {basic}
                    </div>
                    <hr/>
                    {control}
                </div>
            );
        }
        else {
            return(
                <div style={{padding: "20px"}}>
                    {avatar}
                    <hr />
                    {basic}
                    <hr />
                    {control}
                </div>
            );
        }
    }
}

export default withRoute(ProfilePage);