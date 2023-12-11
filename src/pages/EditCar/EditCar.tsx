import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Car } from "../../shared/types";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import { TOKEN } from "../../shared/constants";
import styles from "./EditCar.module.css";

export interface FetchCarParams {
  id: string;
}

export type CarFieldName = keyof Car;
export type CarFieldValue = any;
export type CarField = [CarFieldName, CarFieldValue];

const humanReadableFields = {
  id: "Номер в салоне",
  vehicle_brand: "Марка",
  brand_model: "Модель бренда",
  vin: "ВИН",
  year_of_manufacture: "Год выпуска",
  color: "Цвет",
  price: "Цена",
  creatorId: "Номер создателя",
  editorId: "Номер изменятеля",
};

export function mapCarFieldsToHumanReadable(fieldName: CarFieldName) {
  return humanReadableFields[fieldName];
}

export const EditCar = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car>();
  const [error, setError] = useState<Error>();
  const [token] = useLocalStorage<string>(TOKEN);
  const [carChanges, setCarChanges] = useState<Partial<Car>>({});
  const [loading, setLoading] = useState(false);

  const fetchCar = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/dealer-ship/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("При получении данных об автомобиле произошла ошибка");
      }

      return response.json();
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchCar(id)
        .then((car) => {
          setCar(car);
        })
        .catch((error) => {
          setError(error);
          console.log("Ошибка при получении автомобиля", error.message);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/dealer-ship/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carChanges),
        }
      );

      if (!response.ok) {
        throw new Error("При изменении автомобиля произошла ошибка");
      }

      return response.json();
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [carChanges, id, token]);

  const handleFieldChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fieldName = e.target.id;

    // @ts-ignore
    setCarChanges((prevChanges) => {
      if (prevChanges) {
        return {
          ...prevChanges,
          [fieldName]: e.target.value,
        };
      }
    });

    setCar((prevCar) => {
      if (prevCar) {
        return {
          ...prevCar,
          [fieldName]: e.target.value,
        };
      }
    });
  };

  const editIsDisabled = useMemo(
    () => Object.entries(carChanges).length === 0 || loading,
    [carChanges]
  );

  if (error) return <h2>{error?.message}</h2>;
  if (loading && !car) return <h2>Загрузка...</h2>;

  return (
    <div className={styles.page}>
      {Object.entries(car || []).map((carField: any) => {
        const [carFieldName, carFieldValue] = carField;

        return (
          <div className={styles.editRow} key={carFieldName}>
            <label htmlFor="">
              {mapCarFieldsToHumanReadable(carFieldName)}
              <input
                id={carFieldName}
                type="text"
                className={styles.editInput}
                value={carFieldValue}
                onChange={handleFieldChange}
              />
            </label>
          </div>
        );
      })}

      <button
        className={styles.editBtn}
        onClick={handleEditSubmit}
        disabled={editIsDisabled}
      >
        {loading ? "Загрузка..." : "Редактировать автомобиль"}
      </button>
    </div>
  );
};
