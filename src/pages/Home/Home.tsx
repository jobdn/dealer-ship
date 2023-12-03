import DealerShip from "./assets/dealerShip.webp";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.heroWrapper}>
      <img src={DealerShip} alt="DealerShip" className={styles.hero} />
    </div>
  );
};
