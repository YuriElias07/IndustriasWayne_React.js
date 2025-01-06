import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const authenticated = localStorage.getItem("authenticated");

  if (!authenticated) {
    alert("Você precisa estar logado para acessar essa página.");
    return <Navigate to="/login" />;
  }

  return children;
};
