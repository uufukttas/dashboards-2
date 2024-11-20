import { UseFormRegisterReturn } from 'react-hook-form';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ariaInvalid?: boolean;
  className?: string;
  dataAttributes?: { [key: string]: string };
  disabled?: boolean;
  id: string;
  name: string;
  pattern?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  value?: string | number | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  ariaInvalid,
  className,
  dataAttributes,
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
  ...rest
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
      {...dataAttributes}
      {...register}
      {...rest}
    />
  );
};

export default Input;
