import * as React from 'react';
import withRoute from '../withRoute';

class OrdersPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container d-flex justify-content-center">
                <h1>Orders Page</h1>
            </div>
        );
    }
}

export default withRoute(OrdersPage);