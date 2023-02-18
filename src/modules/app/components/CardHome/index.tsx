import { Button } from "../Button";
import { FC, ReactElement } from "react";
import { Card } from "../Card";
import { useNavigate } from "react-router-dom";

interface CardHomeProps {
  color: string;
  label: "products" | "sales";
  type?: string;
  total?: number;
  icon: string;
}

export const CardHome: FC<CardHomeProps> = ({
  color,
  type,
  total,
  icon,
  label,
}): ReactElement => {
  const navigate = useNavigate();
  const header = (
    <div
      className={`border-round-top-xl border-${color}-500 border-top-1 p-3 w-full flex flex-row flex-wrap justify-content-between`}
      style={{
        background: `linear-gradient(to right, var(--${color}-400), var(--${color}-500), var(--${color}-500), var(--${color}-600))`,
      }}
    >
      <i
        className={`pi ${icon}`}
        style={{ fontSize: "6em", color: "white" }}
      ></i>
      <div className={"text-2xl text-white"}>
        <span className={"block text-right text-4xl"}>{total}</span>
        <span className={`capitalize text-center`}>
          {label}
        </span>
      </div>
    </div>
  );
  const footer = (
    <div className={"-mt-3"}>
      <Button
        onClick={() => navigate(`/dashboard/${type}/create`)}
        label=" CREATE"
        icon={"pi pi-plus"}
        style={`font-medium mr-3 bg-${color}-500 shadow-2 border-3 border-white`}
      />
      <Button
        onClick={() => navigate(`/dashboard/${type}`)}
        label=" VIEW"
        icon={"pi pi-eye"}
        style={`font-medium bg-${color}-500 shadow-2 border-3 border-white`}
      />
    </div>
  );
  return (
    <Card
      header={header}
      footer={footer}
      style={
        "transition-all transition-duration-400 transition-delay-100 border-round-xl mx-3 shadow-4 hover:shadow-7 rotate"
      }
    />
  );
};
