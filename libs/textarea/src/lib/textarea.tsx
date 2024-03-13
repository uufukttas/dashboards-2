import { UseFormRegisterReturn } from 'react-hook-form';

interface ITextareaProps {
  className?: string;
  id: string;
  name: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  rows?: number;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function Textarea({
  id,
  className,
  name,
  placeholder,
  register,
  required,
  rows,
  value,
  onChange,
}: ITextareaProps) {
  return (
    <textarea
      className={`textarea ${className}`}
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      rows={rows}
      value={value}
      onChange={onChange}
      {...register}
    >
    </textarea>
  );
};

export default Textarea;
