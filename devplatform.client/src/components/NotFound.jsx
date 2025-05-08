import * as React from 'react'

class NotFound extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="container d-flex flex-column align-items-center">
                <h1>404</h1>
                <h2>Page not found!</h2>
            </div>
        );
    }
}

export default NotFound;