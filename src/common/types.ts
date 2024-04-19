import { Color, GenderList, ParamType, StyleList } from "./enums";

export interface IParam {
  id: number;
  name: string;
  type: ParamType;
}

export type IString = string;

export type INumber = number;

export interface IList {
  key: IListType;
}

export type IListType = StyleList | GenderList;

export type IParamType = IString | INumber | IList;

export interface IParamValue {
  paramId: number;
  value: IParamType;
}

export interface IModel {
  paramValues: IParamValue[];
  colors: Color[];
}

export interface IStyle {
  key: StyleList;
  value: string;
}

export interface IGender {
  key: GenderList;
  value: string;
}
