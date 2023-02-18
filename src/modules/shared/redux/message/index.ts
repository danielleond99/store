import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

interface IMessage {
  severity: "success" | "info" | "warn" | "error";
  summary: string;
  detail?: string;
  life?: number;
  show: boolean;
}

interface IShowMessage extends Omit<IMessage, "show"> {
  sticky?: boolean;
}

const initialState: IMessage = {
  detail: "",
  life: 1500,
  severity: "success",
  summary: "",
  show: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    showMessage: (state: IMessage, action: PayloadAction<IShowMessage>) => {
      return {
        ...state,
        ...action.payload,
        summary: action.payload.summary
          ? action.payload.summary
          : "We're sorry. An error has occurred",
        show: true,
      };
    },
    hideMessage: (state: IMessage) => {
      return {
        ...state,
        show: false,
      };
    },
  },
});

export const { showMessage, hideMessage } = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
export const messageSelector = (state: RootState): IMessage => state.message;
export default messageReducer;
