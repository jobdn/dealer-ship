export interface Car {
  id: number;
  vehicle_brand: string;
  brand_model: string;
  vin: string;
  year_of_manufacture: string;
  color: string;
  price: string;
  creatorId: number;
  editorId: number;
}

export const humanReadableFields = {
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

export type CarFieldName = keyof Car;
export type CarFieldValue = any;
export type CarField = [CarFieldName, CarFieldValue];

export const isCarFieldName = (field: string): field is CarFieldName => {
  return (
    field === "id" ||
    field === "vehicle_brand" ||
    field === "brand_model" ||
    field === "vin" ||
    field === "year_of_manufacture" ||
    field === "color" ||
    field === "price" ||
    field === "creatorId" ||
    field === "editorId"
  );
};
