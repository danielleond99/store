import { FC, useState } from "react";
import { Button } from "../Button";
import { Dialog } from "primereact/dialog";

interface IActionTemplateProps {
  onEdit: () => void;
  onDelete: any;
}

export const ActionBodyTemplate: FC<IActionTemplateProps> = ({
  onEdit,
  onDelete,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div>
      <Dialog
        header="Delete"
        visible={showDialog}
        style={{ width: "30vw" }}
        onHide={() => setShowDialog(false)}
      >
        <p>Are you sure you want to delete the item?</p>
        <div className={"grid flex-row mt-5 mr-1 justify-content-end"}>
          <Button
            onClick={() => {
              setShowDialog(false);
            }}
            style={"mr-3 bg-red-600 border-red-600"}
            label="Cancel"
            icon={"pi pi-times"}
          />
          <Button
            onClick={() => {
              onDelete();
              setShowDialog(false);
            }}
            label="Accept"
            icon={"pi pi-check"}
          />
        </div>
      </Dialog>
      <Button
        onClick={onEdit}
        icon="pi pi-pencil"
        style="mr-2 p-button-rounded p-button-text shadow-none hover:bg-primary p-button-lg"
        tooltip="Edit"
        tooltipOptions={{ position: "top" }}
      />
      <Button
        onClick={() => setShowDialog(true)}
        icon="pi pi-times"
        style="p-button-rounded p-button-text shadow-none hover:bg-primary p-button-lg"
        tooltip="Delete"
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
};
