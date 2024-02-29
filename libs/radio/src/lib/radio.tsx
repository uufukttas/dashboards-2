import { UseFormRegisterReturn } from 'react-hook-form'
/* eslint-disable-next-line */
interface IRadioProps {
  className: string;
  id: string;
  name: string;
  register?: UseFormRegisterReturn;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Radio({
  className,
  id,
  name,
  register,
  onChange,
}: IRadioProps) {
  return <input className={className} id={id} name={name} type="radio" onChange={onChange} {...register} />;
}

export default Radio;
