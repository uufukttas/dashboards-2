import { FC } from 'react';

interface IFormErrorProps {
  prefix?: string;
  message: string;
}

const BaseFormError: FC<IFormErrorProps> = (props) => {
  const { message, prefix } = props;

  return (
    <div className={`${prefix}-wrapper w-full flex`}>
      <p className={`${prefix}-message font-bold text-red-700 text-sm`}>{message}</p>
    </div>
  );
};

export default BaseFormError;
