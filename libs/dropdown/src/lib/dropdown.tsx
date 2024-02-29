import React, { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IDropdownProps {
  className?: string;
  disabled?: boolean;
  id: string;
  items: { id: null; rid: number; plateCode: number; name: string; }[] | { name: string, id: number; rid: null; }[];
  multiple?: boolean;
  name: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
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
  register,
  required,
  value,
  onChange,
}: IDropdownProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange && onChange(event);
  };

  useEffect(() => {
    setSelectedValue(value?.toString() || '');
  }, [value]);
  return (
    <select className={className} disabled={disabled} id={id} multiple={multiple} name={name} required={required} {...register} value={selectedValue} onChange={handleChange}>
      {
        items?.map((item, index) => (
          <option key={index} value={item?.rid ?? item?.id}> {item.name} </option>
        ))
      }
    </select>
  );
}

export default Dropdown;
