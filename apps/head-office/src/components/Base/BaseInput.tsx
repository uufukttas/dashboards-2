import { IInputProps, Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';

import { FC } from 'react';
import { Controller, FieldValues, useController } from 'react-hook-form';
import { cn } from '../../utils/common.utils';
import BaseFormError from './BaseFormError';

interface IBaseInputProps extends Omit<IInputProps, 'form'> {
  form: FieldValues;
  name: string;
  label?: string;
  prefix?: string;
  rules?: Record<string, unknown>;
  inputClassName?: string;
  containerClassName?: string;
  isTextarea?: boolean;
}

const BaseInput: FC<IBaseInputProps> = (props) => {
  const { form, label, name, rules, prefix, inputClassName, containerClassName, isTextarea = false, ...rest } = props;

  const {
    fieldState: { error },
  } = useController({
    name,
    control: form.control,
    rules,
  });

  const inputClasses = cn(
    `${prefix}-input w-full mt-1 p-2 border rounded-lg text-text text-sm focus:ring-primary focus:border-primary`,
    error && 'border-error',
    inputClassName,
  );

  const containerClasses = cn('h-20', containerClassName);

  return (
    <div className={containerClasses}>
      {label && (
        <Label className={`${prefix}-label block text-sm font-medium text-gray-600`} htmlFor={name} labelText={label} />
      )}
      <Controller
        control={form.control}
        name={name}
        rules={rules}
        render={({ field }) => (
          isTextarea ? (
            <Textarea {...field} className={inputClasses} name={name} {...rest} />
          ) : (
            <Input {...field} className={inputClasses} name={name} type="text" {...rest} />
          )
        )}
      />
      {error && error.message && <BaseFormError message={error.message} prefix={prefix} />}
    </div>
  );
};

export default BaseInput;
