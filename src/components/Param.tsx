import {
  IList,
  IListType,
  INumber,
  IParam,
  IParamType,
  IParamValue,
  IString,
} from "../common/types";
import css from "../App.module.scss";
import { GenderList, ParamType, StyleList } from "../common/enums";
import { genders, styles } from "../common/data";

export interface IParamProps {
  paramData: IParam;
  paramValue?: IParamValue;
  onChange: (value: IParamType) => void;
}

export function Param({ paramData, paramValue, onChange }: IParamProps) {
  return (
    <div className={css.paramForm}>
      <div className={css.paramLabel}>{paramData.name}</div>
      <div className={css.paramInput}>
        <ParamInput
          type={paramData.type}
          paramValue={paramValue}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export interface IParamInputProps {
  type: ParamType;
  paramValue?: IParamValue;
  onChange: (value: IParamType) => void;
}

function ParamInput({ type, paramValue, onChange }: IParamInputProps) {
  const handleOnChange = (value: IListType) => {
    const newParam: IParamType = { key: value };
    onChange(newParam);
  };

  switch (type) {
    case ParamType.string: {
      const value = paramValue?.value as IString;
      return (
        <input
          type="string"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }

    case ParamType.number: {
      const value = paramValue?.value as INumber;
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    }

    case ParamType.gender: {
      const value = paramValue?.value as IList;

      return (
        <select
          id={type}
          defaultValue={
            genders.find((gender) => gender.key === value?.key)?.key
          }
          onChange={(e) => handleOnChange(e.target.value as IListType)}
        >
          {Object.keys(GenderList).map((key, idx) => (
            <option key={idx} value={key}>
              {genders.find((gender) => gender.key === key)?.value}
            </option>
          ))}
        </select>
      );
    }

    case ParamType.style: {
      const value = paramValue?.value as IList;

      return (
        <select
          id={type}
          defaultValue={styles.find((style) => style.key === value?.key)?.key}
          onChange={(e) => handleOnChange(e.target.value as IListType)}
        >
          {Object.keys(StyleList).map((key, idx) => (
            <option key={idx} value={key}>
              {styles.find((style) => style.key === key)?.value}
            </option>
          ))}
        </select>
      );
    }
  }
}
