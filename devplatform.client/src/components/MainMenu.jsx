import * as React from 'react';
import withRoute from '../withRoute';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    clickHandeler(handler, e) {
        e.preventDefault();
        // this.closeOffcanvas();
        handler();
    }
    closeOffcanvas() {
        const offcanvasElement = document.querySelector('.offcanvas.show');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvas) offcanvas.hide();
    }
    render() {
        return (
            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="mainMenu"
                aria-labelledby="profileMenuLabel"
            >
                <div className="offcanvas-header">
                    <h3 className="offcanvas-title ms-3 mt-3" id="profileMenuLabel">DevPlatform</h3>
                    <button type="button" className="btn-close mt-2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body ms-2">
                    <ul className="navbar-nav fs-5">
                        <li>
                            <hr />
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link ms-3" to="/" onClick={this.closeOffcanvas}>Home</Link>
                        </li>
                        <li>
                            <hr />
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link ms-3" to="/myorders" onClick={this.closeOffcanvas}>My orders</Link>
                        </li>
                        <li>
                            <hr />
                        </li>
                        <li className="nav-item">
                            <button
                                className="btn nav-link ms-3 fs-5 w-100 text-start"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#adminCollapse"
                                aria-expanded="false"
                                aria-controls="adminCollapse"
                            >
                                Administration
                            </button>
                            <div className="collapse" id="adminCollapse">
                                <ul className="list-unstyled ms-4">
                                    <li><Link to="/admin/users" className="nav-link mt-3" onClick={this.closeOffcanvas}>Users</Link></li>
                                    <li><Link to="/admin/roles" className="nav-link mt-3" onClick={this.closeOffcanvas}>Roles</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <hr />
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link ms-3" to="/profile" onClick={this.closeOffcanvas}>Profile</Link>
                        </li>
                        <li>
                            <hr />
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link ms-3" onClick={this.closeOffcanvas}>Settings</Link>
                        </li>
                        <li>
                            <hr />
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link ms-3" onClick={(e) => this.clickHandeler(this.props.signOut, e)}>Log out</Link>
                        </li>
                        <li>
                            <hr />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRoute(MainMenu);