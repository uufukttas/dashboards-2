import React, { FC } from 'react';

interface IFormErrorProps {
  prefix?: string;
  message: string;
}

const BaseFormError: FC<IFormErrorProps> = (props) => {
  const { message, prefix } = props;

  return (
    <div className={`${prefix}-wrapper w-full `}>
      <p className={`${prefix}-message font-bold text-error`}>{message}</p>
    </div>
  );
};

export default BaseFormError;
