import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import productService from "../services";
import { IProducts } from "../types";
import { showMessage } from "../../shared/redux/message";

interface IProductsState {
  loadingProducts: boolean;
  products: IProducts[];
}

const initialState: IProductsState = {
  loadingProducts: false,
  products: [],
};

export const getProducts = createAsyncThunk(
  "get/products",
  async (input: any, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await productService.getItems<IProducts[]>(input);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      dispatch(
        showMessage({ severity: "error", summary: error.response.data.message })
      );
      return rejectWithValue([]);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loadingProducts = true;
    });
    builder.addCase(getProducts.fulfilled, (state, payload) => {
      state.loadingProducts = false;
      state.products = payload.payload;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loadingProducts = false;
      state.products = [];
    });
  },
});

export const productsReducer = productsSlice.reducer;
export const productsSelector = (state: RootState): IProductsState =>
  state.products;
export default productsReducer;
