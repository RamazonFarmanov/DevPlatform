import * as React from 'react';
import withRoute from '../withRoute';

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <h1>Home Page</h1>
        );
    }
}

export default withRoute(HomePage);