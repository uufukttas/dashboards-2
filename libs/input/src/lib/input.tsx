
/* eslint-disable-next-line */
export interface InputProps {
  ariaInvalid?: boolean;
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
  ariaInvalid,
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
    <input aria-invalid={ariaInvalid} className={`input ${className}`} disabled={disabled} id={id} name={name} type={type} placeholder={placeholder} required={required} onChange={onChange} />

  );
}

export default Input;
