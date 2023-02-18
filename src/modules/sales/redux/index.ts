import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ISales } from "../types";
import salesService from "../services";
import { showMessage } from "../../shared/redux/message";

interface ISalesState {
  loadingSales: boolean;
  sales: ISales[];
}

const initialState: ISalesState = {
  loadingSales: false,
  sales: [],
};

export const getSales = createAsyncThunk(
  "get/sales",
  async (input: any, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await salesService.getItems<ISales[]>(input);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      dispatch(
        showMessage({ severity: "error", summary: error.response.data.message })
      );
      return rejectWithValue([]);
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
  },
});

export const salesReducer = salesSlice.reducer;
export const salesSelector = (state: RootState): ISalesState => state.sales;
export default salesReducer;
