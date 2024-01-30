import { APP_ROUTES } from "../../constants/route.const";
import Icon from "../Icon/Icon";
import "./headerNav.scss";

const HeaderNav = ({ toggleClass }) => {
  return (
    <>
      <nav className={`header__nav ${toggleClass}`}>
        <ul className="header__links">
          <li><a href="">L'Association</a></li>
          <li><a href={APP_ROUTES.ADOPTION}>Adoption</a></li>
          <li><a href={APP_ROUTES.ARTICLES}>Actualités</a></li>
          <li><a href="">L'équipe</a></li>
          <li><a href="">Contact</a></li>
        </ul>
      </nav >
    </>
  );
}

export default HeaderNav;