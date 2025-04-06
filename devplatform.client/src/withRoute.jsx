import { useNavigate, useLocation, useParams } from "react-router-dom";

const withRoute = (Component) => {
    return function Wrapper(props){
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        return(<Component {...props} navigate={navigate} location={location} params={params}/>);
    }
}

export default withRoute;