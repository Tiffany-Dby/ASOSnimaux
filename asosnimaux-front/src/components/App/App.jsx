import './App.scss';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const.js"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin from '../Admin/Admin';
import Adoption from '../Adoption/Adoption';
import Banner from '../Banner/Banner';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import HomeArticles from '../HomeArticles/HomeArticles';
import Schedules from '../Schedules/Schedules';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import SocialMedia from '../SocialMedia/SocialMedia';
import User from '../User/User';
import { getFromStorage } from "../../utils/storage.utils.js";
import { setUser, setisAuth } from "../../redux/reducers/user.reducer.js";
import Error from '../Error/Error.jsx';
import { getOneUserThunk } from '../../api/user.api.js';
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx';
import Informations from '../Informations/Informations.jsx';

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuth, isTokenChecked } = useSelector(state => state.userReducer);

  // useEffect(() => {
  //   const isUserAuth = getFromStorage("user");
  //   if (isUserAuth) {
  //     dispatch(setUser({ id: isUserAuth.userID, username: isUserAuth.username, email: isUserAuth.email, role: isUserAuth.userRole }));
  //     dispatch(setisAuth(true));
  //   }
  //   else {
  //     dispatch(setisAuth(false));
  //   }
  // }, [])

  // useEffect(() => {
  //   dispatch(getOneUserThunk());
  // }, [isTokenChecked]);

  useEffect(() => {
    console.log("App", user)
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
                    redirectPath={APP_ROUTES.SIGN_IN}
                  >
                    <User />
                  </PrivateRoute>
                </>
              }
            />
            <Route
              path={APP_ROUTES.ADMIN}
              element={
                <>
                  <PrivateRoute
                    hasAccess={isAuth && user.role === 'admin'}
                    redirectPath={APP_ROUTES.SIGN_IN}
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
