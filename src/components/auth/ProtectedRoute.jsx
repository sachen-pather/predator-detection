import React from "react";
import { useAuth } from "../../hooks/useAuth";
import LoginForm from "./LoginForm";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return children;
};

export default ProtectedRoute;
