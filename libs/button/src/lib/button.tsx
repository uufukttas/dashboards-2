interface IButtonProps {
  buttonText?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export function Button({
  buttonText,
  children,
  className,
  id,
  type,
  onClick,
}: IButtonProps) {
  return (
    <button
      className={`button py-2 px-4 ${className}`}
      id={id}
      type={type}
      onClick={onClick}>
      {buttonText ? buttonText : children}
    </button>
  );
};

export default Button;
