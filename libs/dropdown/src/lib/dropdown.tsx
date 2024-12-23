import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { DropdownChangeEvent, Dropdown as PrimeDropdown } from 'primereact/dropdown';

interface IDropdownItem {
  disabled?: boolean;
  id: null | number;
  label?: string;
  name: string;
  render?: React.ReactNode;
  rid: number | string | null;
  selected?: boolean;
}

interface IDropdownProps {
  className?: string;
  disabled?: boolean;
  id: string;
  items?:
  | {
    id: null;
    rid: number | string;
    name: string;
    disabled?: boolean;
    selected?: boolean;
  }[]
  | {
    name: string;
    id: number;
    rid: null;
    disabled?: boolean;
    selected?: boolean;
  }[];
  multiple?: boolean;
  name: string;
  optionClassName?: string;
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  selectedValue?: string;
  value?: string | number;
  onChange?: (event: DropdownChangeEvent) => void;
}

export function Dropdown({
  className,
  items,
  optionLabel,
  optionValue,
  placeholder,
  value,
  onChange,
}: IDropdownProps) {
  const optionTemplate = (option: IDropdownItem) => {
    if (option?.render) {
      return option?.render;
    }

    return (
      <div className="flex items-center ">
        <span>{option?.label || option?.name}</span>
      </div>
    );
  };

  return (
    <PrimeDropdown
      className={className}
      itemTemplate={optionTemplate}
      options={items}
      optionLabel={optionLabel}
      optionValue={optionValue}
      placeholder={placeholder}
      value={value}
      onChange={(event: DropdownChangeEvent) => onChange && onChange(event)}
    />
  );
}

export default Dropdown;
