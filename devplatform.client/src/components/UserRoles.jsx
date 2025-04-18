import * as React from 'react';
import withRoute from '../withRoute';

class UserRoles extends React.Component {
    constructor(props) {
        super(props);
        const { location } = this.props;
        const user = location?.state?.element;
        this.state = {
            allRoles: user?.allRoles || null,
            userRoles: user?.userRoles || null,
            messages: {}
        }
        this.editRoles = this.editRoles.bind(this);
    }
    componentDidUpdate(prevProps) {
        const prevId = prevProps.params?.id;
        const currentId = this.props.params?.id;
        if (prevId !== currentId) {
            const newUser = this.props.location?.state?.element;
            if (newUser) {
                this.setState({ allRoles: newUser.allRoles, userRoles: newUser.userRoles, messages: {} });
            }
        }
    }
    clickHandler(handler, e){
        e.preventDefault();
        handler();
    }
    async editRoles() {
        const result = await fetch('/api/usersroles/editroles', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Id: this.props.params?.id, userRoles: this.state.userRoles })
        });
        const data = await result.json();
        if(result.ok){
            this.props.context?.getUsers();
        }
        this.setState({ messages: data });
    }
    onCheckChanged(e, name) {
        var newRoles = [...this.state.userRoles];
        if (e.target.checked) {
            newRoles.push(name);
            this.setState({ userRoles: newRoles });
        }
        else {
            const index = newRoles.find(n => n === name);
            newRoles.splice(index, 1);
            this.setState({ userRoles: newRoles });
        }
    }
    checkRole(name) {
        var isInList = false;
        for (const role of this.state.userRoles) {
            if (role === name) {
                isInList = true;
                break;
            }
        }
        return isInList;
    }
    render() {
        return (
            <div style={{ background: "#ffffff", width: "400px", padding: "20px", height: "100vh", borderLeft: "1px solid #dee2e6" }}>
                <h2>{this.props.location?.state?.element?.email} roles</h2>
                {this.state.messages.message && (<div className="text-success">{this.state.messages.message}</div>)}
                {this.state.messages.error && (<div className="text-danger">{this.state.messages.error}</div>)}
                <div>
                    <table className="table table-bordered">
                        <tbody>
                            {
                                this.state.allRoles.map(element => (
                                    <tr>
                                        <td className="">
                                            <label className="form-check-label">{element.name}</label>
                                        </td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" checked={this.checkRole(element.name)} onChange={(e) => this.onCheckChanged(e, element.name)} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div class="mt-3">
                    <a href="#" className="btn btn-primary" onClick={(e) => this.clickHandler(this.editRoles, e)}>Save</a>
                </div>
            </div>
        );
    }
}

export default withRoute(UserRoles);