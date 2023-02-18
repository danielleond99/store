import { FC, ReactElement } from "react";
import { Dialog } from "primereact/dialog";

interface ILoadingProps {
  show?: boolean;
}

export const Loading: FC<ILoadingProps> = ({ show }): ReactElement => {
  return (
    <Dialog
      closable={false}
      onHide={() => {}}
      visible={show}
      modal
      draggable={false}
      showHeader={false}
      contentClassName={"shadow-none z-5 -mt-8"}
      contentStyle={{ backgroundColor: "transparent" }}
      breakpoints={{ "960px": "75vw", "640px": "100vw" }}
      className={"shadow-none z-5"}
    >
      <i className="pi pi-spin pi-spinner" style={{ fontSize: "3.5rem" }}></i>
    </Dialog>
  );
};
