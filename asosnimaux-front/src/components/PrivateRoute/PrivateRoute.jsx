import { Navigate, Outlet } from "react-router-dom"
import { APP_ROUTES } from "../../constants/route.const"

const PrivateRoute = ({ hasAccess, redirectPath, children }) => {
  if (!hasAccess) {
    return <Navigate to={redirectPath || APP_ROUTES.SIGN_IN} replace />
  }

  return children ? children : <Outlet />;
}

export default PrivateRoute;