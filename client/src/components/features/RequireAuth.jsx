import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
    const authstate = useSelector((state) => state.auth)
    const location = useLocation();

    return (
        authstate?.user
            ? <Outlet state={{ from: location }} />
            : <Navigate to="/login" state={{ from: location.pathname }} replace />
    )
}


export default RequireAuth;