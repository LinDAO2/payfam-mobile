
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransactionCurrency } from "@types/transactions-types";


export interface IGlobalState {
  pageTitle: string;
  currency: ITransactionCurrency
}

export interface IShowGlobal extends IGlobalState {}

const initialState: IGlobalState = {
  pageTitle: "",
  currency: "NGN",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
    setCurrency: (state, action: PayloadAction<ITransactionCurrency>) => {
      state.currency = action.payload;
    },
  },
});

export const globalName = globalSlice.name;
export const globalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
