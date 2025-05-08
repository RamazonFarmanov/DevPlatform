import * as React from 'react';
import withRoute from '../withRoute';
import { Outlet } from 'react-router-dom';

class MyOrdersList extends React.Component {
    constructor(props) {
        super(props);
    }
    clickHandler(e, handler) {
        e.preventDefault();
        handler();
    }
    render() {
        return (
            <div>
                <div className="container d-flex justify-content-center p-2">
                    <button href="#" className="btn btn-light w-100 border fs-5" onClick={(e) => this.clickHandler(e, () => this.props.navigate("/orders/createorder"))}>Create new order</button>
                </div>
            </div>
        );
    }
}

export default withRoute(MyOrdersList);