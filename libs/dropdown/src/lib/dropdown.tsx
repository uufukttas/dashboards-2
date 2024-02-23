import { UseFormRegisterReturn } from 'react-hook-form';

interface CitiesProps {
  CountryID?: number;
  IsDeleted?: string;
  Name?: string;
  PlateCode?: string;
  RID?: string | number | undefined;
}
interface IDropdownProps {
  className?: string;
  id: string;
  items: (string | CitiesProps)[];
  name: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function Dropdown({
  className,
  id,
  items,
  name,
  register,
  required,
  value,
  onChange
}: IDropdownProps) {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <select className={className}  id={id} name={name} required={required} value={value} onChange={handleOnChange} {...register}>
      {
        items?.map((item, index) => (
          <option key={index} value={typeof item === 'object' ? item.RID : item}>{typeof item === 'object' ? item.Name : item}</option>
        ))}
    </select>
  );
}

export default Dropdown;
