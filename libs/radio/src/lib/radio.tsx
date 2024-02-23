import { UseFormRegisterReturn } from 'react-hook-form'
/* eslint-disable-next-line */
interface IRadioProps {
  className: string;
  id: string;
  name: string;
  register?: UseFormRegisterReturn
}

export function Radio({
  className,
  id,
  name,
  register,
}: IRadioProps) {
  return <input className={className} id={id} name={name} type="radio" {...register} />;
}

export default Radio;
