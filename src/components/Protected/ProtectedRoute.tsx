/* This code snippet is defining a React component called `ProtectedRoute`. The component is using the
`useAuth` hook from the `@src/hooks/useAuth` module to get the user information. */


import { useAuth } from "@src/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useAuth();

  return userInfo ? <Outlet /> : <Navigate to="/auth/sign-in" replace={true} />;
};

export default ProtectedRoute;
