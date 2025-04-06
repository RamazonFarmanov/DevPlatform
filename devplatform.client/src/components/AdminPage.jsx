import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import withRoute from '../withRoute';
import '../css/pageMenu.css';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{height: "100vh", position: "relative"}}>
                <div className="pageMenu">
                    <ul className="list-unstyled">
                        <li className="mb-4"><Link to="/admin/users/">Users</Link></li>
                        <li className="mb-4"><Link to="/admin/roles/">Roles</Link></li>
                        <li className="mb-4"><a href="#">Something</a></li>
                    </ul>
                </div>
                <div className="pageContent">
                    <Outlet />
                </div>
            </div>
        );
    }
}

export default withRoute(AdminPage);