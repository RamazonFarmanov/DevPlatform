import * as React from 'react';
import { Link } from 'react-router-dom';
import withRoute from '../withRoute';
import Avatar from './Avatar';
import MainMenu from './MainMenu';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    clickHandler(handler, event) {
        event.preventDefault();
        handler();
    }
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md bg-light fixed-top shadow-sm border-bottom">
                    <div className="container-fluid" style={{ height: "60px" }}>
                        <button className=" btn me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#mainMenu" aria-controls="mainMenu">
                            <span className=" navbar-toggler-icon"></span>
                        </button>
                        <div className="d-none d-md-flex">
                            <ul className="navbar-nav fs-5">
                                <li className="nav-item">
                                    <Link className="nav-link text-dark me-5" to="/">Home</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle text-dark me-5" role="button" data-bs-toggle="dropdown" aria-expanded="false">Orders</a>
                                    <ul className="dropdown-menu fs-5">
                                        <li><Link className="dropdown-item" to="/orders/myorders">All orders</Link></li>
                                        <li><Link className="dropdown-item" to="/orders/myorders">My orders</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle text-dark" role="button" data-bs-toggle="dropdown" aria-expanded="false">Administration</a>
                                    <ul className="dropdown-menu fs-5">
                                        <li><Link className="dropdown-item" to="/admin/users">Users</Link></li>
                                        <li><Link className="dropdown-item" to="/admin/roles">Roles</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div>
                            {this.props.user? (<button onClick={(e) => this.clickHandler(() => this.props.navigate("/profile"), e)}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    color: "white",
                                    border: "none",
                                    padding: 0,
                                    overflow: "hidden",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <Avatar user={this.props.user} photoUrl="" />
                            </button>)
                                : (<div>
                                    <Link className="btn me-1" to="/signIn">Sign in</Link>
                                    <Link className="btn btn-primary" to="signUp">Sign up</Link>
                                </div>)}
                        </div>
                    </div>
                </nav>
                <MainMenu signOut={this.props.signOut} />
            </header>
        );
    }
}

export default withRoute(AppHeader);