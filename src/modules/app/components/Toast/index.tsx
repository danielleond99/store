import { Toast as ToastPrime } from "primereact/toast";

import { FC, ReactElement, useEffect, useRef } from "react";
import { IShowMessage } from "../../types";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { hideMessage, messageSelector } from "../../../shared/redux/message";

interface ToastProps {
  position?: any;
  children: ReactElement;
}

export const Toast: FC<ToastProps> = ({ position, children }) => {
  const { show, detail, summary, life, severity } =
    useSelector(messageSelector);
  const dispacth = useAppDispatch();
  const toast = useRef<any>(null);
  const showSuccess = (data: IShowMessage): void => {
    toast.current?.show(data);
  };

  useEffect(() => {
    if (show) {
      showSuccess({ detail, summary, life, severity });
      setTimeout(() => {
        dispacth(hideMessage());
      }, life);
    }
  }, [show]);

  return (
    <>
      <ToastPrime ref={toast} position={position || "top-right"} />
      {children}
    </>
  );
};
