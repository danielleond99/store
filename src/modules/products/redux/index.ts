import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import productService from "../services";
import { IProduct } from "../types";
import { showMessage } from "../../shared/redux/message";

interface IProductState {
  loadingProducts: boolean;
  products: IProduct[];
}

const initialState: IProductState = {
  loadingProducts: false,
  products: [],
};

export const getProducts = createAsyncThunk(
  "get/products",
  async (input: any, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await productService.getItems<IProduct[]>(input);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      dispatch(
        showMessage({ severity: "error", summary: error.response.data.message })
      );
      return rejectWithValue([]);
    }
  }
);
export const getProductById = createAsyncThunk(
  "get/product",
  async (
    productId: string,
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await productService.getItemById<IProduct>(productId);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      dispatch(
        showMessage({ severity: "error", summary: error.response.data.message })
      );
      return rejectWithValue(undefined);
    }
  }
);
export const createProduct = createAsyncThunk(
  "post/products",
  async (input: any, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await productService.createItem<IProduct, IProduct>(
        input
      );
      dispatch(
        showMessage({
          severity: "success",
          summary: "Product successfully registered",
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
export const deleteProduct = createAsyncThunk(
  "delete/product",
  async (
    productId: string,
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await productService.delete<IProduct>(productId);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      dispatch(
        showMessage({ severity: "error", summary: error.response.data.message })
      );
      return rejectWithValue(undefined);
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
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loadingProducts = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loadingProducts = false;
      state.products = [];
    });
    builder.addCase(createProduct.pending, (state) => {
      state.loadingProducts = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loadingProducts = false;
      state.products.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.loadingProducts = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loadingProducts = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loadingProducts = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.loadingProducts = false;
    });
  },
});

export const productsReducer = productsSlice.reducer;
export const productsSelector = (state: RootState): IProductState =>
  state.products;
export default productsReducer;
