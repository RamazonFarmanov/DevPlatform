import * as React from 'react';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
    }
    getInitial() {
        const char = this.props.user?.name ? this.props.user?.name.charAt(0).toUpperCase() : '?';
        return char;
    }
    getColor() {
        const colors = ['#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8', '#007bff', '#6f42c1'];
        return this.props.user?.name ? colors[this.props.user?.name.charCodeAt(this.props.user?.name.length - 1) % colors.length] : colors[0];
    }
    render() {
        return (
            this.props.photoUrl ? <img src={this.props.photoUrl} alt={this.props.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> :
                this.props.user?.avatarUrl ? <img src={`/api/avatar/${this.props.user?.userId}`} alt={this.props.user?.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> :
                <div
                    style={{
                        width: "100%",
                        height: "100%",
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