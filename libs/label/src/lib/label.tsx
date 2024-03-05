interface ILabelProps {
  children?: React.ReactNode;
  className?: string;
  htmlFor: string;
  labelText: string;
};

export function Label({
  children,
  className,
  htmlFor,
  labelText
}: ILabelProps) {
  return (
    <label className={`block text-sm mb-2 ${className}`} htmlFor={htmlFor}>
      {labelText} {children}
    </label>
  );
};

export default Label;
