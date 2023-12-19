import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Cars.module.css";
import { Car } from "../../shared/types";
import { CarTable } from "../../components/CarTable";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import { TOKEN } from "../../shared/constants";
import { useNavigate } from "react-router-dom";

const calculateMaxCarId = (cars: Car[]): number => {
  const carIds = cars.map((c) => c.id);

  return Math.max(...carIds);
};

export const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [token] = useLocalStorage(TOKEN);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchCars()
      .then((cars) => {
        if (cars) {
          setCars(cars);
        }
      })
      .finally(() => {
        setIsLoading(false);
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

  const fetchCars = useCallback(async (): Promise<Car[] | undefined> => {
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
  }, []);

  const handleAdd = useCallback(async () => {
    const maxCarId = calculateMaxCarId(cars) + 1;
    navigate(`/add-car/${maxCarId}`);
  }, [navigate, cars]);

  const content = useMemo(() => {
    if (isLoading) return <h3>Загрзка автомобилей</h3>;

    if (!cars.length) return <h3>В центре нет авто. Обратитесь позже</h3>;

    return (
      <>
        <div className={styles.wrapper}>
          <h3>Список Автомобилей</h3>
          <button onClick={handleAdd}>Добавить автомобиль</button>
        </div>
        <CarTable cars={cars} onDelete={handleDelete} />
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cars, isLoading]);

  return <div>{content}</div>;
};
