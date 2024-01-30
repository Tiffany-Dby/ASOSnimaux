import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const.js"
import Admin from '../Admin/Admin';
import Adoption from '../Adoption/Adoption';
import AnimalCard from '../AnimalCard/AnimalCard';
import Article from '../Article/Article';
import Banner from '../Banner/Banner';
import Burger from '../Burger/Burger';
import Button from '../Button/Button';
import Contact from '../Contact/Contact';
import Filters from '../Filters/Filters';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import HeaderNav from '../HeaderNav/HeaderNav';
import HomeArticles from '../HomeArticles/HomeArticles';
import Input from '../Input/Input';
import Location from '../Location/Location';
import Schedules from '../Schedules/Schedules';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import SocialMedia from '../SocialMedia/SocialMedia';
import User from '../User/User';
import './App.scss';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            {/* <Admin />
      

      

      <div className="title-wrapper">
        <h1>Ami'nimaux</h1>
      </div>

      <Filters /> */}
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
                  <User username={"Tiffany"} />
                </>
              }
            />
            <Route
              path={"*"}
              element={
                <main style={{ padding: "1rem" }}>
                  <h1>Oops !</h1>
                  <em>Erreur : 404</em>
                  <p>Cette page n'existe pas.</p>
                </main>
              }
            />
            {/*<Adoption /> */}
          </Routes>
        </main>
        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
