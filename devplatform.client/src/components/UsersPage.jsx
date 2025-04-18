import * as React from 'react'
import { Link, Outlet } from 'react-router-dom';
import withRoute from '../withRoute';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            messages: {}
        }
        this.getUsers = this.getUsers.bind(this);
        this.deleteUsers = this.deleteUsers.bind(this);
        this.onAllCheckChanged = this.onAllCheckChanged.bind(this);
        this.onChekChanged = this.onCheckChanged.bind(this);
    }
    componentDidMount() {
        this.getUsers();
    }
    async getUsers() {
        const result = await fetch('/api/usersroles/getusers', { method: "GET" });
        if (result.ok) {
            var data = await result.json();
            this.setState({ users: data });
        }
    }
    async deleteUsers() {
        this.setState({ messages: {} });
        const result = await fetch('/api/usersroles/deleteusers', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state.users)
        });
        if (result.ok) {
            this.getUsers();
        }
        else {
            const data = await result.json();
            this.setState({ messages: data });
        }
    }
    onAllCheckChanged(e) {
        this.setState(prevState => ({
            users: prevState.users.map(user => ({ ...user, isChecked: e.target.checked }))
        }));
    }
    onCheckChanged(e, id) {
        this.setState(prevState => ({
            users: prevState.users.map(user => user.userId === id ? { ...user, isChecked: e.target.checked } : user)
        }));
    }
    clickHandler(handler, e) {
        e.preventDefault();
        handler();
    }
    userRolesString(roles) {
        var userRoles = "";
        roles.forEach(element => {
            userRoles = userRoles + element + "  ";
        });
        if (userRoles === "") {
            userRoles = "edit roles";
        }
        return userRoles;
    }
    render() {
        return (
            <div style={{position: "relative"}}>
                <div style={{ position: "absolute", width: "1000px", margin: "20px" }}>
                    <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
                        <Link to="/admin/users/" className="btn btn-primary">Create new user</Link>
                        <a href="#" className="btn btn-danger" onClick={(e) => this.clickHandler(this.deleteUsers, e)}>Delete</a>
                    </div>
                    {this.state.messages.error && (<div className="text-danger">{this.state.messages.error}</div>)}
                    <table className="table w-100 table-bordered">
                        <thead>
                            <tr>
                                <td><strong>User name</strong></td>
                                <td><strong>Email</strong></td>
                                <td><strong>Roles</strong></td>
                                <td><strong>Edition</strong></td>
                                <td>
                                    <div className="form-check d-flex align-items-center gap-2">
                                        <input className="form-check-input" type="checkbox" checked={this.state.users.every(user => user.isChecked)} onChange={this.onAllCheckChanged} />
                                        
                                    </div>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(element => (
                                    <tr key={element.userId}>
                                        <td>{element.name}</td>
                                        <td className="">{element.email}</td>
                                        <td className=""><Link to={element.userId + "/roles"} state={{ element }}>{this.userRolesString(element.userRoles)}</Link></td>
                                        <td className=""><Link to={element.userId + "/details"} state={{ element }}>Edit</Link></td>
                                        <td className=""><input type="checkbox" className="form-check-input" checked={element.isChecked} onChange={(e) => { this.onCheckChanged(e, element.userId) }} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div style={{position: "absolute", left: "1040px"}}>
                    <Outlet context={{ getUsers: this.getUsers }}/>
                </div>
            </div>
        );
    }
}

export default withRoute(UsersPage);