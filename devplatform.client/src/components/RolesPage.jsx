import * as React from 'react'

class RolesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            name: "",
            errors: {}
        }
        this.getRoles = this.getRoles.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onAllCheckChanged = this.onAllCheckChanged.bind(this);
        this.onChekChanged = this.onChekChanged.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
    }
    componentDidMount() {
        this.getRoles();
    }
    async getRoles() {
        const result = await fetch('/api/usersroles/getroles', { method: "GET" });
        if (result.ok) {
            var data = await result.json();
            this.setState({ roles: data });
            console.log(this.state.roles);
        }
    }
    onAllCheckChanged(e) {
        this.setState(prevState => {
            const updatedRoles = prevState.roles.map(role => ({ ...role, isChecked: e.target.checked }));
            console.log("Updated roles: ", updatedRoles);
            return { roles: updatedRoles };
        });
    }
    onChekChanged(e, id) {
        this.setState(prevState => ({
            roles: prevState.roles.map(role => role.id === id ? { ...role, isChecked: e.target.checked } : role)
        }));
    }
    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }
    clickHandler(handler, e) {
        e.preventDefault();
        handler();
    }
    async onCreate() {
        this.setState({ errors: {} });
        const result = await fetch('/api/usersroles/createrole', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: this.state.name })
        });
        if (result.ok) {
            this.getRoles();
        }
        if (result.status === 400) {
            var errorsData = await result.json();
            console.log("Errors: ", errorsData);
            this.setState({ errors: errorsData.errors });
            console.log("Errors: ", this.state.errors);
        }
    }
    async onDelete() {
        this.setState({ errors: {} });
        const result = await fetch('/api/usersroles/deleteroles', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state.roles)
        });
        if (result.ok) {
            this.getRoles();
        }
    }
    render() {
        return (
            <div style={{width: "800px"}}>
                <form method="post" onSubmit={(e) => this.clickHandler(this.onCreate, e)}>
                    <table className="w-100">
                        <tr>
                            <td className="w-50"><input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.onNameChanged} /></td>
                            <td className="w-25"><button type="submit" className="btn btn-primary w-100">Add role</button></td>
                            <td className="w-25"><button className="btn btn-danger w-100" onClick={(e) => this.clickHandler(this.onDelete, e)}>Delete</button></td>
                        </tr>
                    </table>
                </form>
                {this.state.errors.Name && (<div className="text-danger">{this.state.errors.Name.join(" ")}</div>)}
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <td className="w-75"><p><strong>Role name</strong></p></td>
                            <td className="w-25"><p><input className="form-check-input" type="checkbox" checked={this.state.roles.every(role => role.isChecked)} onChange={this.onAllCheckChanged} /> <strong>Select all</strong></p></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.roles.map(element => (
                                <tr key={element.id}>
                                    <td className="w-75">{element.name}</td>
                                    <td className="w-25"><input type="checkbox" className="form-check-input" checked={element.isChecked} onChange={(e) => { this.onChekChanged(e, element.id) }} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RolesPage;