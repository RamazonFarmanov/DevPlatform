import { useNavigate, useLocation, useParams, useOutletContext } from "react-router-dom";

const withRoute = (Component) => {
    return function Wrapper(props){
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        const context = useOutletContext();
        return(<Component {...props} navigate={navigate} location={location} params={params} context={context}/>);
    }
}

export default withRoute;