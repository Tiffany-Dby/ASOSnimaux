import Burger from "../Burger/Burger";
import HeaderNav from "../HeaderNav/HeaderNav";
import { FaCircleUser, FaHeart, FaPowerOff } from "react-icons/fa6";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "../../redux/reducers/header.reducer";
import { updateWindowSize } from "../../redux/reducers/window.reducer";
import "./header.scss";
import { APP_ROUTES } from "../../constants/route.const";
import { clearStorage, getFromStorage } from "../../utils/storage.utils";

const Header = () => {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector(state => state.headerReducer);
  const { width } = useSelector(state => state.windowReducer);
  const token = getFromStorage("token");

  useEffect(() => {
    const handleResize = () => {
      dispatch(updateWindowSize({ width: window.innerWidth }))
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }

  }, [dispatch])

  const handleBurgerClick = () => {
    dispatch(toggleMobileMenu(!isMobileMenuOpen));
  }

  return (
    <>
      <header id="topPage" className="header">
        <div className="header__wrapper">
          <div className="header__img">
            <a href={APP_ROUTES.HOME}>
              <img src="/logo-lm-mobile.svg" alt="Logo ASOS'nimaux" />
            </a>
          </div>
          <div className="header__icons">
            <div className="icon__wrapper">
              <a href="">
                <FaHeart className="icon heart" color="var(--secondary)" />
              </a>
            </div>
            <div className="icon__wrapper">
              {token ?
                <>
                  <a href={APP_ROUTES.ACCOUNT}>
                    <FaCircleUser className="icon" color="var(--primary)" />
                  </a>
                  <FaPowerOff className="icon" color="var(--primary)" onClick={clearStorage} />
                </>
                :
                <a href={APP_ROUTES.SIGN_IN}>
                  <FaCircleUser className="icon" color="var(--primary)" />
                </a>
              }
            </div>
            {width < 767 && <Burger toggleClass={isMobileMenuOpen ? " open" : ""} handleBurger={handleBurgerClick} />}
            <HeaderNav toggleClass={isMobileMenuOpen ? "nav-open" : ""} />
            <span className="header__background"></span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;