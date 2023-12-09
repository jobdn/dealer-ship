import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Navbar } from "../../components/Navbar";

export const Layout = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />

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
