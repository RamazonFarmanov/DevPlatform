import * as React from 'react';

class MainMenu extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={`offcanvas-menu ${this.props.isOpen ? "show" : ""}`} onClick={this.props.onClose}>
                <div className="offcanvas-content" onClick={(e) => e.stopPropagation()}>
                    <button className="btn-close" onClick={this.props.onClose}>
                    &times;
                    </button>
                    <ul>
                        <li><a href="#">Профиль</a></li>
                        <li><a href="#">Настройки</a></li>
                        <li><a href="#">Выйти</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default MainMenu;