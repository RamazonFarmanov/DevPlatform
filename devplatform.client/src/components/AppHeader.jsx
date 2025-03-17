import * as React from 'react';
import Avatar from './Avatar';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}

        }
    }
    async componentDidMount() {
        const result = await fetch('api/authentication/getuser', { method: "GET" });
        if (result.ok) {
            const data = await result.json();
            this.setState({ user: data });
            console.log(data);
        }
    }
    async signOut() {
        const result = await fetch('api/authentication/signout', { method: "POST" });
        if(result.ok){
            this.setState({ user: {} });
        }
    }
    clickHandler(handler, event) {
        event.preventDefault();
        handler();
    }
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#" onClick={(e) => this.clickHandler(this.props.pageHandlers.toHomePage, e)}>DevPlatform</a>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="#" onClick={(e) => this.clickHandler(this.props.pageHandlers.toUsersPage, e)}>Users</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="#" onClick={(e) => this.clickHandler(this.props.pageHandlers.toRolesPage, e)}>Roles</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            {this.state.user.name ? (<button data-bs-toggle="offcanvas" data-bs-target="#profileMenu"
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
                                <Avatar name={this.state.user.name} photoUrl="" />
                            </button>)
                                : (<div>
                                    <a className="btn me-1" href="#" onClick={(e) => this.clickHandler(this.props.pageHandlers.toSignInPage, e)}>Sign in</a>
                                    <a className="btn btn-primary" href="#" onClick={(e) => this.clickHandler(this.props.pageHandlers.toSignInPage, e)}>Sign up</a>
                                </div>)}
                        </div>
                    </div>
                </nav>
                <div
                    className="offcanvas offcanvas-end"
                    tabIndex="-1"
                    id="profileMenu"
                    aria-labelledby="profileMenuLabel"
                >
                    <div className="offcanvas-header">
                        <div style={{ width: "50px", height: "50px", marginRight: "20px" }}><Avatar name={this.state.user.name} photoUrl="" /></div>
                        <h5 className="offcanvas-title" id="profileMenuLabel">{this.state.user.name}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="list-unstyled">
                            <li>
                                <button className="btn btn-light d-flex align-items-center gap-2 px-3 py-2 mb-1 shadow-sm" data-bs-dismiss="offcanvas" style={{ width: "100%", borderRadius: "8px", transition: "0.2s" }}>
                                    <i className="bi bi-box-arrow-right" style={{ fontSize: "1.2rem" }}></i>
                                    <span>Профиль</span>
                                </button>
                            </li>
                            <li>
                                <button className="btn btn-light d-flex align-items-center gap-2 px-3 py-2 mb-1 shadow-sm" data-bs-dismiss="offcanvas" style={{ width: "100%", borderRadius: "8px", transition: "0.2s" }}>
                                    <i className="bi bi-box-arrow-right" style={{ fontSize: "1.2rem" }}></i>
                                    <span>Настройки</span>
                                </button>
                            </li>
                            <li>
                                <button className="btn btn-light d-flex align-items-center gap-2 px-3 py-2 mb-1 shadow-sm" data-bs-dismiss="offcanvas" onClick={() => this.signOut()} style={{ width: "100%", borderRadius: "8px", transition: "0.2s" }}>
                                    <i className="bi bi-box-arrow-right" style={{ fontSize: "1.2rem" }}></i>
                                    <span>Выйти</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default AppHeader;