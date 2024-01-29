import Admin from '../Admin/Admin';
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
      <Header />
      {/* <Admin />
      <Banner />

      <User username={"Tiffany"} />

      <div className="title-wrapper">
        <h1>Ami'nimaux</h1>
      </div>

      <Filters />

      <section className="signUp">
        <SignUp />
      </section> */}

      <section className="SignIn">
        <SignIn />
      </section>

      {/* <section className="animals-wrapper">
        <AnimalCard imgUrl={"/equipe.jpg"} animalName="Pichu" />
      </section>

      <section className="articles">
        <HomeArticles />
      </section>

      <section className="location">
        <Location />
      </section>

      <section className="schedules">
        <Schedules />
      </section>

      <section className="contact">
        <Contact />
      </section>

      <section className="socialmedia">
        <SocialMedia />
      </section> */}

      <Footer />
    </>
  )
}

export default App
