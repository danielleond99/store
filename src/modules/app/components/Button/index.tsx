import { FC, MouseEventHandler } from "react";

import {
  Button as PrimeButton,
  ButtonProps as PrimeButtonProps,
} from "primereact/button";
import { IconType } from "primereact/utils";

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: string;
  type?: "button" | "submit" | "reset";
  icon?: IconType<PrimeButtonProps>;
  iconPos?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tooltip?: string;
  tooltipOptions?: any;
}

export const Button: FC<ButtonProps> = ({
  label,
  disabled = false,
  style,
  type = "button",
  icon,
  loading,
  iconPos,
  onClick,
  tooltip,
  tooltipOptions,
}) => {
  return (
    <PrimeButton
      onClick={onClick}
      iconPos={iconPos}
      loading={loading}
      disabled={disabled || loading}
      className={`border-round-md transition-all transition-duration-500 transition-delay-100 hover:shadow-5 ${style}`}
      type={type}
      label={loading ?? false ? "LOADING..." : label}
      icon={icon}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
    />
  );
};
