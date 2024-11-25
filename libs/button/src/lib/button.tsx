interface IButtonProps {
  buttonText?: string;
  children?: React.ReactNode;
  className?: string;
  dataAttributes?: { [key: string]: string };
  disabled?: boolean;
  id: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export function Button({ buttonText, children, className, dataAttributes, disabled, id, type, onClick }: IButtonProps) {
  return (
    <button
      className={`button active:bg-opacity-25 ${className}`}
      disabled={disabled}
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
