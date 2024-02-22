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
import SuperAdmin from '../SuperAdmin/SuperAdmin.jsx';
import Filters from '../Filters/Filters.jsx';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const.js"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUserThunk } from '../../api/user.api.js';
import { getFromStorage } from '../../utils/storage.utils.js';
import Articles from '../Articles/Articles.jsx';
import ArticleDetails from '../ArticleDetails/ArticleDetails.jsx';
import Favorites from '../Favorites/Favorites.jsx';
import AnimalDetails from '../AnimalDetails/AnimalDetails.jsx';
import AdminArticles from '../AdminArticles/AdminArticles.jsx';
import AdminAnimals from '../AdminAnimals/AdminAnimals.jsx';
import AdminUsers from '../AdminUsers/AdminUsers.jsx';

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
          {/* <Filters /> */}
          <Routes>
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
            {/* <Route
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
            /> */}
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
            >
              <Route index path={`${APP_ROUTES.ADMIN}`} element={<Navigate replace to="articles" />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="animals" element={<AdminAnimals />} />
              <Route
                path="users"
                element={
                  <>
                    <PrivateRoute
                      hasAccess={isAuth && user.role === 'super_admin'}
                    >
                      <AdminUsers />
                    </PrivateRoute>
                  </>
                }
              />
            </Route>
            <Route
              path={APP_ROUTES.ADOPTION}
              element={
                <>
                  <Adoption />
                </>
              }
            />
            <Route
              path={APP_ROUTES.ANIMAL}
              element={
                <>
                  <AnimalDetails />
                </>
              }
            />
            <Route
              path={APP_ROUTES.FAVORITES}
              element={
                <>
                  <Favorites />
                </>
              }
            />
            <Route
              path={APP_ROUTES.ARTICLES}
              element={
                <>
                  <Articles />
                </>
              }
            />
            <Route
              path={APP_ROUTES.ARTICLE}
              element={
                <>
                  <ArticleDetails />
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
