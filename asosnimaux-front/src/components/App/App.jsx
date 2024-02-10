import './App.scss';
import Admin from '../Admin/Admin';
import Adoption from '../Adoption/Adoption';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import HomeArticles from '../HomeArticles/HomeArticles';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import User from '../User/User';
import Error from '../Error/Error.jsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx';
import Informations from '../Informations/Informations.jsx';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const.js"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUserThunk } from '../../api/user.api.js';
import { getFromStorage } from '../../utils/storage.utils.js';
import SuperAdmin from '../SuperAdmin/SuperAdmin.jsx';

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector(state => state.userReducer);

  useEffect(() => {
    const token = getFromStorage("token");
    if (token) {
      dispatch(getOneUserThunk());
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            {/*<Filters /> */}
            <Route
              path={APP_ROUTES.SIGN_UP}
              element={
                <>
                  <section className="signUp">
                    <SignUp />
                  </section>
                </>
              }
            />
            <Route
              path={APP_ROUTES.SIGN_IN}
              element={
                <>
                  <section className="signIn">
                    <SignIn />
                  </section>
                </>
              }
            />
            <Route
              path={APP_ROUTES.HOME}
              element={
                <>
                  <Banner />
                  <HomeArticles />
                  <Informations />
                </>
              }
            />
            <Route
              path={APP_ROUTES.ACCOUNT}
              element={
                <>
                  <PrivateRoute
                    hasAccess={isAuth}
                  >
                    <User />
                  </PrivateRoute>
                </>
              }
            />
            <Route
              path={`${APP_ROUTES.ADMIN}/users`}
              element={
                <>
                  <PrivateRoute
                    hasAccess={isAuth && user.role === 'super_admin'}
                  >
                    <SuperAdmin />
                  </PrivateRoute>
                </>
              }
            />
            <Route
              path={APP_ROUTES.ADMIN}
              element={
                <>
                  <PrivateRoute
                    hasAccess={isAuth && (user.role === 'admin' || user.role === 'super_admin')}
                  >
                    <Admin />
                  </PrivateRoute>
                </>
              }
            />
            <Route
              path={APP_ROUTES.ADOPTION}
              element={
                <>
                  <Adoption />
                </>
              }
            />
            <Route
              path={"*"}
              element={
                <>
                  <Error />
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
