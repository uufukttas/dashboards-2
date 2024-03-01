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
    <label className={`block text-gray-700 text-sm font-bold mb-2 ${className}`} htmlFor={htmlFor}>
      {labelText ? labelText : children}
    </label>
  );
};

export default Label;
