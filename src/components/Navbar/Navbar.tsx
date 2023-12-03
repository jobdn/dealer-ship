import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
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
  );
};
