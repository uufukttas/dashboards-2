import { DropdownChangeEvent, Dropdown as PrimeDropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IDropdownItem {
  id: null;
  rid: number | string;
  name: string;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
  render?: React.ReactNode;
}

interface IDropdownProps {
  className?: string;
  disabled?: boolean;
  id: string;
  items?: IDropdownItem[];
  multiple?: boolean;
  name: string;
  optionClassName?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  selectedValue?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

export function Dropdown({
  className,
  disabled,
  id,
  items,
  name,
  required,
  selectedValue,
  value,
  onChange,
  placeholder,
  ...props
}: IDropdownProps) {
  const [selectedOption, setSelectedOption] = useState<any>(selectedValue || '');

  const options = items?.map((item) => ({
    value: item.rid ?? item.id,
    label: item.name,
    disabled: item?.disabled,
    render: item?.render,
    ...item,
  }));

  const handleChange = (e: DropdownChangeEvent) => {
    setSelectedOption(e.value);
    if (onChange) {
      onChange({
        target: {
          value: e.value,
          name: name,
        },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setSelectedOption(value);
    }
  }, [value]);

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
      id={id}
      name={name}
      value={selectedOption}
      options={options}
      onChange={handleChange}
      className={className}
      disabled={disabled}
      required={required}
      itemTemplate={optionTemplate}
      valueTemplate={optionTemplate}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Dropdown;
