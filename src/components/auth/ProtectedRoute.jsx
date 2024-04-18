import { Route, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // Import AuthContext

const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const Navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to login on unauthorized access
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
