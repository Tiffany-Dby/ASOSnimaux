import "./headerNav.scss";
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from "../../constants/route.const";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "../../redux/reducers/header.reducer";

const HeaderNav = ({ toggleClass }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userReducer);

  const checkActiveLink = ({ isActive }) => {
    return isActive ? 'active' : '';
  }

  const handleCloseClickOnLink = () => {
    dispatch(toggleMobileMenu());
  }

  return (
    <>
      <nav className={`header__nav ${toggleClass}`}>
        <ul className="header__links" onClick={handleCloseClickOnLink}>
          <li><NavLink className={checkActiveLink} to={APP_ROUTES.HOME} >Accueil</NavLink></li>
          <li><NavLink className={checkActiveLink} to={APP_ROUTES.ASSOCIATION} >L'Association</NavLink></li>
          <li><NavLink className={checkActiveLink} to={APP_ROUTES.ADOPTION} >Adoption</NavLink></li>
          <li><NavLink className={checkActiveLink} to={APP_ROUTES.ARTICLES} >Actualités</NavLink></li>
          <li><NavLink className={checkActiveLink} to="" >Contact</NavLink></li>
          {user.role === 'admin' &&
            <li><NavLink className={checkActiveLink} to={APP_ROUTES.ADMIN} >Admin</NavLink></li>}
        </ul>
      </nav >
    </>
  );
}

export default HeaderNav;