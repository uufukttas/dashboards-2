
/* eslint-disable-next-line */
export interface InputProps {
  className?: string;
  id: string;
  name: string;
  placeholder?: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  className,
  id,
  name,
  placeholder,
  type,
  onChange
}: InputProps) {
  return (
    <input className={`input ${className}`} id={id} name={name} type={type} placeholder={placeholder} onChange={onChange}/>

  );
}

export default Input;
