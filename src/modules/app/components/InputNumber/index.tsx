import React, { FC } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { ButtonProps as PrimeButtonProps } from 'primereact/button';
import TooltipOptions from 'primereact/tooltip/tooltipoptions';
import { IconType } from 'primereact/utils';

interface InputProps {
  label?: string;
  password?: boolean;
  name: string;
  error?: string;
  style?: string;
  styleInputText?: string;
  styleContainer?: string;
  styleIcon?: string;
  styleError?: string;
  value?: any;
  onChange?: any;
  icon?: IconType<PrimeButtonProps>;
  placeholder?: string;
  disabled?: boolean;
  tooltip?: string;
  tooltipOptions?: any;
  required?: boolean;
}

export const InputNum: FC<InputProps> = ({
  label,
  password = false,
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
  styleContainer,
  styleIcon,
  tooltip,
  tooltipOptions,
  required = false,
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
            <i className={`${password ? 'pi pi-lock' : icon}`}></i>
          </span>
        ) : null}
        <span
          className={`p-float-label ${
            error != null && 'border-round border-red-500 border-1'
          }`}
        >
          <InputNumber
            className={`border-round-left-none ${styleInputText}`}
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            tooltip={tooltip}
            tooltipOptions={tooltipOptions}
            min={0}
            minFractionDigits={2}
            maxFractionDigits={5}
          />
          <label htmlFor={name}>
            {label}{' '}
            <span className={'text-overflow-clip'} style={{ color: 'red' }}>
              {required && '*'}
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
