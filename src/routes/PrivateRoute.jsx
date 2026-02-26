import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }

  return <Navigate to="/" state={{ showLoginAlert: true }} replace />;
};

export default PrivateRoute;
