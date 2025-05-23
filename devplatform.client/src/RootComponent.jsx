import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from './components/App.jsx';
import SignInForm from './components/SignInForm.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import NotFound from './components/NotFound.jsx'
import AdminPage from './components/AdminPage.jsx';
import HomePage from './components/HomePage.jsx';
import OrdersPage from './components/OrdersPage.jsx';
import UsersPage from './components/UsersPage.jsx';
import RolesPage from './components/RolesPage.jsx';
import UserCreateForm from './components/UserCreateForm.jsx';
import UserDetails from './components/UserDetails.jsx';
import UserRoles from './components/UserRoles.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import OrderEditor from './components/OrderEditor.jsx';
import MyOrdersList from './components/MyOrdersList.jsx';

class RootComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<HomePage />}/>
                        <Route path="orders" element={<OrdersPage/>}>
                            <Route path="myorders" element={<MyOrdersList/>}/>
                            <Route path="createorder" element={<OrderEditor/>}/>
                        </Route>
                        <Route path="admin" element={<AdminPage />}>
                            <Route path="users" element={<UsersPage/>}>
                                <Route path="createuser" element={<UserCreateForm/>}/>
                                <Route path=":id/details" element={<UserDetails/>}/>
                                <Route path=":id/roles" element={<UserRoles/>}/>
                            </Route>
                            <Route path="roles" element={<RolesPage />}/>
                        </Route>
                        <Route path="profile" element={<ProfilePage/>}/>
                    </Route>
                    <Route path="/signIn" element={<SignInForm />}/>
                    <Route path="/signUp" element={<SignUpForm />}/>
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </Router>
        );
    }
}
createRoot(document.getElementById('root')).render(
    <RootComponent />
)
