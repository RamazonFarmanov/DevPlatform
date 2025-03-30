import * as React from 'react';
import UsersPage from './UsersPage';
import RolesPage from './RolesPage'
import '../css/pageMenu.css';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersPage: true,
            rolesPage: false,
        }
        this.toUsersPage = this.toUsersPage.bind(this);
        this.toRolesPage = this.toRolesPage.bind(this);
    }
    clickHandler(handler, e){
        e.preventDefault();
        handler();
    }
    toUsersPage(){
        this.setState({ usersPage: true, rolesPage: false});
    }
    toRolesPage(){
        this.setState({ usersPage: false, rolesPage: true});
    }
    render() {
        return (
            <div style={{height: "100vh", position: "relative"}}>
                <div className="pageMenu">
                    <ul className="list-unstyled">
                        <li className="mb-4"><a onClick={(e) => this.clickHandler(this.toUsersPage, e)} href="#">Users</a></li>
                        <li className="mb-4"><a onClick={(e) => this.clickHandler(this.toRolesPage, e)} href="#">Roles</a></li>
                        <li className="mb-4"><a href="#">Something</a></li>
                    </ul>
                </div>
                <div className="pageContent">
                    {this.state.usersPage && (<UsersPage/>)}
                    {this.state.rolesPage && (<RolesPage/>)}
                </div>
            </div>
        );
    }
}

export default AdminPage;