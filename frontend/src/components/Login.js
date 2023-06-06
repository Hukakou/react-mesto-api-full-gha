import React, { useState } from "react";

function Login({ onLogin, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="user">
      <form
        className="user__form"
        method="POST"
        name="userAuthorization"
        onSubmit={handleSubmit}
      >
        <h1 className="user__title">Вход</h1>
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
        <button className="user__button">Войти</button>
      </form>
    </div>
  );
}
export default Login;
