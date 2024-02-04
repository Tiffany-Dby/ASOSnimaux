import { APP_ROUTES } from "../../constants/route.const";
import { Link, useLocation } from 'react-router-dom';
import "./headerNav.scss";
import { useDispatch } from "react-redux";

const HeaderNav = ({ toggleClass }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  }

  const handleCloseMobileMenuAfterClick = () => {
    dispatch(toggleMobileMenu());
  }

  return (
    <>
      <nav className={`header__nav ${toggleClass}`}>
        <ul className="header__links">
          <li><Link className={isActive(APP_ROUTES.HOME) ? 'active' : ''} to={APP_ROUTES.HOME} onClick={handleCloseMobileMenuAfterClick}>Accueil</Link></li>
          <li><Link className={isActive(APP_ROUTES.ASSOCIATION) ? 'active' : ''} to={APP_ROUTES.ASSOCIATION} onClick={handleCloseMobileMenuAfterClick}>L'Association</Link></li>
          <li><Link className={isActive(APP_ROUTES.ADOPTION) ? 'active' : ''} to={APP_ROUTES.ADOPTION} onClick={handleCloseMobileMenuAfterClick}>Adoption</Link></li>
          <li><Link className={isActive(APP_ROUTES.ARTICLES) ? 'active' : ''} to={APP_ROUTES.ARTICLES} onClick={handleCloseMobileMenuAfterClick}>Actualités</Link></li>
          <li><Link className={isActive(APP_ROUTES.ADMIN) ? 'active' : ''} to="" onClick={handleCloseMobileMenuAfterClick}>Contact</Link></li>
        </ul>
      </nav >
    </>
  );
}

export default HeaderNav;