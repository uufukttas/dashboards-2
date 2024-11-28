import { IInputProps, Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';

import { FC } from 'react';
import { Controller, FieldValues, useController } from 'react-hook-form';
import { cn } from '../../utils/common.utils';
import BaseFormError from './BaseFormError';

interface IBaseInputProps extends Omit<IInputProps, 'form'|'className'> {
  form: FieldValues;
  name: string;
  label?: string;
  prefix?: string;
  rules?: Record<string, unknown>;
  inputClassName?: string;
  containerClassName?: string;
  isTextarea?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaseInput: FC<IBaseInputProps> = (props) => {
  const {
    form,
    label,
    name,
    rules,
    prefix,
    inputClassName,
    containerClassName,
    isTextarea = false,
    onChange,
    type,
    ...rest
  } = props;

  const {
    fieldState: { error },
  } = useController({
    name,
    control: form.control,
    rules,
  });

  const inputClasses = cn(
    type === 'checkbox'
      ? 'w-6 h-6 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary'
      : `${prefix}-input w-full mt-1 p-2 border rounded-lg text-text text-sm focus:ring-primary focus:border-primary`,
    error && 'border-error',
    inputClassName,
  );

  const containerClasses = cn(
    type === 'checkbox' ? 'h-10 flex items-center gap-2' : 'h-20',
    containerClassName
  );

  return (
    <div className={containerClasses}>
      {label && (
        <Label
          className={cn(
            `${prefix}-label text-sm font-medium text-gray-600`,
            type === 'checkbox' ? 'order-2' : 'block'
          )}
          htmlFor={name}
          labelText={label}
        />
      )}
      <Controller
        control={form.control}
        name={name}
        rules={rules}
        render={({ field }) =>
          isTextarea ? (
            <Textarea className={inputClasses} {...field} {...rest} name={name} onChange={field.onChange} />
          ) : (
            <Input
              {...field}
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                field.onChange(event);
                onChange?.(event);
              }}
              className={inputClasses}
              name={name}
              type={type || "text"}
              {...rest}
            />
          )
        }
      />
      {error && error.message && <BaseFormError message={error.message} prefix={prefix} />}
    </div>
  );
};

export default BaseInput;
