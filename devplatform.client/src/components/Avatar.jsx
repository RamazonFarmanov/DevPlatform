import * as React from 'react';

class Avatar extends React.Component{
    constructor(props){
        super(props);
    }
    getInitial(){
        const char = this.props.name ? this.props.name.charAt(0).toUpperCase() : '?';
        return char;
    }
    getColor(){
        const colors = ['#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8', '#007bff', '#6f42c1'];
        return this.props.name ? colors[this.props.name.charCodeAt(this.props.name.length - 1) % colors.length] : colors[0];
    }
    render(){
        return(
            this.props.photoUrl ? <img src={this.props.photoUrl} alt={this.props.name} style={{width: "100%", height: "100%", objectFit: "cover"}} /> 
            : <div 
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: this.getColor(),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "white",
                overflow: "hidden",
            }}>
                <span>{this.getInitial()}</span>
            </div>
        );
    }
}

export default Avatar;