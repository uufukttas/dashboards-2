import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const AddBrandModal: React.FC = () => {
  const sectionPrefix = `${BRAND_PREFIX}-new-brand-modal`;
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const formName = ['brand-name', 'brand-logo'];
  const formProperties = {
    brandName: `${sectionPrefix}-${formName[0]}`,
    brandLogo: `${sectionPrefix}-${formName[1]}`,
  };

  const handleFormSubmit: SubmitHandler<[]> = () => {
    // handle form submit
  };

  return (
    <div className={`${sectionPrefix}-form-container`}>
      <form className={`${sectionPrefix}-form w-full`} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={`${formProperties.brandName}-container`}>
          <Label
            className={`${formProperties.brandName}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.brandName}`}
            labelText={`Şarj Ünitesi Markası`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Dropdown
            className={`${formProperties.brandName}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${formProperties.brands}`}
            items={brands}
            name={`${formProperties.brands}`}
            onChange={(event) => {
              setChargeUnitFormData({
                ...chargeUnitFormData,
                [event.target.name]: Number(event.target.value),
              });
            }}
            value={chargeUnitFormData[`${formProperties.brandName}`]?.toString()}
          />
        </div>
        <div className={`${formProperties.brandLogo}-container`}>
          <Label
            className={`${formProperties.brandLogo}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.brandLogo}`}
            labelText={`Şarj Ünitesi Markası`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <input type="file" accept="image/*" {...register(`${formProperties.brandLogo}`)} />
        </div>
        <div className={`${sectionPrefix}-buttons-container flex justify-end`}>
          <Button
            buttonText={'Kaydet'}
            className={`charge-unit-submit-button bg-primary text-white rounded-md px-4 py-2`}
            disabled={isDisabled}
            id={`charge-unit-submit-button`}
            type={'submit'}
          />
        </div>
      </form>
    </div>
  );
};

export default AddBrandModal;
