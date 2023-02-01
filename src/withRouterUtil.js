import {
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom';

export default function withRouter(Child) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        // const params = useParams(); params={params}
        // console.log(params)
        return <Child {...props} navigate={navigate} location={location} />
    }
}