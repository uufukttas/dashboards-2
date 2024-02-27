import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';

interface IFormData {
  [key: string]: string | number;
};

interface IModalPageInputs {
  activePage: number;
};

const ServicePointModalFormSecondPage = ({ activePage }: IModalPageInputs) => {
  const [formData, setFormData] = useState<IFormData>({});
  const { formState: { errors }, handleSubmit, register } = useForm();

  const handleFormSubmit: SubmitHandler<IFormData> = () => {
    console.log('formData', formData)
  };

  return (
    <form className={`sh-modal-page-2 ${activePage === 0 ? 'block' : 'hidden'}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`service-point-phone-numbers-container`}>
        <Label htmlFor={`service-point-phone-number-1`} labelText={`Hizmet Noktasi Telefon Numarasi`} className={`block mb-2 text-sm font-medium text-gray-900`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Input
          ariaInvalid={true}
          id={`service-point-phone-number-1`}
          name={`service-point-phone-number-1`}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          type={`number`}
          placeholder={`05551234567`}
          register={register('service-point-phone-number-1', {
            required: `Telefon numarasi alani zorunludur.`,
            minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
            maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
            value: formData['service-point-phone-number-1'],
            onChange: (event) => { setFormData({ ...formData, [event.target.name]: event.target.value }) },
          })}
        />
        {errors['service-point-phone-number-1'] && errors['service-point-phone-number-1']?.message && (
          <div className={`service-point-phone-number-error-wrapper my-4 font-bold text-error`}>
            <p className={`service-point-phone-number-error-message`}>
              {(errors['service-point-phone-number-1']?.message?.toString())}
            </p>
          </div>
        )}
        <Label htmlFor={`service-point-phone-number-2`} labelText={`Hizmet Noktasi Telefon Numarasi`} className={`block mb-2 text-sm font-medium text-gray-900`} />
        <Input
          ariaInvalid={true}
          id={`service-point-phone-number-2`}
          name={`service-point-phone-number-2`}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          type={`number`}
          placeholder={`05551234567`}
          value={formData['service-point-phone-number-2']}
          onChange={(event) => { setFormData({ ...formData, [event.target.name]: event.target.value }) }}
        />
      </div>
      <div className={`service-point-address-container`}>
        <Label htmlFor={`service-point-address`} labelText={'Hizmet Noktasi Adresi'} className={`block mb-2 text-sm font-medium text-gray-900`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Textarea
          id={'service-point-address'}
          name={'service-point-address'}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          placeholder={'Cumhuriyet Mahallesi 123.Sokak...'}
          register={register('service-point-address', {
            required: `Hizmet Noktasi Adresi zorunludur.`,
            minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
            onChange: (event) => { setFormData({ ...formData, ['service-point-address']: event.target.value }) },
            value: formData['service-point-address']
          })}
        />
        {errors['service-point-address'] && errors['service-point-address']?.message && (
          <div className={`service-point-address-error-wrapper my-4 font-bold text-error`}>
            <p className={`service-point-address-error-message`}>
              {(errors['service-point-address']?.message?.toString())}
            </p>
          </div>
        )}
      </div>
      <div className={`service-point-buttons-container flex justify-between items-center`}>
        <Button
          buttonText='Geri'
          className={`bg-blue-500 border text-gray-900 text-sm rounded-lg block w-1/4 p-2.5`}
          type={`submit`}
        />
        <Button
          buttonText='Ileri'
          className={`bg-blue-500 border text-gray-900 text-sm rounded-lg block w-1/4 p-2.5`}
          type={`submit`}
        />
      </div>
    </form >
  )
};

export default ServicePointModalFormSecondPage;