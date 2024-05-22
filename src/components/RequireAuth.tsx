import { Outlet, Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

const RequireAuth: React.FC = () => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
