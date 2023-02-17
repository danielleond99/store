import React, { FC } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { ButtonProps as PrimeButtonProps } from "primereact/button";

interface InputProps {
  label?: string;
  password?: boolean;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  error?: string;
  style?: string;
  styleInputText?: string;
  styleContainer?: string;
  styleIcon?: string;
  styleError?: string;
  value?: string | number;
  autoComplete?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  icon?: any;
  placeholder?: string;
  disabled?: boolean;
  tooltip?: string;
  tooltipOptions?: any;
  required?: boolean;
  contentEditable?: boolean;
  feedback?: boolean;
}

export const Input: FC<InputProps> = ({
  label,
  password = false,
  name,
  type = "text",
  error,
  style,
  styleError,
  value,
  onChange,
  icon,
  placeholder,
  disabled,
  styleInputText,
  styleContainer,
  styleIcon,
  tooltip,
  tooltipOptions,
  required = false,
  contentEditable = true,
  feedback = false,
  autoComplete,
}) => {
  return (
    <div className={`${style}`}>
      <div
        className={`p-inputgroup field h-3rem shadow-1 border-round ${styleContainer}`}
      >
        {icon !== undefined ? (
          <span
            className={`p-inputgroup-addon bg-primary border-round-right-none ${styleIcon}`}
          >
            <i className={`${password ? "pi pi-lock" : icon}`}></i>
          </span>
        ) : null}
        <span
          className={`p-float-label ${
            error != null && "border-round border-red-500 border-1"
          }`}
        >
          {password ? (
            <Password
              value={value}
              onChange={onChange}
              feedback={feedback}
              strongLabel={"Fuerte"}
              mediumLabel={"Media"}
              weakLabel={"Débil"}
              id="inputgroup"
              type="password"
              toggleMask
              autoComplete={autoComplete}
              placeholder={placeholder}
              name={name}
              disabled={disabled}
              className={`${styleInputText}`}
            />
          ) : (
            <InputText
              className={`border-round-left-none ${styleInputText}`}
              id={name}
              name={name}
              contentEditable={contentEditable}
              type={type}
              autoComplete={autoComplete}
              //@ts-expect-error
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              disabled={disabled}
              tooltip={tooltip}
              tooltipOptions={tooltipOptions}
              min={0}
            />
          )}
          <label htmlFor={name}>
            {label}{" "}
            <span className={"text-overflow-clip"} style={{ color: "red" }}>
              {required && "*"}
            </span>
          </label>
        </span>
      </div>
      <small
        className={`p-error block text-left mb-4 mt-3 ${error ?? styleError}`}
      >
        {error}
      </small>
    </div>
  );
};
