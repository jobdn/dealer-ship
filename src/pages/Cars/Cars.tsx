import { useCallback } from "react";
import { CarTable } from "../../components/CarTable";
import { useFetchCars } from "../../shared/hooks/useFetchCars";
import { TOKEN } from "../../shared/constants";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import { CarsHeader } from "../../widgets/CarsHeader";

export const Cars = () => {
  const [cars, isLoading, error] = useFetchCars();
  const [token] = useLocalStorage(TOKEN);

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

      // setCars(newCars);
    },
    [cars]
  );

  if (isLoading) return <h3>Загрзка автомобилей</h3>;

  if (error) return error;

  return (
    <div>
      <CarsHeader cars={cars} />
      <CarTable cars={cars} onDelete={handleDelete} />
    </div>
  );
};
