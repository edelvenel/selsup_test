import { IModel, IParam, IParamType } from "../common/types";
import css from "../App.module.scss";
import { Param } from "./Param";
import React from "react";

export interface IParamEditorProps {
  params: IParam[];
  model: IModel;
  onChange: (paramId: number, value: IParamType) => void;
}

export function ParamEditor({ params, model, onChange }: IParamEditorProps) {
  const getParamData = React.useCallback(
    (param: IParam) =>
      model.paramValues.find((paramValue) => param.id === paramValue.paramId),
    [model]
  );

  return (
    <div className={css.paramEditor}>
      {params.map((param, idx) => (
        <div key={idx} className={css.param}>
          <Param
            paramData={param}
            paramValue={getParamData(param)}
            onChange={(value) => onChange(param.id, value)}
          />
        </div>
      ))}
    </div>
  );
}
