import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router";

const RequireCompany = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user?.role === "company" ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireCompany;
