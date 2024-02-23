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
}

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
    <textarea id={id} rows={4} className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 ${className}`} name={name} placeholder={placeholder}  required={required} value={value} onChange={onChange} {...register}></textarea>
  );
}

export default Textarea;
