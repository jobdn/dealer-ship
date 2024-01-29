import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Car } from "../../shared/types";
import styles from "./CarsHeader.module.css";
import { calculateMaxCarId } from "./helper/calculateMaxCarId";

type CarsHeaderProps = {
  cars: Car[];
};

export const CarsHeader = (props: CarsHeaderProps) => {
  const { cars } = props;
  const navigate = useNavigate();

  const handleAdd = useCallback(async () => {
    const maxCarId = calculateMaxCarId(cars) + 1;
    navigate(`/add-car/${maxCarId}`);
  }, [navigate, cars]);

  return (
    <div className={styles.wrapper}>
      <h3>Список Автомобилей</h3>
      <button onClick={handleAdd}>Добавить автомобиль</button>
    </div>
  );
};
