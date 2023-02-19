import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ISale } from "../types";
import salesService from "../services";
import { showMessage } from "../../shared/redux/message";

interface ISaleState {
  loadingSales: boolean;
  sales: ISale[];
}

const initialState: ISaleState = {
  loadingSales: false,
  sales: [],
};

export const getSales = createAsyncThunk(
  "get/sales",
  async (input: any, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await salesService.getItems<ISale[]>(input);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      dispatch(
        showMessage({ severity: "error", summary: error.response.data.message })
      );
      return rejectWithValue([]);
    }
  }
);
export const getSaleById = createAsyncThunk(
  "get/sale",
  async (
    saleId: string,
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await salesService.getItemById<ISale>(saleId);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      dispatch(
        showMessage({ severity: "error", summary: error.response.data.message })
      );
      return rejectWithValue(undefined);
    }
  }
);
export const createSale = createAsyncThunk(
  "post/sales",
  async (input: any, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await salesService.createItem<ISale, ISale>(
        input
      );
      dispatch(
        showMessage({
          severity: "success",
          summary: "Sale successfully registered",
        })
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      dispatch(
        showMessage({ severity: "error", summary: error.response.data.message })
      );
      return rejectWithValue(undefined);
    }
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSales.pending, (state) => {
      state.loadingSales = true;
    });
    builder.addCase(getSales.fulfilled, (state, payload) => {
      state.loadingSales = false;
      state.sales = payload.payload;
    });
    builder.addCase(getSales.rejected, (state) => {
      state.loadingSales = false;
      state.sales = [];
    });
    builder.addCase(createSale.pending, (state) => {
      state.loadingSales = true;
    });
    builder.addCase(createSale.fulfilled, (state, payload) => {
      state.loadingSales = false;
      state.sales.push(payload.payload);
    });
    builder.addCase(createSale.rejected, (state) => {
      state.loadingSales = false;
    });
  },
});

export const salesReducer = salesSlice.reducer;
export const salesSelector = (state: RootState): ISaleState => state.sales;
export default salesReducer;
