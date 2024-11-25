import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import { FC } from 'react';
import { Controller, FieldValues, useController } from 'react-hook-form';
import { cn } from '../../utils/common.utils';
import BaseFormError from './BaseFormError';

interface IBaseSelectProps {
  form: FieldValues;
  name: string;
  label?: string;
  prefix?: string;
  rules?: Record<string, unknown>;
  items:
    | {
        id: null;
        rid: number | string;
        name: string;
        disabled?: boolean;
        selected?: boolean;
      }[]
    | {
        name: string;
        id: number;
        rid: null;
        disabled?: boolean;
        selected?: boolean;
      }[];
  multiple?: boolean;
  className?: string;
  containerClassName?: string;
  optionClassName?: string;
  disabled?: boolean;
}

const BaseSelect: FC<IBaseSelectProps> = (props) => {
  const {
    form,
    label,
    name,
    rules,
    prefix,
    items,
    multiple,
    className,
    containerClassName,
    optionClassName,
    disabled,
  } = props;

  const {
    fieldState: { error },
  } = useController({
    name,
    control: form.control,
    rules,
  });

  const selectClasses = cn(
    `${prefix}-select w-full mt-1 p-2 border rounded-lg text-text text-sm focus:ring-primary focus:border-primary`,
    error && 'border-error',
    className,
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
          <Dropdown
            {...field}
            className={selectClasses}
            disabled={disabled}
            id={name}
            items={items || []}
            multiple={multiple}
            name={name}
            optionClassName={optionClassName}
          />
        )}
      />
      {error && error.message && <BaseFormError message={error.message} prefix={prefix} />}
    </div>
  );
};

export default BaseSelect;
