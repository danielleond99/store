import { FC, ReactElement } from "react";
import { Button } from "../Button";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderTableProps {
  title?: string;
  type: any;
  disabled?: boolean;
  navigateCreate?: any;
  // actions?:
}

export const HeaderTable: FC<HeaderTableProps> = ({
  title = "Datos",
  type,
  disabled,
  navigateCreate,
}): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const create = () => {
    navigate(`${location.pathname}/create`);
  };
  return (
    <div
      className={"px-3 pt-1 flex align-items-center justify-content-between"}
    >
      <h2 className="m-0 font-semibold">{title}</h2>
      <div>
        <Button
          disabled={disabled}
          onClick={navigateCreate ?? create}
          icon={"pi pi-plus"}
          label={"Nueva"}
          style={"shadow-1 mt-1"}
        />
      </div>
    </div>
  );
};
