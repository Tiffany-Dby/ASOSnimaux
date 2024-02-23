import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Banner from '../Banner/Banner';
import HomeArticles from '../HomeArticles/HomeArticles';
import Informations from '../Informations/Informations.jsx';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import User from '../User/User';
import Articles from '../Articles/Articles.jsx';
import ArticleDetails from '../ArticleDetails/ArticleDetails.jsx';
import Adoption from '../Adoption/Adoption';
import Favorites from '../Favorites/Favorites.jsx';
import AnimalDetails from '../AnimalDetails/AnimalDetails.jsx';
import Admin from '../Admin/Admin';
import AdminArticles from '../AdminArticles/AdminArticles.jsx';
import AdminAnimals from '../AdminAnimals/AdminAnimals.jsx';
import AdminUsers from '../AdminUsers/AdminUsers.jsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx';
import Error from '../Error/Error.jsx';
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APP_ROUTES } from "../../constants/route.const.js"
import { getOneUserThunk } from '../../api/user.api.js';
import { getFromStorage } from '../../utils/storage.utils.js';

const App = () => {
  const dispatch = useDispatch();

  // User Reducer
  const { user, isAuth } = useSelector(state => state.userReducer);

  // Fetching User infos if Local storage has a token set
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
            <Route path={APP_ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
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
                <PrivateRoute hasAccess={isAuth}>
                  <User />
                </PrivateRoute>
              }
            />
            <Route
              path={APP_ROUTES.ADMIN}
              element={
                <PrivateRoute hasAccess={isAuth && (user.role === 'admin' || user.role === 'super_admin')}>
                  <Admin />
                </PrivateRoute>
              }
            >
              <Route index path={`${APP_ROUTES.ADMIN}`} element={<Navigate replace to="articles" />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="animals" element={<AdminAnimals />} />
              <Route
                path="users"
                element={
                  <PrivateRoute hasAccess={isAuth && user.role === 'super_admin'}>
                    <AdminUsers />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path={APP_ROUTES.ADOPTION} element={<Adoption />} />
            <Route path={APP_ROUTES.FAVORITES} element={<Favorites />} />
            <Route path={APP_ROUTES.ANIMAL} element={<AnimalDetails />} />
            <Route path={APP_ROUTES.ARTICLES} element={<Articles />} />
            <Route path={APP_ROUTES.ARTICLE} element={<ArticleDetails />} />
            <Route path={"*"} element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
