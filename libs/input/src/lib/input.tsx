import { UseFormRegisterReturn } from 'react-hook-form';

interface IInputProps {
  ariaInvalid?: boolean;
  className?: string;
  disabled?: boolean;
  id: string;
  name: string;
  pattern?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  type: string;
  value?: string | number | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  ariaInvalid,
  className,
  disabled,
  id,
  name,
  pattern,
  placeholder,
  register,
  required,
  type,
  value,
  onChange,
}: IInputProps) {
  return (
    <input
      aria-invalid={ariaInvalid}
      className={`input ${className}`}
      disabled={disabled}
      id={id}
      name={name}
      type={type}
      pattern={pattern}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      {...register}
    />
  );
};

export default Input;
