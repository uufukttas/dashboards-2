/* eslint-disable-next-line */
interface ILabelProps {
  labelText: string;
  className?: string;
  htmlFor: string;
}

export function Label({
  className,
  htmlFor,
  labelText
}: ILabelProps) {
  return (
    <label className={`block text-gray-700 text-sm font-bold mb-2 ${className}`} htmlFor={htmlFor}>
    {labelText}
  </label>
  );
}

export default Label;
