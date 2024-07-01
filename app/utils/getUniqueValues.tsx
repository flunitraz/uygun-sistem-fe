import { Prod } from "./Prod";
export const getUniqueValues = (data: Prod[], key: keyof Prod) => {
    return [...new Set(data.map(item => item[key]))].map(value => ({ text: value, value }));
  };