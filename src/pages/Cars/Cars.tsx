import { useCallback, useEffect, useState } from "react";
import styles from "./Cars.module.css";
import { Car } from "../../shared/types";
import { CarTable } from "../../components/CarTable";

// Сначала нужно залогиниться, чтобы получить список авто
const token = "";

async function fetchCars(): Promise<Car[] | undefined> {
  try {
    const response = await fetch("http://localhost:3001/api/dealer-ship", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    const cars = (await response.json()) as Car[];

    return cars;
  } catch (error) {
    console.log("Man it's error: ", error);
  }
}

export const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetchCars().then((cars) => {
      if (cars) {
        setCars(cars);
      }
    });
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      await fetch(`http://localhost:3001/api/dealer-ship/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const newCars = cars.filter((car) => {
        return car.id !== id;
      });

      setCars(newCars);
    },
    [cars]
  );

  // const handleAdd = useCallback(async () => {});

  return (
    <div className={styles.carList}>
      {cars.length ? (
        <>
          <div className={styles.wrapper}>
            <h3>Список Автомобилей</h3>
            <button>Добавить автомобиль</button>
          </div>
          <CarTable cars={cars} onDelete={handleDelete} />
        </>
      ) : (
        <h3>В центре нет авто. Обратитесь позже</h3>
      )}
    </div>
  );
};
