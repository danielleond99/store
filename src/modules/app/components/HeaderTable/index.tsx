import { FC, ReactElement } from "react";
import { Button } from "../Button";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderTableProps {
  title?: string;
  type: any;
  disabled?: boolean;
}

export const HeaderTable: FC<HeaderTableProps> = ({
  title = "Data",
  type,
  disabled,
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
          onClick={create}
          label={"New"}
          style={"shadow-1 mt-1"}
        />
      </div>
    </div>
  );
};
