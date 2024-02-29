import { UseFormRegisterReturn } from 'react-hook-form'
/* eslint-disable-next-line */
interface ICheckboxProps {
  className: string;
  id: string;
  name: string;
  register?: UseFormRegisterReturn;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({
  className,
  id,
  name,
  register,
  onChange,
}: ICheckboxProps) {
  return <input className={className} id={id} name={name} type="checkbox" onChange={onChange} {...register} />;
}

export default Checkbox;
