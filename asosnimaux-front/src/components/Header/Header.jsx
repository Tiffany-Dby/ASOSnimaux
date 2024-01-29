import Burger from "../Burger/Burger";
import HeaderNav from "../HeaderNav/HeaderNav";
import Icon from "../Icon/Icon";
import "./header.scss";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__img">
          <a href="#">
            <img src="/logo-lm-mobile.svg" alt="Logo ASOS'nimaux" />
          </a>
        </div>
        <div className="header__icons">
          <Icon imgUrl="/heart.svg" imgAlt="Icone en forme de coeur" iconStyle={""} />
          <Icon imgUrl="/user.svg" imgAlt="Icone en forme de coeur" iconStyle={""} />
          <Burger />
          {/* <HeaderNav /> */}
        </div>
      </header>
    </>
  );
}

export default Header;