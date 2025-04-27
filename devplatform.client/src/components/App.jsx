import * as React from 'react';
import withRoute from '../withRoute';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.getUser = this.getUser.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    componentDidMount(){
        this.getUser();
    }
    async getUser(){
        const result = await fetch('/api/authentication/getuser', { method: "GET" });
        if (result.ok) {
            const data = await result.json();
            this.setState({ user: data });
        }
    }
    async signOut() {
        const result = await fetch('/api/authentication/signout', { method: "POST" });
        if (result.ok) {
            this.setState({ user: null });
        }
    }
    render() {
        return (
            <div>
                <AppHeader user={this.state.user} signOut={this.signOut} />
                <div style={{marginTop: "75px"}}>
                    <Outlet context={{ user: this.state.user, signOut: this.signOut }} />
                </div>
            </div>
        );
    }
}

export default withRoute(App);