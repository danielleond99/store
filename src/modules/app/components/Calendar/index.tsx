import { FC } from 'react';
import {
  Calendar as PrimeCalendar,
  CalendarProps as IconCalendarProps,
} from 'primereact/calendar';
import { IconType } from 'primereact/utils';

interface CalendarProps {
  label?: string;
  name: string;
  error?: string | undefined;
  style?: string;
  styleError?: string;
  value?: any;
  onChange?: any;
  icon?: IconType<IconCalendarProps>;
  placeholder?: string;
  showTime?: boolean;
  showSeconds?: boolean;
  required?: boolean;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  disabledDates?: Date[] | undefined;
  selectionMode?: string;
}

export const Calendar: FC<CalendarProps> = ({
  label,
  name,
  error,
  style,
  styleError,
  value,
  onChange,
  icon,
  placeholder,
  showTime,
  showSeconds,
  required,
  minDate,
  maxDate,
  disabledDates,
  selectionMode,
}) => {
  return (
    <div className={`${style}`}>
      <div className="p-inputgroup field h-3rem shadow-1 border-round">
        {/* {icon !== undefined ? (
          <span className="p-inputgroup-addon bg-primary border-round-right-none">
            <i className={`${password ? 'pi pi-lock' : icon}`}></i>
          </span>
        ) : null} */}
        <span
          className={`p-float-label ${
            error != null && 'border-round border-red-500 border-1'
          }`}
        >
          <PrimeCalendar
            showButtonBar
            // monthNavigator
            // yearNavigator
            // yearRange={`${new Date().getFullYear() - 100}:${
            //   new Date().getFullYear() + 100
            // }`}
            disabledDates={disabledDates}
            // disabledDays
            className={`border-round-left-none`}
            icon={icon}
            id={name}
            name={name}
            value={value}
            dateFormat="dd-mm-yy"
            placeholder={placeholder}
            onChange={onChange}
            showIcon
            iconPos={'left'}
            showTime={showTime}
            showSeconds={showSeconds}
            minDate={minDate}
            maxDate={maxDate}
            readOnlyInput
            showOtherMonths={false}
          />

          <label className={'ml-6'} htmlFor={name}>
            {label} <span style={{ color: 'red' }}>{required && '*'}</span>
          </label>
        </span>
      </div>
      <small
        className={`p-error block text-left -mb-4 -mt-3 ${error ?? styleError}`}
      >
        {error}
      </small>
    </div>
  );
};
