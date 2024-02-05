import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { APP_ROUTES } from "../../constants/route.const"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneUserThunk } from "../../api/user.api";

const PrivateRoute = ({ hasAccess, redirectPath = APP_ROUTES.SIGN_IN, children }) => {
  const { user, isTokenChecked } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const token = getFromStorage("token");
  //   if (!token) {
  //     dispatch(setisAuth(false));
  //     navigate(APP_ROUTES.SIGN_IN, { replace: true })
  //     console.log(user)
  //   }
  //   else {
  //     dispatch(getOneUserThunk());
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!isAuth) {
  //     console.log(isAuth)
  //     navigate(APP_ROUTES.SIGN_IN, { replace: true })
  //     console.log(user)
  //   }
  // }, [isTokenChecked]);

  useEffect(() => {
    console.log("Private", user)
  }, []);

  useEffect(() => {
    dispatch(getOneUserThunk());
  }, [isTokenChecked]);

  if (!hasAccess) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />;
}

export default PrivateRoute;