import headerImg from "../../src/images/header-img.svg";
import Menu from "./Menu";

function Header({ onLogout, ...props }) {
  return (
    <header className="header">
      <img src={headerImg} alt="Логотип Место" className="header__logo" />
      <Menu onLogout={onLogout} />
    </header>
  );
}

export default Header;
