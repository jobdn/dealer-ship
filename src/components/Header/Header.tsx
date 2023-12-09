import { useAuth } from "../../shared/hooks/useAuth";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const auth = useAuth();

  const handleLogout = () => {
    if (auth) {
      auth.logout();
    }
  };

  console.log("auth: ", auth);

  return (
    <header>
      <h1>DealerShip</h1>
      {auth?.user?.isAuth ? (
        <div>
          <span className={styles.userEmail}>{auth?.user.email}</span>

          <button onClick={handleLogout}>Выход</button>
        </div>
      ) : (
        <ul className={styles.headerButtons}>
          <li>
            <NavLink to={"/auth"}>
              <button>Вход</button>
            </NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};
