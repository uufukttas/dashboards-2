/* eslint-disable-next-line */
export interface TextareaProps {
  id: string;
  className?: string;
  name: string;
  placeholder?: string;
  required: boolean;
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Textarea({
  id,
  className,
  name,
  placeholder,
  required,
  value,
  onChange
}: TextareaProps) {
  return (
    <textarea id={id} rows={4} className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${className}`} name={name} placeholder={placeholder} required={required} value={value} onChange={onChange}></textarea>
  );
}

export default Textarea;
