import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";

export const Layout = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <div>
        <Header />
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
