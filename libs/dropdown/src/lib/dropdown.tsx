/* eslint-disable-next-line */
export interface DropdownProps {
  className?: string;
  id: string;
  items: string[];
  name: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
 }

export function Dropdown({
  className,
  id,
  items,
  name,
  required,
  onChange

}: DropdownProps) {
  return (
    <select id={id} className={className} required={required} name={name} onChange={onChange}>
      {items?.map((item, index) => (
        <option key={index} value={item}>{item}</option>
      ))}
    </select>
  );
}

export default Dropdown;
