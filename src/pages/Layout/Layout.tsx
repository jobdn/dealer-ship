import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { ToastContainer } from "react-toastify";

export const Layout = () => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <div>
        <ToastContainer hideProgressBar={true} />
        <Header />
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
