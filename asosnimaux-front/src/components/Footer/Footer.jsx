import "./footer.scss";
import SocialMediaLink from "../SocialMediaLinks/SocialMediaLinks";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import { useRef } from "react";

const Footer = () => {
  const topPageRef = useRef();

  const handleScrollToTopPage = () => {
    if (topPageRef.current) topPageRef.current.scrollIntoView();
  }

  return (
    <>
      <footer className="footer">
        <div className="footer__img">
          <a href="#" onClick={handleScrollToTopPage}>
            <img src="/logo-dm.svg" alt="Logo ASOS'nimaux" />
          </a>
        </div>

        <nav>
          <ul className="footer__links">
            <li><Link to="#">Plan du site</Link></li>
            <li><Link to="#">Nous rejoindre</Link></li>
            <li><Link to="#">FAQ</Link></li>
            <li><Link to="#">Politique de confidentialité</Link></li>
            <li><Link to="#">Cookies</Link></li>
            <li><Link to="#">Mentions légales</Link></li>
            <li><Link to={APP_ROUTES.HOME}>Adresse</Link></li>
            <li><Link to={APP_ROUTES.HOME}>Horaires</Link></li>
            <li><Link to={APP_ROUTES.HOME}>Contact</Link></li>
            <li><p>Réseaux Sociaux :</p>
              <SocialMediaLink />
            </li>
          </ul>
        </nav>

        <a className="copyright" href="https://github.com/Tiffany-Dby" target="_blank">Tiffany-Dby&copy;</a>
      </footer>
    </>
  )
}

export default Footer;