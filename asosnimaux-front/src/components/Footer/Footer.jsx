import SocialMediaLink from "../SocialMediaLink/SocialMediaLink";
import "./footer.scss";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__img">
          <a href="#">
            <img src="/logo-dm.svg" alt="Logo ASOS'nimaux" />
          </a>
        </div>

        <div>
          <ul className="footer__links">
            <li><a href="#">Plan du site</a></li>
            <li><a href="#">Nous rejoindre</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Mentions légales</a></li>
            <li><a href="#">Adresse</a></li>
            <li><a href="#">Horaires</a></li>
            <li><a href="#">Contact</a></li>
            <li><p>Réseaux Sociaux :</p>
              <SocialMediaLink />
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export default Footer;