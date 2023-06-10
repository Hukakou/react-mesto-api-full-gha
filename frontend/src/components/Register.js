import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ applyForRegistration, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    applyForRegistration(email, password);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <div className="user">
        <form
          className="user__form"
          method="POST"
          name="userRegistration"
          onSubmit={handleSubmit}
        >
          <h1 className="user__title">Регистрация</h1>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="user__input user__input-email"
            required
            value={email}
            onChange={handleEmailChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            className="user__input user__input-pasword"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="user__button">Зарегистрироваться</button>
          <p className="user__footnote">
            Уже зарегистрированы?{" "}
            <Link className="user__link" to="/sign-in">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
