/* eslint-disable-next-line */
export interface LabelProps {
  labelText: string;
  className?: string;
  htmlFor: string;
}

export function Label({
  className,
  htmlFor,
  labelText
}: LabelProps) {
  return (
    <label className={`block text-gray-700 text-sm font-bold mb-2 ${className}`} htmlFor={htmlFor}>
    {labelText}
  </label>
  );
}

export default Label;
