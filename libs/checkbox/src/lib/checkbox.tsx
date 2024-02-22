import { UseFormRegisterReturn } from 'react-hook-form'
/* eslint-disable-next-line */
export interface CheckboxProps {
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
}: CheckboxProps) {
  return <input className={className} id={id} name={name} type="checkbox" {...register} />;
}

export default Checkbox;
