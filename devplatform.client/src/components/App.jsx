import * as React from 'react';
import AppHeader from './AppHeader';
import HomePage from './HomePage';
import UsersPage from './UsersPage';
import RolesPage from './RolesPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homePage: true,
            usersPage: false,
            rolesPage: false
        }
        this.toHomePage = this.toHomePage.bind(this);
        this.toUsersPage = this.toUsersPage.bind(this);
        this.toRolesPage = this.toRolesPage.bind(this);
    }
    pageHandlers = {
        toHomePage: () => this.toHomePage(),
        toUsersPage: () => this.toUsersPage(),
        toRolesPage: () => this.toRolesPage(),
        toSignInPage: this.props.toSignIn,
        toSignUpPage: this.props.toSignUp
    };
    toHomePage(){
        this.setState({homePage: true, usersPage: false, rolesPage: false});
    }
    toUsersPage(){
        this.setState({homePage: false, usersPage: true, rolesPage: false});
    }
    toRolesPage(){
        this.setState({homePage: false, usersPage: false, rolesPage: true});
    }
    render() {
        return (
            <div>
                <AppHeader pageHandlers={this.pageHandlers}/>
                {this.state.homePage && (<HomePage/>)}
                {this.state.usersPage && (<UsersPage/>)}
                {this.state.rolesPage && (<RolesPage/>)}
            </div>
        );
    }
}

export default App;