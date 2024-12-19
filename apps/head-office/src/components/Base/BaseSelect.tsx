import { FC, useEffect } from 'react';
import { Controller, FieldValues, useController } from 'react-hook-form';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import BaseFormError from './BaseFormError';
import { BRAND_PREFIX } from '../../constants/constants';
import { cn } from '../../utils/common.utils';

interface IBaseSelectProps {
  form: FieldValues;
  name: string;
  label?: string;
  prefix?: string;
  rules?: Record<string, unknown>;
  id?: string;
  items?: Array<unknown>;
  multiple?: boolean;
  className?: string;
  containerClassName?: string;
  optionClassName?: string;
  disabled?: boolean;
  defaultValue?: string | number;
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
    multiple,
    name,
    optionClassName,
    prefix = BRAND_PREFIX,
    rules,
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
    if (defaultValue) {
      form.setValue(name, defaultValue);
    }
  }, [defaultValue, form, name]);

  return (
    <div className={containerClasses}>
      {label && (
        <Label className={`${prefix}-label block text-sm font-medium text-gray-600`} htmlFor={name} labelText={label} />
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
            onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
              field.onChange(event);
              onChange && onChange(event);
            }}
            optionClassName={optionClassName}
            placeholder="Seçiniz"
          />
        )}
      />
      {error && error.message && <BaseFormError message={error.message} prefix={prefix} />}
    </div>
  );
};

export default BaseSelect;
