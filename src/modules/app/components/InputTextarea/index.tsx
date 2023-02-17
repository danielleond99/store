import React, { FC } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { ButtonProps as PrimeButtonProps } from "primereact/button";
import { IconType } from "primereact/utils";

interface InputTextAreaProps {
  rows?: number;
  cols?: number;
  name: string;
  label?: string;
  error?: string;
  style?: string;
  styleInputText?: string;
  styleIcon?: string;
  styleError?: string;
  value?: string | number;
  onChange?: any;
  icon?: IconType<PrimeButtonProps>;
  placeholder?: string;
  disabled?: boolean;
  showError?: boolean;
  required?: boolean;
}

export const InputTextArea: FC<InputTextAreaProps> = ({
  rows,
  cols,
  label,
  name,
  error,
  style,
  styleError,
  value,
  onChange,
  icon,
  placeholder,
  disabled,
  styleInputText,
  styleIcon,
  showError = true,
  required = false,
}) => {
  return (
    <div className={`${style}`}>
      <div className="p-inputgroup field h-3rem shadow-1 border-round">
        {icon !== undefined ? (
          <span
            className={`p-inputgroup-addon bg-primary border-round-right-none ${styleIcon}`}
          >
            <i className={`${icon}`}></i>
          </span>
        ) : null}
        <span
          className={`p-float-label ${
            error != null && "border-rounded border-red-500 border-1"
          }`}
        >
          <InputTextarea
            name={name}
            style={{ resize: "none" }}
            //@ts-expect-error
            value={value}
            onChange={onChange}
            className={`${styleInputText}`}
          />
          <label htmlFor={name}>
            {label} <span style={{ color: "red" }}>{required && "*"}</span>
          </label>
        </span>
      </div>
      {showError ? (
        <small
          className={`p-error block text-left -mb-4 -mt-3 ${
            error ?? styleError
          }`}
        >
          {error}
        </small>
      ) : null}
    </div>
  );
};
