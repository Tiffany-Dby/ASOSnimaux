import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Location from '../Location/Location';
import Schedules from '../Schedules/Schedules';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import SocialMedia from '../SocialMedia/SocialMedia';
import User from '../User/User';
import { getFromStorage } from "../../utils/storage.utils.js";
import { setUser, setisAuth } from "../../redux/reducers/user.reducer.js";
import Error from '../Error/Error.jsx';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userReducer);

  useEffect(() => {
    const isUserAuth = getFromStorage("user");
    if (isUserAuth) {
      dispatch(setUser({ id: isUserAuth.userID, username: isUserAuth.username, email: isUserAuth.email, role: isUserAuth.userRole }));
      dispatch(setisAuth(true));
    }
    else {
      dispatch(setisAuth(false));
    }
  }, [])

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
                  <section className="articles">
                    <HomeArticles />
                  </section>
                  <section className="location">
                    <Location />
                  </section>
                  <section className="schedules">
                    <Schedules />
                  </section>
                  <section id="contact" className="contact">
                    <Contact />
                  </section>
                  <section className="socialmedia">
                    <SocialMedia />
                  </section>
                </>
              }
            />
            <Route
              path={APP_ROUTES.ACCOUNT}
              element={
                <>
                  <User />
                </>
              }
            />
            {user.role === "admin" &&
              <Route
                path={APP_ROUTES.ADMIN}
                element={
                  <>
                    <Admin />
                  </>
                }
              />
            }
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
