import { memo } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

export const Navbar = memo(function NavbarMemo() {
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
});
