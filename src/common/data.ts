import { ParamType, Color, StyleList, GenderList } from "./enums";
import { IParam, IModel, IGender, IStyle } from "./types";

export const STORAGE_KEY_CURRENT = "CURRENT_MODEL";

export const params: IParam[] = [
  {
    id: 1,
    name: "Назначение",
    type: ParamType.string,
  },
  {
    id: 2,
    name: "Длина",
    type: ParamType.string,
  },
];

export const defaultModel: IModel = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
  colors: [
    Color.white,
    Color.gray,
    Color.pink,
    Color.green,
    Color.blue,
    Color.purple,
    Color.yellow,
  ],
};

export const styles: IStyle[] = [
  {
    key: StyleList.classic,
    value: "Классический",
  },
  {
    key: StyleList.official,
    value: "Официальный",
  },
];

export const genders: IGender[] = [
  {
    key: GenderList.male,
    value: "Мужской",
  },
  {
    key: GenderList.female,
    value: "Женский",
  },
  {
    key: GenderList.unisex,
    value: "Унисекс",
  },
];
