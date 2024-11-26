import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const AddBrandModal = () => {
  const sectionPrefix = `${BRAND_PREFIX}-new-brand-modal`;
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const formName = ['brand-name', 'model-name', 'model-image'];
  const formProperties = {
    brandName: `${sectionPrefix}-${formName[0]}`,
    modelName: `${sectionPrefix}-${formName[1]}`,
    modelImage: `${sectionPrefix}-${formName[2]}`,
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
          <Input
            className={`${formProperties.brandName}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            disabled
            id={`${formProperties.brandName}`}
            type={'text'}
            {...register(`${formProperties.brandName}`)}
          />
        </div>
        <div className={`${formProperties.modelName}-container`}>
          <Label
            className={`${formProperties.modelName}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.modelName}`}
            labelText={`Şarj Ünitesi Modeli`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Input
            className={`${formProperties.modelName}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${formProperties.modelName}`}
            type="text"
            {...register(`${formProperties.modelName}`)}
          />
        </div>
        <div className={`${formProperties.modelImage}-container`}>
          <Label
            className={`${formProperties.modelImage}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties.modelImage}`}
            labelText={`Şarj Ünitesi Modeli`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <input type="file" accept="image/*" {...register(`${formProperties.modelImage}`)} />
        </div>
        <div className={`${sectionPrefix}-buttons-container flex justify-end`}>
          <Button
            buttonText={'Kaydet'}
            className={`charge-unit-submit-button bg-primary text-white rounded-md px-4 py-2`}
            id={`charge-unit-submit-button`}
            type={'submit'}
          />
        </div>
      </form>
    </div>
  );
};

export default AddBrandModal;
