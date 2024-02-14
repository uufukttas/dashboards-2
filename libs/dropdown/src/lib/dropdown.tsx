interface CitiesProps {
  CountryID?: number;
  IsDeleted?: string;
  Name?: string;
  PlateCode?: string;
  RID?: string | number | undefined;
}
interface DropdownProps {
  className?: string;
  id: string;
  items: (string | CitiesProps)[];
  name: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
};

export function Dropdown({
  className,
  id,
  items,
  name,
  required,
  value,
  onChange

}: DropdownProps) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <select className={className}  id={id} name={name} required={required} value={value} onChange={handleOnChange}>
      {
        items?.map((item, index) => (
          <option key={index} value={typeof item === 'object' ? item.RID : item}>{typeof item === 'object' ? item.Name : item}</option>
        ))}
    </select>
  );
}

export default Dropdown;
