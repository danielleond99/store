import { useDispatch } from "react-redux";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import authReducer from "../../auth/redux";
import messageReducer from "../../shared/redux/message";
import productsReducer from "../../products/redux";
import salesReducer from "../../sales/redux/index";

const middleware = [thunkMiddleware];

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  products: productsReducer,
  sales: salesReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = (): ThunkDispatch<any, any, any> =>
  useDispatch<AppDispatch>();
export default store;
