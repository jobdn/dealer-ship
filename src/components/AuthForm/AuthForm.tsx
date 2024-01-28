import React, { useContext, useEffect } from "react";
import { useState } from "react";
import styles from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/UI/AuthProvider";
import { User } from "../../shared/types";

type FormState = "login" | "register";

export interface AuthBaseResponse {
  token: string;
}

export interface LoginResponse extends AuthBaseResponse {
  email: string;
}

export interface RegisterResponse extends AuthBaseResponse {
  user: User;
}

type AuthResponse = LoginResponse | RegisterResponse;

function isLoginResponse(res: AuthResponse): res is LoginResponse {
  return (res as LoginResponse).email !== undefined;
}

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [formState, setFormState] = useState<FormState>("login");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleChangeForm = () => {
    setFormState((currentState) =>
      currentState === "login" ? "register" : "login"
    );
  };

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value) {
      setEmail(e.target.value);
      setEmailError("Почта не должна быть пустой");
      return;
    }

    setEmailError("");
    setEmail(e.target.value);
  };

  const passwordHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value) {
      setPassword("");
      setPasswordError("Пароль не может быть пустым");
      return;
    }

    setPasswordError("");
    setPassword(e.target.value);
  };

  const emailIsValid = () => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return re.test(String(email).toLowerCase());
  };

  const handleAuth: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("Пароль должен быть длинее 6 символов");
      return;
    }

    if (!emailIsValid) {
      setEmailError("Некоректный емейл");
      return;
    }

    try {
      const path = formState === "login" ? "auth/login" : "user";
      const url = `http://localhost:3001/api/${path}`;
      const authRes = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!authRes.ok) {
        throw new Error();
      }

      const authData = (await authRes.json()) as AuthResponse;

      if (authContext) {
        if (isLoginResponse(authData)) {
          authContext.login({ email: authData.email, isAuth: true });
        } else {
          authContext.login({ email: authData.user.email, isAuth: true });
        }

        navigate("/");
      }
    } catch (error) {
      if (formState === "register") {
        setEmailError("Пользователь с такой почтой уже существует");
        return;
      }

      setEmailError("Неправильный логин или пароль");
    }
  };

  return (
    <div className={styles.container}>
      <form name="form" method="post" action="#">
        <fieldset className={styles.formContainer}>
          <div className={styles.title}>
            {formState === "login" ? "Вход" : "Регистрация"}
          </div>
          <input
            onChange={(e) => emailHandler(e)}
            value={email}
            className={styles.input}
            type="text"
            id="email"
            name="email"
            placeholder="Email Address"
          />
          {emailError && (
            <span className={styles.errorMessage}>{emailError}</span>
          )}
          <input
            onChange={(e) => passwordHandler(e)}
            value={password}
            className={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          {passwordError && (
            <span className={styles.errorMessage}>{passwordError}</span>
          )}

          <button
            disabled={!formValid}
            onClick={handleAuth}
            className={styles.button}
            type="submit"
          >
            {formState === "login" ? "Войти" : "Зарегистрироваться"}
          </button>

          <span className={styles.formToggler} onClick={handleChangeForm}>
            {formState === "login"
              ? "Перейти на форму регистрации"
              : "Перейти на форму входа"}
          </span>
        </fieldset>
      </form>
    </div>
  );
};
export { AuthForm };
