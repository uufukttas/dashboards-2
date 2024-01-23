/* eslint-disable-next-line */
export interface ButtonProps {
  buttonText: string;
  className?: string;
  type: 'button' | 'submit' | 'reset';
}

export function Button({
  className,
  type,
  buttonText
}: ButtonProps) {
  return (
    <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`} type={type}>
      {buttonText}
    </button>
  );
}

export default Button;
