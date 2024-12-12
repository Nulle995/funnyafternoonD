import { Navigate } from "react-router-dom";
import { auth } from "../utils/authorization";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await auth();
      setIsAuth(!!token);
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to={"/acceso/"} replace />;

  return children;
};

export default ProtectedRoute;
