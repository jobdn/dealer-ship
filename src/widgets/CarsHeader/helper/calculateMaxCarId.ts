import { Car } from "../../../shared/types";

export const calculateMaxCarId = (cars: Car[]): number => {
  if (!cars.length) return 0;

  const carIds = cars.map((c) => c.id);

  return Math.max(...carIds);
};
