import Burger from "../Burger/Burger";
import HeaderNav from "../HeaderNav/HeaderNav";
import { FaCircleUser, FaHeart, FaPowerOff } from "react-icons/fa6";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "../../redux/reducers/header.reducer";
import { updateScroll, updateWindowSize } from "../../redux/reducers/window.reducer";
import "./header.scss";
import { APP_ROUTES } from "../../constants/route.const";
import { clearStorage, getFromStorage } from "../../utils/storage.utils";
import { setUser, setisAuth } from "../../redux/reducers/user.reducer";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMobileMenuOpen } = useSelector(state => state.headerReducer);
  const { width, scrollY } = useSelector(state => state.windowReducer);
  const { isAuth } = useSelector(state => state.userReducer);

  useEffect(() => {
    const handleResize = () => dispatch(updateWindowSize({ width: window.innerWidth }));
    const handleScroll = () => dispatch(updateScroll({ scrollY: window.scrollY }));

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
    dispatch(setUser({ id: "", username: "", email: "", role: "" }));
    clearStorage();
    dispatch(setisAuth(false));
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
            <a href={APP_ROUTES.HOME}>
              <img src={width < 900 ? "/logo-lm-mobile.svg" : "/logo-lm.svg"} alt="Logo ASOS'nimaux" />
            </a>
          </div>
          <div className="header__icons">
            <div className="icon__wrapper">
              <a href="">
                <FaHeart className="icon heart" color="var(--secondary)" />
              </a>
            </div>
            <div className="icon__wrapper">
              {isAuth ?
                <>
                  <a href={APP_ROUTES.ACCOUNT}>
                    <FaCircleUser className="icon" color="var(--primary)" />
                  </a>
                  <FaPowerOff className="icon" color="var(--primary)" onClick={handleSignOut} />
                </>
                :
                <a href={APP_ROUTES.SIGN_IN}>
                  <FaCircleUser className="icon" color="var(--primary)" />
                </a>
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