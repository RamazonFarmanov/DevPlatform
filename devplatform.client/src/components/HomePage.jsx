import * as React from 'react';
import withRoute from '../withRoute';

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="container d-flex justify-content-center">
                <h1>Home Page</h1>
            </div>
        );
    }
}

export default withRoute(HomePage);