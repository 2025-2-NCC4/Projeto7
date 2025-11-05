import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase"; // ⚠ caminho corrigido

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
