import { FC, ReactElement } from 'react';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';

export interface SelectProps extends DropdownProps {
  // options?: any[];
  label?: string;
  // value?: string;
  icon?: string;
  // style?: string;
  error?: string;
  // name?: string;
  styleError?: string;
  selectStyle?: string;
  // filterBy?: string;
  // disabled?: boolean;
  // onChange?: (e: DropdownChangeParams) => void;
  // type?: 'basic' | 'multi'
  // id?:string
}

export const Select: FC<SelectProps> = ({
  value,
  options,
  style,
  icon,
  error,
  name,
  label,
  styleError,
  filterBy,
  disabled,
  onChange,
  type = 'basic',
  id,
  selectStyle,
  required,
  onFocus,
  onMouseDown,
}): ReactElement => {
  return (
    <div className={`${selectStyle}`}>
      <div className="p-inputgroup field h-3rem shadow-1 border-round">
        {icon !== undefined ? (
          <span className="p-inputgroup-addon bg-primary border-round-right-none">
            <i className={`${icon}`}></i>
          </span>
        ) : null}
        <span
          className={`p-float-label ${
            error != null && 'border-round border-red-500 border-1'
          }`}
        >
          {type === 'basic' ? (
            <Dropdown
              style={style}
              onFocus={onFocus}
              onMouseDown={onMouseDown}
              emptyMessage={'No hay resultados que mostrar'}
              id={name}
              name={name}
              value={value}
              options={options}
              filter
              disabled={disabled}
              showClear
              optionLabel="name"
              optionValue={'value'}
              filterBy={filterBy ?? 'name'}
              onChange={onChange}
            />
          ) : (
            <MultiSelect
              style={style}
              id={name}
              name={name}
              value={value}
              options={options}
              filter
              disabled={disabled}
              showClear
              optionLabel="name"
              optionValue={'value'}
              filterBy={filterBy ?? 'name'}
              onChange={onChange}
            />
          )}
          {/* <Dropdown
            id={id}
            name={name}
            value={value}
            options={options}
            filter
            disabled={disabled}
            showClear
            optionLabel="name"
            optionValue={'value'}
            filterBy={filterBy ?? 'name'}
            onChange={onChange}
          /> */}
          <label className={'text-overflow-clip'} htmlFor={name}>
            {label}{' '}
            <span className={'text-overflow-clip'} style={{ color: 'red' }}>
              {required && '*'}
            </span>
          </label>
        </span>
      </div>
      <small
        className={`p-error block text-left mb-2 mt-3  ${error ?? styleError}`}
      >
        {error}
      </small>
    </div>
  );
};
