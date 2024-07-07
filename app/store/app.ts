import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Prod } from "../utils/Prod";
const initialState = {
  filteredProds: [] as Prod[],
  order: 'default'
};


const assetsSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFilteredProds: (state, action: PayloadAction<any>) => {
      state.filteredProds = action.payload;
    },
    setOrder: (state, action: PayloadAction<any>) => {
        state.order = action.payload;
      },
  },
});

export const { setFilteredProds,setOrder } = assetsSlice.actions;
export default assetsSlice.reducer;