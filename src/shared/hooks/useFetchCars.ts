import { useCallback, useEffect, useState } from "react";
import { Car } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { TOKEN } from "../constants";

export const useFetchCars = (): [Car[], boolean, string] => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [token] = useLocalStorage(TOKEN);

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
      setError((error as Error).message);
    }
  }, [token]);

  return [cars, isLoading, error];
};
