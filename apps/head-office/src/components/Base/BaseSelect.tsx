import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import { FC, useEffect } from 'react';
import { Controller, FieldValues, useController } from 'react-hook-form';
import { BRAND_PREFIX } from '../../constants/constants';
import { cn } from '../../utils/common.utils';
import BaseFormError from './BaseFormError';
import { DropdownChangeEvent } from 'primereact/dropdown';

interface IBaseSelectProps {
  className?: string;
  containerClassName?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  form: FieldValues;
  id?: string;
  items?: Array<unknown>;
  label?: string;
  labelPrefix?: React.ReactNode;
  multiple?: boolean;
  name: string;
  prefix?: string;
  rules?: Record<string, unknown>;
  optionClassName?: string;
  optionLabel?: string;
  optionValue?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const BaseSelect: FC<IBaseSelectProps> = (props) => {
  const {
    className,
    containerClassName,
    defaultValue,
    disabled,
    form,
    id,
    items,
    label,
    labelPrefix,
    multiple,
    name,
    optionClassName,
    optionLabel,
    optionValue,
    prefix = BRAND_PREFIX,
    rules,
    value,
    onChange,
  } = props;
  const {
    fieldState: { error },
  } = useController({ name, control: form.control, rules });

  const selectClasses = cn(
    `${prefix}-select w-full flex mt-1 border border-gray-400 rounded-lg text-text text-sm focus:ring-primary focus:border-primary `,
    error && 'border-error',
    className,
    'flex',
  );

  const containerClasses = cn(' w-full h-20', containerClassName);

  useEffect(() => {
    console.log(defaultValue);

    if (defaultValue) {
      form.setValue(name, defaultValue);
    }
  }, [defaultValue, form, name]);

  return (
    <div className={containerClasses}>
      {label && (
        <div className="flex flex-row items-center gap-2">
          <Label
            className={`${prefix}-label block text-sm font-medium text-gray-600`}
            htmlFor={name}
            labelText={label}
          />
          {labelPrefix && labelPrefix}
        </div>
      )}
      <Controller
        control={form.control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Dropdown
            {...field}
            className={selectClasses}
            disabled={disabled}
            id={id || name}
            // @ts-ignore
            items={items as unknown as Array<Record<string, unknown>>}
            multiple={multiple}
            name={name}
            optionClassName={optionClassName}
            optionLabel={optionLabel}
            optionValue={optionValue}
            placeholder="Seçiniz"
            value={field.value}
            onChange={(event: DropdownChangeEvent): void => {
              field.onChange(event.value);
              // @ts-ignore
              onChange && onChange(event);
            }}
          />
        )}
      />
      {error && error.message && <BaseFormError message={error.message} prefix={prefix} />}
    </div>
  );
};

export default BaseSelect;
