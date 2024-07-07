import { Prod } from "./Prod";
import { setFilteredProds } from "../store/app";
export const sortProducts = (dispatch:any,products: Prod[], order: string) => {
    let sortedProds = [...products];
    if (order === "priceAsc") {
      sortedProds.sort((a, b) => Number(a.fiyat) - Number(b.fiyat));
    } else if (order === "priceDesc") {
      sortedProds.sort((a, b) => Number(b.fiyat) - Number(a.fiyat));
    }
    dispatch(setFilteredProds(sortedProds));
  };
