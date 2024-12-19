import { IInputProps, Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';
import { FC } from 'react';
import { Controller, FieldValues, useController } from 'react-hook-form';
import { cn } from '../../utils/common.utils';
import BaseFormError from './BaseFormError';

interface IBaseInputProps extends Omit<IInputProps, 'form' | 'className'> {
  form: FieldValues;
  name: string;
  label?: string;
  labelClassName?: string;
  prefix?: string;
  rules?: Record<string, unknown>;
  inputClassName?: string;
  containerClassName?: string;
  isTextarea?: boolean;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaseInput: FC<IBaseInputProps> = (props) => {
  const {
    containerClassName,
    form,
    inputClassName,
    isTextarea = false,
    label,
    labelClassName,
    name,
    prefix,
    rules,
    type = 'text',
    onChange,
    ...rest
  } = props;

  const {
    fieldState: { error },
  } = useController({ name, control: form.control, rules });
  const inputClasses = cn(
    type === 'checkbox'
      ? 'w-6 h-6 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary'
      : `${prefix}-input w-full mt-1 p-2 border border-gray-400 rounded-lg text-text text-sm focus:ring-primary focus:border-primary`,
    error && 'border-error',
    inputClassName,
  );
  const containerClasses = cn(type === 'checkbox' ? 'h-10 flex items-center gap-2' : 'h-20', containerClassName);

  return (
    <div className={containerClasses}>
      {label && (
        <Label
          className={cn(
            `${prefix}-label text-sm font-medium text-gray-600 ${labelClassName}`,
            type === 'checkbox' ? 'order-2' : 'block',
          )}
          htmlFor={name}
          labelText={label}
        />
      )}
      <Controller
        control={form.control}
        defaultValue={''}
        name={name}
        rules={rules}
        render={({ field }) =>
          isTextarea ? (
            <Textarea className={inputClasses} {...field} {...rest} name={name} onChange={field.onChange} />
          ) : (
            <Input
              className={inputClasses}
              {...field}
              name={name}
              type={type || 'text'}
              {...rest}
              checked={field.value}
              onChange={(event) => {
                type === 'checkbox' ? field.onChange(event.target.checked) : field.onChange(event.target.value);
                if (onChange) {
                  onChange(event);
                }
              }}
            />
          )
        }
      />
      {error && error.message && <BaseFormError message={error.message} prefix={prefix} />}
    </div>
  );
};

export default BaseInput;
