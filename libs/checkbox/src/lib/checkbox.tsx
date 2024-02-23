import { UseFormRegisterReturn } from 'react-hook-form'
/* eslint-disable-next-line */
interface ICheckboxProps {
  className: string;
  id: string;
  name: string;
  register?: UseFormRegisterReturn
}

export function Checkbox({
  className,
  id,
  name,
  register,
}: ICheckboxProps) {
  return <input className={className} id={id} name={name} type="checkbox" {...register} />;
}

export default Checkbox;
