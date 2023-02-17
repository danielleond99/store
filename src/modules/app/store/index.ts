import { useDispatch } from "react-redux";
import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import authReducer from "../../auth/redux";

const rootReducer = combineReducers({
  auth: authReducer,
});
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: () => customizedMiddleware,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = (): ThunkDispatch<any, any, any> =>
  useDispatch<AppDispatch>();
export default store;
