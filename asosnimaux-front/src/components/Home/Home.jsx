// Styles
import "./home.scss";
// Components
import Banner from '../Banner/Banner';
import HomeTestimonies from "../HomeTestimonies/HomeTestimonies";
import HomeArticles from "../HomeArticles/HomeArticles";
import Informations from "../Informations/Informations";

const Home = () => {
  return (
    <>
      <Banner />
      <HomeTestimonies />
      <HomeArticles />
      <Informations />
    </>
  );
}

export default Home;