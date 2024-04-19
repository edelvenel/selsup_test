import React from "react";
import css from "./App.module.scss";
import { clone } from "ramda";

const STORAGE_KEY_CURRENT = "CURRENT_MODEL";

enum Color {
  black = "black",
  white = "white",
  gray = "gray",
  red = "red",
  green = "green",
  blue = "blue",
  yellow = "yellow",
  purple = "purple",
  pink = "pink",
}

enum ParamType {
  string = "string",
  number = "number",
  gender = "gender",
  style = "style",
}

enum StyleList {
  classic = "classic",
  official = "official",
}

enum GenderList {
  male = "male",
  female = "female",
  unisex = "unisex",
}

const params: IParam[] = [
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

const defaultModel: IModel = {
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

const styles: IStyle[] = [
  {
    key: StyleList.classic,
    value: "Классический",
  },
  {
    key: StyleList.official,
    value: "Официальный",
  },
];

const genders: IGender[] = [
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

interface IParam {
  id: number;
  name: string;
  type: ParamType;
}

type IString = string;
type INumber = number;

interface IList {
  key: IListType;
}

type IListType = StyleList | GenderList;
type IParamType = IString | INumber | IList;

interface IParamValue {
  paramId: number;
  value: IParamType;
}

interface IModel {
  paramValues: IParamValue[];
  colors: Color[];
}

interface IStyle {
  key: StyleList;
  value: string;
}

interface IGender {
  key: GenderList;
  value: string;
}

const getData = (): IModel => {
  const currentModel: IModel = JSON.parse(
    localStorage.getItem(STORAGE_KEY_CURRENT) ?? JSON.stringify(defaultModel)
  );

  return currentModel;
};

function App() {
  const [model, setModel] = React.useState<IModel>(getData());

  const onChange = React.useCallback(
    (paramId: number, value: IParamType) => {
      const newModel: IModel = clone(model);

      const newParam = newModel.paramValues.find(
        (param) => param.paramId === paramId
      );

      if (newParam) {
        newParam.value = value;
      } else {
        newModel.paramValues.push({
          paramId,
          value,
        });
      }

      setModel(newModel);
    },
    [model]
  );

  const saveData = React.useCallback(() => {
    localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(model));
  }, [model]);

  React.useEffect(() => {
    saveData();
  }, [saveData]);

  return (
    <div className={css.app}>
      <div className={css.model}>
        <div className={css.colors}>
          <div className={css.colorsLabel}>Цвета</div>
          <div className={css.colorPanels}>
            {model.colors.map((color, idx) => (
              <div
                key={idx}
                className={css.color}
                style={{
                  backgroundColor: color.toString(),
                }}
              />
            ))}
          </div>
        </div>
        <ParamEditor params={params} model={model} onChange={onChange} />
      </div>
    </div>
  );
}

interface IParamEditorProps {
  params: IParam[];
  model: IModel;
  onChange: (paramId: number, value: IParamType) => void;
}

function ParamEditor({ params, model, onChange }: IParamEditorProps) {
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

interface IParamProps {
  paramData: IParam;
  paramValue?: IParamValue;
  onChange: (value: IParamType) => void;
}

function Param({ paramData, paramValue, onChange }: IParamProps) {
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

interface IParamInputProps {
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

export default App;
