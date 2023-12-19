import { CarFieldName } from "../types/Car";

const humanReadableFields = {
  id: "Номер в салоне",
  vehicle_brand: "Марка",
  brand_model: "Модель бренда",
  vin: "ВИН",
  year_of_manufacture: "Год выпуска",
  color: "Цвет",
  price: "Цена",
  creatorId: "Номер создателя",
  editorId: "Номер редактора",
};

export function mapCarFieldsToHumanReadable(fieldName: CarFieldName) {
  return humanReadableFields[fieldName];
}
