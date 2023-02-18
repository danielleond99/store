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

const middleware = [thunkMiddleware];

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
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
