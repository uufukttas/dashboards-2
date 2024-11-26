import { Label } from '@projects/label';
import { MultiSelect } from 'primereact/multiselect';
import { FC } from 'react';
import { Controller, FieldValues, useController } from 'react-hook-form';
import { cn } from '../../utils/common.utils';
import BaseFormError from './BaseFormError';
import './BaseMultiSelect.css';

interface IBaseMultiSelectProps {
  form: FieldValues;
  name: string;
  label?: string;
  prefix?: string;
  rules?: Record<string, unknown>;
  options: any[];
  optionLabel: string;
  optionValue: string;
  placeholder?: string;
  inputClassName?: string;
  containerClassName?: string;
  onChange?: (value: any) => void;
}

const BaseMultiSelect: FC<IBaseMultiSelectProps> = (props) => {
  const {
    form,
    label,
    name,
    rules,
    prefix='base',
    options,
    optionLabel,
    optionValue,
    placeholder,
    inputClassName,
    containerClassName,
    onChange,
    ...rest
  } = props;

  const {
    fieldState: { error },
  } = useController({
    name,
    control: form.control,
    rules,
  });

  const mappedOptions = options.map((option) => ({
    ...option,
    label: option[optionLabel],
    value: option[optionValue],
  }));

  const inputClasses = cn(
    `${prefix}-multiselect w-full mt-1 border focus:border-primary`,
    error && 'border-error',
    inputClassName,
  );

  const containerClasses = cn('mb-4', containerClassName);

  return (
    <div className={containerClasses}>
      {label && (
        <Label className={`${prefix}-label block text-sm font-medium text-gray-600`} htmlFor={name} labelText={label} />
      )}
      <Controller
        control={form.control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange: fieldOnChange, ...field } }) => (
          <MultiSelect
            {...field}
            value={value || []}
            options={options}
            optionLabel={optionLabel}
            optionValue={optionValue}
            placeholder={placeholder || 'Seçiminizi Yapiniz'}
            className={inputClasses}
            onChange={(e) => {
              fieldOnChange(e.value);
              onChange?.(e.value);
            }}
            dropdownIcon={null}
            variant="outlined"
            display="chip"
            {...rest}
          />
        )}
      />
      {error && error.message && <BaseFormError message={error.message} prefix={prefix} />}
    </div>
  );
};

export default BaseMultiSelect;
