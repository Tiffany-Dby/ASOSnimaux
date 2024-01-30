import { APP_ROUTES } from "../../constants/route.const";
import SocialMediaLink from "../SocialMediaLink/SocialMediaLink";
import "./footer.scss";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__img">
          <a href="#topPage">
            <img src="/logo-dm.svg" alt="Logo ASOS'nimaux" />
          </a>
        </div>

        <nav>
          <ul className="footer__links">
            <li><a href="#">Plan du site</a></li>
            <li><a href="#">Nous rejoindre</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Mentions légales</a></li>
            <li><a href="#">Adresse</a></li>
            <li><a href="#">Horaires</a></li>
            <li><a href={`${APP_ROUTES.HOME}#contact`}>Contact</a></li>
            <li><p>Réseaux Sociaux :</p>
              <SocialMediaLink />
            </li>
          </ul>
        </nav>
      </footer>
    </>
  )
}

export default Footer;