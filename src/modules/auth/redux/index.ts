import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import authServices from "../services";
import { IAuthRequest, IAuthResponse, IRegisterResponse } from "../types";
import { showMessage } from "../../shared/redux/message";
import { IRegisterRequest } from "../types/index";

interface IAuthState {
  logged: boolean;
  error: any;
  loading: boolean;
  user: IAuthResponse | null;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    input: IAuthRequest,
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await authServices.createItem<
        IAuthResponse,
        IAuthRequest
      >(input);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("logged", "true");
      return fulfillWithValue(response.data);
    } catch (err: any) {
      console.log({ err });

      dispatch(
        showMessage({ severity: "error", summary: err.response.data.message })
      );
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    input: IRegisterRequest,
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await authServices.post<
        IRegisterResponse,
        IRegisterRequest
      >("auth/register", input);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("logged", "true");
      return fulfillWithValue(response.data);
    } catch (err: any) {
      console.log({ err });

      dispatch(
        showMessage({ severity: "error", summary: err.response.data.message })
      );
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState: IAuthState = {
  logged: localStorage.getItem("logged") === "true",
  error: null,
  loading: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: IAuthState, payload: PayloadAction<IAuthResponse>) => {
      state.user = payload.payload;
    },
    logout: (state: IAuthState) => {
      localStorage.clear();
      state.logged = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state: IAuthState) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(
      loginUser.fulfilled,
      (state: IAuthState, payload: PayloadAction<any>) => {
        state.loading = false;
        state.user = payload.payload;
        state.logged = true;
      }
    );
    builder.addCase(
      loginUser.rejected,
      (state: IAuthState, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = null;
        state.logged = false;
        state.error = action.payload.message;
      }
    );
    builder.addCase(registerUser.pending, (state: IAuthState) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(
      registerUser.fulfilled,
      (state: IAuthState, payload: PayloadAction<any>) => {
        state.loading = false;
        state.user = payload.payload;
        state.logged = true;
      }
    );
    builder.addCase(
      registerUser.rejected,
      (state: IAuthState, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = null;
        state.logged = false;
        state.error = action.payload.message;
      }
    );
  },
});

export const { logout, setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
export const authSelector = (state: RootState): IAuthState => state.auth;
export default authReducer;
