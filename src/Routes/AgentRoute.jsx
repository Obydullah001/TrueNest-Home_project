import React from "react";
import useAuth from "../hooks/UseAuth/useAuth";
import useUserRole from "../hooks/useUserRole/useUserRole";
import MagicLoaderSpinner from "../Component/Shared/MagicLoader/MagicLoaderSpinner";
import { Navigate } from "react-router";

const AgentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading, fraud } = useUserRole(user?.email);
  if (loading || roleLoading) {
    return <MagicLoaderSpinner></MagicLoaderSpinner>;
  }
  if (!user || role !== "agent") {
    return <Navigate state={location.pathname} to="/forbidden"></Navigate>;
  }
  if (fraud) {
    return <Navigate state={location.pathname} to="/fraud-blocked"></Navigate>;
  }
  return children;
};

export default AgentRoute;
