import { UseFormRegisterReturn } from 'react-hook-form';

interface ICheckboxProps {
  checked?: boolean;
  className: string;
  id: string;
  name: string;
  register?: UseFormRegisterReturn;
  dataAttributes?: { [key: string]: string };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({ checked, className, dataAttributes, id, name, register, onChange }: ICheckboxProps) {
  return (
    <input
      checked={checked}
      className={className}
      id={id}
      name={name}
      type="checkbox"
      onChange={onChange}
      {...dataAttributes}
      {...register}
    />
  );
};

export default Checkbox;
