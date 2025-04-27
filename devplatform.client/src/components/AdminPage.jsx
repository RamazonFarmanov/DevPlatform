import * as React from 'react';
import { Outlet } from 'react-router-dom';
import withRoute from '../withRoute';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Outlet />
        );
    }
}

export default withRoute(AdminPage);