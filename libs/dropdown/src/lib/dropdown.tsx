import React, { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IDropdownProps {
  className?: string;
  id: string;
  items: { name: string, id: number }[];
  name: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function Dropdown({
  className,
  id,
  items,
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
    <select className={className} id={id} name={name} required={required} {...register} value={selectedValue} onChange={handleChange}>
      {
        items?.map((item, index) => (
          <option key={index} value={item.id}> {item.name} </option>
        ))
      }
    </select>
  );
}

export default Dropdown;
