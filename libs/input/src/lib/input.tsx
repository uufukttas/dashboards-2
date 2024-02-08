
/* eslint-disable-next-line */
export interface InputProps {
  className?: string;
  disabled?: boolean;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  className,
  disabled,
  id,
  name,
  placeholder,
  required,
  type,
  onChange
}: InputProps) {
  return (
    <input className={`input ${className}`} disabled={disabled} id={id} name={name} type={type} placeholder={placeholder} required={required} onChange={onChange} />

  );
}

export default Input;
