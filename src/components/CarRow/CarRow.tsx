import { NavLink } from "react-router-dom";
import { Car } from "../../shared/types";
import DeleteImg from "./assets/delete.png";

export interface CarItemProps {
  car: Car;
  onDelete: (id: number) => void;
}

export const CarRow = (props: CarItemProps) => {
  const { car, onDelete } = props;

  const handleDelete = () => {
    onDelete(car.id);
  };

  return (
    <tr>
      <td>
        <NavLink to={`/cars/${car.id}`}>{car.id}</NavLink>
      </td>
      <td>{car.vehicle_brand}</td>
      <td>{car.brand_model}</td>
      <td>{car.vin}</td>
      <td>{car.year_of_manufacture}</td>
      <td>{car.color}</td>
      <td>{car.price}</td>
      <td>{car.creatorId}</td>
      <td>{car.editorId}</td>
      <td>
        <button onClick={handleDelete}>
          <img src={DeleteImg} alt="Delete icon" />
        </button>
      </td>
    </tr>
  );
};
