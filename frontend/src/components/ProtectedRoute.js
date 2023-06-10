import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthUserContext from "../contexts/AuthUserContext";

function ProtectedRoute() {
  const { loggedIn } = useContext(AuthUserContext);

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
}

export default ProtectedRoute;
