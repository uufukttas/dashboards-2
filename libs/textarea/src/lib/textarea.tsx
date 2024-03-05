import { UseFormRegisterReturn } from 'react-hook-form';

interface ITextareaProps {
  id: string;
  className?: string;
  name: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
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
  value,
  onChange,
}: ITextareaProps) {
  return (
    <textarea id={id} rows={4} className={`text-area ${className}`} name={name} placeholder={placeholder}  required={required} value={value} onChange={onChange} {...register}></textarea>
  );
}

export default Textarea;
