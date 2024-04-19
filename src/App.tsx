import React from "react";
import css from "./App.module.scss";
import { IModel, IParamType } from "./common/types";
import { ParamEditor } from "./components/ParamEditor";
import { clone } from "ramda";
import { STORAGE_KEY_CURRENT, defaultModel, params } from "./common/data";

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

export default App;
