import * as React from 'react';
import withRoute from '../withRoute';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount(){
    }
    render() {
        return (
            <div>
                <AppHeader />
                <Outlet />
            </div>
        );
    }
}

export default withRoute(App);