import { UseFormRegisterReturn } from 'react-hook-form';

interface ICheckboxProps {
  checked?: boolean;
  className: string;
  id: string;
  name: string;
  register?: UseFormRegisterReturn;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  checked,
  className,
  id,
  name,
  register,
  onChange,
}: ICheckboxProps) {
  return (
    <input className={className} id={id} name={name} type="checkbox" onChange={onChange} {...register} checked={checked} />
  );
};

export default Checkbox;
