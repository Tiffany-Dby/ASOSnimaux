import "./headerNav.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from "../../constants/route.const";
import { toggleMobileMenu } from "../../redux/reducers/header.reducer";

const HeaderNav = ({ toggleClass }) => {
  const dispatch = useDispatch();

  // User Reducer
  const { user } = useSelector(state => state.userReducer);

  // Add class 'active' on the current page
  const checkActiveLink = ({ isActive }) => {
    return isActive ? 'active' : '';
  }

  // Close header (mobile) after clicking a link
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
          <li><NavLink className={checkActiveLink} to={APP_ROUTES.DONATION} >Don</NavLink></li>
          {(user.role === 'admin' || user.role === 'super_admin') &&
            <li><NavLink className={checkActiveLink} to={APP_ROUTES.ADMIN} >Admin</NavLink></li>
          }
        </ul>
      </nav >
    </>
  );
}

export default HeaderNav;