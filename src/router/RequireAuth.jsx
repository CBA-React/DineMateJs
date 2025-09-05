// import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const isAuthed = true;
  const location = useLocation();
  return isAuthed ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

export default RequireAuth;