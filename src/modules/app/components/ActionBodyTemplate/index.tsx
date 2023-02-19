import { FC } from "react";
import { Button } from "../Button";

interface IActionTemplateProps {
  onDelete: () => void;
  onEdit: () => void;
}

export const ActionBodyTemplate: FC<IActionTemplateProps> = ({
  onDelete,
  onEdit,
}) => {
  return (
    <div>
      <Button
        onClick={onEdit}
        icon="pi pi-pencil"
        style="mr-2 p-button-rounded p-button-text shadow-none hover:bg-primary p-button-lg"
        tooltip="Edit"
        tooltipOptions={{ position: "top" }}
      />
      <Button
        onClick={onDelete}
        icon="pi pi-times"
        style="p-button-rounded p-button-text shadow-none hover:bg-primary p-button-lg"
        tooltip="Delete"
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
};
