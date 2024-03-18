interface IButtonProps {
  buttonText?: string;
  children?: React.ReactNode;
  className?: string;
  dataAttributes?: { [key: string]: string };
  id?: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export function Button({
  buttonText,
  children,
  className,
  dataAttributes,
  id,
  type,
  onClick,
}: IButtonProps) {
  return (
    <button
      className={`button py-2 px-2 ${className}`}
      id={id}
      type={type}
      onClick={onClick}
      {...dataAttributes}
    >
      {buttonText ? buttonText : children}
    </button>
  );
};

export default Button;
