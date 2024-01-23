
/* eslint-disable-next-line */
export interface InputProps {
  className?: string;
  type: string;
  placeholder?: string;
  id: string;
  name: string;
}

export function Input({
  className,
  type,
  placeholder,
  id,
  name
}: InputProps) {
  return (
    <input className={`shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outlin ${className}`} id={id} type={type} placeholder={placeholder} />

  );
}

export default Input;
