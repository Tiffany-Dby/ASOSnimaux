import "./header.scss";
import Burger from "../Burger/Burger";
import HeaderNav from "../HeaderNav/HeaderNav";
import { FaCircleUser, FaHeart, FaPowerOff } from "react-icons/fa6";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "../../redux/reducers/header.reducer";
import { updateScroll, updateWindowSize } from "../../redux/reducers/window.reducer";
import { APP_ROUTES } from "../../constants/route.const";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../utils/user.utils";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isMobileMenuOpen } = useSelector(state => state.headerReducer);
  const { width, scrollY } = useSelector(state => state.windowReducer);
  const { isAuth } = useSelector(state => state.userReducer);

  useEffect(() => {
    const handleResize = () => dispatch(updateWindowSize({ width: window.innerWidth }));
    const handleScroll = () => dispatch(updateScroll({ scrollY: window.scrollY }));

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);


  const handleBurgerClick = () => {
    dispatch(toggleMobileMenu(!isMobileMenuOpen));
  }

  const handleSignOut = () => {
    signOut(dispatch);
    if (isAuth) {
      navigate(APP_ROUTES.SIGN_IN, { replace: true });
    }
  }

  useEffect(() => {
    if (isAuth) {
      navigate(APP_ROUTES.SIGN_IN, { replace: true });
    }
  }, []);

  return (
    <>
      <header id="topPage" className="header">
        <div className="header__wrapper">
          <div className="header__img">
            <Link to={APP_ROUTES.HOME}>
              <img src={width < 900 ? "/logo-lm-mobile.svg" : "/logo-lm.svg"} alt="Logo ASOS'nimaux" />
            </Link>
          </div>
          <div className="header__icons">
            <div className="icon__wrapper">
              <Link to={APP_ROUTES.FAVORITES}>
                <FaHeart className="icon heart" color="var(--secondary)" />
              </Link>
            </div>
            <div className="icon__wrapper">
              {isAuth ?
                <>
                  <Link to={APP_ROUTES.ACCOUNT}>
                    <FaCircleUser className="icon" color="var(--primary)" />
                  </Link>
                  <FaPowerOff className="icon" color="var(--primary)" onClick={handleSignOut} />
                </>
                :
                <Link to={APP_ROUTES.SIGN_IN}>
                  <FaCircleUser className="icon" color="var(--primary)" />
                </Link>
              }
            </div>
            {width < 767 && <Burger toggleClass={isMobileMenuOpen ? " open" : ""} handleBurger={handleBurgerClick} />}
            <HeaderNav toggleClass={isMobileMenuOpen ? "nav-open" : ""} />
            <span className={`header__background${scrollY > 1 ? ' shadow' : ''}`}></span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;