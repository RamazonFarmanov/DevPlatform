import * as React from 'react';
import AppHeader from './AppHeader';
import HomePage from './HomePage';
import AdminPage from './AdminPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homePage: true,
            adminPage: false,
        }
        this.toHomePage = this.toHomePage.bind(this);
        this.toAdminPage = this.toAdminPage.bind(this);
    }
    pageHandlers = {
        toHomePage: () => this.toHomePage(),
        toAdminPage: () => this.toAdminPage(),
        toSignInPage: this.props.toSignIn,
        toSignUpPage: this.props.toSignUp
    };
    toHomePage(){
        this.setState({homePage: true, adminPage: false});
    }
    toAdminPage(){
        this.setState({homePage: false, adminPage: true})
    }
    render() {
        return (
            <div>
                <AppHeader pageHandlers={this.pageHandlers}/>
                {this.state.homePage && (<HomePage/>)}
                {this.state.adminPage && (<AdminPage/>)}
            </div>
        );
    }
}

export default App;