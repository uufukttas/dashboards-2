
/* eslint-disable-next-line */
export interface InputProps {
  className?: string;
  id: string;
  name: string;
  placeholder?: string;
  type: string;
}

export function Input({
  className,
  id,
  name,
  placeholder,
  type,
}: InputProps) {
  return (
    <input className={`${className}`} id={id} name={name} type={type} placeholder={placeholder} />

  );
}

export default Input;
