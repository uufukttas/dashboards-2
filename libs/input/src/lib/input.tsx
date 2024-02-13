
/* eslint-disable-next-line */
export interface InputProps {
  ariaInvalid?: boolean;
  className?: string;
  disabled?: boolean;
  id: string;
  name: string;
  pattern?: string;
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
  pattern,
  placeholder,
  required,
  type,
  onChange
}: InputProps) {
  return (
    <input aria-invalid={ariaInvalid} className={`input ${className}`} disabled={disabled} id={id} name={name} type={type} pattern={pattern} placeholder={placeholder} required={required} onChange={onChange} />

  );
}

export default Input;
