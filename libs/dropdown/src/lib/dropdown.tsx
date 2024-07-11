import React, { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IDropdownProps {
  className?: string;
  disabled?: boolean;
  id: string;
  items: {
    id: null;
    rid: number | string;
    plateCode?: number;
    name: string;
    disabled?: boolean;
    selected?: boolean;
  }[] | {
    name: string,
    id: number;
    rid: null;
    disabled?: boolean;
    selected?: true
  }[];
  multiple?: boolean;
  name: string;
  optionClassName?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  selectedValue?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function Dropdown({
  className,
  disabled,
  id,
  items,
  multiple,
  name,
  optionClassName,
  register,
  required,
  selectedValue,
  value,
  onChange,
}: IDropdownProps) {
  const [selectedOption, setSelectedOption] = useState<string>(selectedValue || '1');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    onChange && onChange(event);
  };

  useEffect(() => {
    if (selectedValue === selectedOption) {
      setSelectedOption(selectedValue);
    } else {
      setSelectedOption(value?.toString() || '');
    }
  }, [value]);

  return (
    <select
      className={className}
      disabled={disabled}
      id={id}
      multiple={multiple}
      name={name}
      required={required}
      value={selectedOption}
      onChange={handleChange}
      {...register}
    >
      {
        items?.map((item, index) => (
          <option
            className={optionClassName}
            disabled={item.disabled}
            key={index}
            value={item?.rid ?? item?.id}
            selected={item.selected}
          >
            {item.name}
          </option>
        ))
      }
    </select>
  );
};

export default Dropdown;
