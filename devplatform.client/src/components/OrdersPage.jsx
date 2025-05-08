import * as React from 'react';
import withRoute from '../withRoute';
import { Outlet } from 'react-router-dom';

class OrdersPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Outlet/>
        );
    }
}

export default withRoute(OrdersPage);