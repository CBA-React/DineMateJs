import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AuthBackground } from "../auth/AuthBackground";
import { AuthCard } from "../auth/AuthCard";
import { BG_BY_PATH } from "../../constants";

const AuthLayout = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const bg = BG_BY_PATH.find((r) => r.test(pathname))?.src;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthBackground src={bg}>
      <AuthCard>
          <Outlet />
      </AuthCard>
    </AuthBackground>
  );
};

export default AuthLayout;
