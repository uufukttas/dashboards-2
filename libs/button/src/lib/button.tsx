/* eslint-disable-next-line */
export interface ButtonProps {
  buttonText: string;
  className?: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export function Button({
  className,
  type,
  buttonText,
  onClick
}: ButtonProps) {
  return (
    <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`} type={type} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default Button;
