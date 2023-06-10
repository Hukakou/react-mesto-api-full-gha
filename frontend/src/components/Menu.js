import { useContext } from "react";
import AuthUserContext from "../contexts/AuthUserContext";
import { useLocation, useNavigate } from "react-router-dom";

function Menu({ onLogout, ...props }) {
  const { authUser } = useContext(AuthUserContext);
  const { loggedIn } = useContext(AuthUserContext);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="user__menu">
      <span className="user__menu-email">{authUser.email}</span>
      <>
        {/* Если Пользователь вошел */}
        {pathname === "/" && loggedIn && (
          <button className="user__menu-btn" type="button" onClick={onLogout}>
            Выйти
          </button>
        )}

        {/* Если пользователь хочет войти */}
        {pathname === "/sign-up" && !loggedIn && (
          <button
            className="user__menu-btn"
            type="button"
            onClick={() => navigate("/sign-in")}
          >
            Войти
          </button>
        )}

        {/* Если пользователь хочет зарегистрироваться */}
        {pathname === "/sign-in" && !loggedIn && (
          <button
            className="user__menu-btn"
            type="button"
            onClick={() => navigate("/sign-up")}
          >
            Регистрация
          </button>
        )}
      </>
    </div>
  );
}

export default Menu;
