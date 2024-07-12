import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function CheckAuth() {
    const authstate = useSelector((state)=> state.auth)
    const location = useLocation();

  return (
    authstate?.accessToken === null
    ? <Outlet state={{from: location}} />
    : <Navigate to="/" state={{ from: location }} replace />
  )
}

export default CheckAuth