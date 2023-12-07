import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  });

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некоректный email");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError("Пaроль должен быть длинее 3 и меньше 8");
      if (!e.target.value) {
        setPasswordError("Пароль не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };
  return (
    <div className="container">
      <form name="form" method="post" action="#">
        <fieldset className="form-container">
          <div className="title">Регистрация</div>
          <input
            onChange={(e) => emailHandler(e)}
            value={email}
            onBlur={(e) => blurHandler(e)}
            className="input"
            type="text"
            id="email"
            name="email"
            placeholder="Email Address"
          />
          {emailDirty && emailError && (
            <span className="error-message">{emailError}</span>
          )}
          <input
            onChange={(e) => passwordHandler(e)}
            value={password}
            onBlur={(e) => blurHandler(e)}
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          {passwordDirty && passwordError && (
            <span className="error-message">{passwordError}</span>
          )}
          <button disabled={!formValid} className="button" type="submit">
            Зарегистрироваться
          </button>
          <nav>
            <Link to="/login">Войти если вы уже зарегистрированы</Link>
          </nav>
        </fieldset>
      </form>
    </div>
  );
};
export { AuthForm };
