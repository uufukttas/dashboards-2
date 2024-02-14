/* eslint-disable-next-line */
export interface ButtonProps {
  buttonText?: string;
  children?: React.ReactNode;
  className?: string;
  type: 'button' | 'submit' | 'reset';
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export function Button({
  children,
  className,
  type,
  buttonText,
  onClick
}: ButtonProps) {
  return (
    <button className={`button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline ${className}`} type={type} onClick={onClick}>
      {children || buttonText}
    </button>
  );
}

export default Button;
