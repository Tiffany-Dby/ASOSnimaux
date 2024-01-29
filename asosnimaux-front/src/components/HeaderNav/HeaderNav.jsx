import Icon from "../Icon/Icon";
import "./headerNav.scss";

const HeaderNav = () => {
  return (
    <>
      <nav className="header__nav">
        <ul className="header__links">
          <li><a href="">L'Association</a></li>
          <li><a href="">Adoption</a></li>
          <li><a href="">Actualités</a></li>
          <li><a href="">L'équipe</a></li>
          <li><a href="">Contact</a></li>
        </ul>
      </nav>
    </>
  );
}

export default HeaderNav;