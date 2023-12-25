import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Car } from "../../shared/types";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";
import { TOKEN, responseTranslateMap } from "../../shared/constants";
import styles from "./AddCar.module.css";
import { isErrorType } from "../../shared/types/Error";
import { mapCarFieldsToHumanReadable } from "../../shared/helpers/map-human-readable-fields";
import { isCarFieldName } from "../../shared/types/Car";

export interface FetchCarParams {
  id: string;
}

export type CreateCarFields = Omit<Car, "id" | "creatorId" | "editorId">;

const emptyCarFields: CreateCarFields = {
  brand_model: "",
  color: "",
  price: "",
  vehicle_brand: "",
  vin: "",
  year_of_manufacture: "",
};

export const AddCar = () => {
  const [carFields, setCarFields] = useState<CreateCarFields>(emptyCarFields);
  const [token] = useLocalStorage<string>(TOKEN);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createIsDisabled = useMemo(
    () => Object.entries(carFields).length === 0 || loading,
    []
  );

  const handleAddSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/dealer-ship`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carFields),
      });

      if (!response.ok) {
        const resBody = await response.json();

        let messageFromError: string;

        if (isErrorType(resBody)) {
          messageFromError = resBody.message[0];
        } else {
          messageFromError = resBody.message;
        }

        const reasonOfErrorField = messageFromError.split(" ")[0];

        let errorMessage;

        if (isCarFieldName(reasonOfErrorField)) {
          const fieldName = mapCarFieldsToHumanReadable(reasonOfErrorField);
          let restOfErrorMessage = messageFromError
            .split(" ")
            .slice(1)
            .join(" ");

          if (restOfErrorMessage in responseTranslateMap) {
            restOfErrorMessage = responseTranslateMap[restOfErrorMessage];
          }

          errorMessage = 'Поле "' + fieldName + '" ' + restOfErrorMessage;
        } else {
          errorMessage = messageFromError;
        }

        throw new Error(errorMessage);
      }

      toast("Автомобиль успешно добавлен");

      navigate("/cars");
    } catch (error) {
      toast((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [carFields, token]);

  const handleFieldsChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const fieldName = e.target.id;

    // @ts-ignore
    setCarFields((prevFieldsValue) => {
      let value = e.target.value;

      if (fieldName === "price") {
        if (Number.isNaN(+value)) {
          value = "0";
        }
      }

      if (prevFieldsValue) {
        return {
          ...prevFieldsValue,
          [fieldName]: value,
        };
      }
    });
  };

  if (loading) return <h2>Загрузка...</h2>;

  return (
    <div className={styles.page}>
      {Object.entries(carFields).map((carField: any) => {
        const [carFieldName, carFieldValue] = carField;

        return (
          <div className={styles.addRow} key={carFieldName}>
            <label htmlFor="">
              {mapCarFieldsToHumanReadable(carFieldName)}
              <input
                id={carFieldName}
                type="text"
                className={styles.addInput}
                value={carFieldValue}
                onChange={handleFieldsChange}
                required
              />
            </label>
          </div>
        );
      })}

      <button
        className={styles.addBtn}
        onClick={handleAddSubmit}
        disabled={createIsDisabled}
      >
        {loading ? "Загрузка..." : "Создать автомобиль"}
      </button>
    </div>
  );
};
