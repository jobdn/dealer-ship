import { Car } from "../../../shared/types";

export const calculateMaxCarId = (cars: Car[]): number => {
  const carIds = cars.map((c) => c.id);

  if (!carIds.length) return 0;

  return Math.max(...carIds);
};
