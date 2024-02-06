import { Navigate, Outlet } from "react-router-dom"
import { APP_ROUTES } from "../../constants/route.const"
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = ({ hasAccess, redirectPath, children }) => {
  const { isTokenChecked } = useSelector(state => state.userReducer);

  useEffect(() => {
  }, [isTokenChecked]);

  if (!hasAccess) {
    return <Navigate to={redirectPath || APP_ROUTES.SIGN_IN} replace />
  }

  return children ? children : <Outlet />;
}

export default PrivateRoute;