import { Prod } from "./Prod";
export const getUniqueValues = (
  data: Prod[],
  key: keyof Prod,
  disabledValues?: Array<string>
) => {
  const obj = [...new Set(data.map((item) => item[key]))].map((value) =>
    disabledValues && !disabledValues.includes(value)
      ? {
          text: value,
          value,
          disabled: true,
        }
      : {
          text: value,
          value,
        }
  );
  obj.sort((a, b) => a.text.localeCompare(b.text));

  const enabledItems = obj.filter((item) => !item.disabled);
  const disabledItems = obj.filter((item) => item.disabled);

  return [...enabledItems, ...disabledItems];
};
