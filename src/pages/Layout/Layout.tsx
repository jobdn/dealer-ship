import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { NavLink } from "react-router-dom";

export const Layout = () => {
  return (
    <div className={styles.pageWrapper}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink to="/cars">Автомобили</NavLink>
          </li>
          <li>
            <NavLink to="/">Домой</NavLink>
          </li>
        </ul>
      </nav>

      <div>
        <header>
          <h1>DealerShip</h1>
          <ul className={styles.headerButtons}>
            <li>
              <button>Вход</button>
            </li>
            <li>
              <button>Регистрация</button>
            </li>
          </ul>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
