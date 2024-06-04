import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';
import { BRAND_PREFIX } from '../../../../constants/constants';
import { setServicePointInformation } from '../../../../../app/redux/features/servicePointInformation';
import { getCityRequest, getDistrictsRequest } from '../../../../../app/api/servicePoints';
import { RootState } from '../../../../../app/redux/store';
import { IFormDataProps, IModalSecondPageInputsProps } from '../../types';

const ServicePointModalFormSecondPage: React.FC<IModalSecondPageInputsProps> = ({
  activePage,
  cities,
  setActivePage,
  setCities,
  setDistricts,
}: IModalSecondPageInputsProps) => {
  const dispatch = useDispatch();
  const { formState: { errors }, handleSubmit, register } = useForm();
  const servicePointInformation = useSelector((state: RootState) => {
    return state.servicePointInformation.servicePointInformation
  });
  const formName = ['phone-number-1', 'phone-number-2', 'address', 'address-detail'];
  const sectionPrefix = 'service-point';
  const formProperties = {
    phone1: `${sectionPrefix}-${formName[0]}`,
    phone2: `${sectionPrefix}-${formName[1]}`,
    address: `${sectionPrefix}-${formName[2]}`,
    'address-detail': `${sectionPrefix}-${formName[3]}`,
  };
  const [secondPageFormData, setSecondPageFormData] = useState<IFormDataProps>({
    [`${formProperties.phone1}`]: servicePointInformation.phone1 || '',
    [`${formProperties.phone2}`]: servicePointInformation.phone2 || '',
    [`${formProperties.address}`]: servicePointInformation.address || '',
    [`${formProperties['address-detail']}`]: servicePointInformation.addressDetail || '',
  });

  const getCities = async () => {
    const response = await getCityRequest();
    
    setCities(response);
    getDistricts();
  };

  const getDistricts = async () => {
    const response = await getDistrictsRequest(1);

    setDistricts(response);
  };

  const handleFormSubmit: SubmitHandler<IFormDataProps> = () => {
    dispatch(
      setServicePointInformation({
        ...servicePointInformation,
        phone1: secondPageFormData[`${formProperties.phone1}`],
        phone2: secondPageFormData[`${formProperties.phone2}`],
        address: secondPageFormData[`${formProperties.address}`],
        addressDetail: secondPageFormData[`${formProperties['address-detail']}`],
      })
    );

    setActivePage(activePage + 1);
  };

  useEffect(() => {
    if (cities.length === 0) {
      getCities();
    }
  }, [cities]);

  return (
    <form
      className={`${BRAND_PREFIX}-modal-page-2 ${activePage === 2 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${sectionPrefix}-phone-numbers-container`}>
        <Label
          className={`${formProperties.phone1}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${formProperties.phone1}`}
          labelText={`Birinci Telefon Numarasi`} >
          <span className="text-md text-error">*</span>
        </Label>
        <Input
          className={`${formProperties.phone1}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${formProperties.phone1}`}
          name={`${formProperties.phone1}`}
          placeholder={`0555 123 45 67`}
          register={
            register(`${formProperties.phone1}`, {
              required: `Telefon numarasi alani zorunludur.`,
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
              value: secondPageFormData[`${formProperties.phone1}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setSecondPageFormData({
                  ...secondPageFormData,
                  [event.target.name]: event.target.value,
                });
              },
            })}
          type={`number`}
        />
        {
          errors[`${formProperties.phone1}`]
          && errors[`${formProperties.phone1}`]?.message
          && (
            <div className={`${sectionPrefix}-phone-number-error-wrapper my-4 font-bold text-error`}>
              <p className={`${sectionPrefix}-phone-number-error-message text-error`}>
                {(errors[`${formProperties.phone1}`]?.message?.toString())}
              </p>
            </div>
          )}
        <Label
          className={`${formProperties.phone2}-input block mb-2 text-heading font-semibold`}
          htmlFor={`${formProperties.phone2}`}
          labelText={`Ikinci Telefon Numarasi`} />
        <Input
          className={`${formProperties.phone2}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${formProperties.phone2}`}
          name={`${sectionPrefix}${formName[1]}`}
          placeholder={`0555 123 45 67`}
          register={
            register(`${formProperties.phone2}`, {
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
              value: secondPageFormData[`${formProperties.phone2}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setSecondPageFormData({
                  ...secondPageFormData,
                  [event.target.name]: event.target.value,
                });
              },
            })}
          type={`number`}
        />
      </div>
      <div className={`${formProperties.address}-container`}>
        <Label
          className={`${sectionPrefix}-adress-input block mb-2 text-heading font-semibold`}
          htmlFor={`${formProperties.address}`}
          labelText={'Adres'} >
          <span className="text-md text-error">*</span>
        </Label>
        <Textarea
          className={`${formProperties.address}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${formProperties.address}`}
          name={`${formProperties.address}`}
          placeholder={'Cumhuriyet Mahallesi 123.Sokak...'}
          register={
            register(`${formProperties.address}`, {
              required: `Adres zorunludur.`,
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              value: secondPageFormData[`${formProperties.address}`].toString(),
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setSecondPageFormData({
                  ...secondPageFormData,
                  [event.target.name]: event.target.value,
                });
              },
            })}
        />
        {errors[`${formProperties.address}`]
          && errors[`${formProperties.address}`]?.message
          && (
            <div className={`${formProperties.address}-error-wrapper my-4 font-bold text-error`}>
              <p className={`${formProperties.address}-error-message text-error`}>
                {(errors[`${formProperties.address}`]?.message?.toString())}
              </p>
            </div>
          )}
      </div>
      <div className={`${formProperties['address-detail']}-container`}>
        <Label
          className={`${formProperties['address-detail']}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${formProperties['address-detail']}`}
          labelText={'Adres Tarifi'} >
        </Label>
        <Textarea
          className={`${formProperties['address-detail']}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${formProperties['address-detail']}`}
          name={`${formProperties['address-detail']}`}
          placeholder={'Kapı numarası, kat, daire numarası vb...'}
          register={
            register(`${formProperties['address-detail']}`, {
              value: secondPageFormData[`${formProperties['address-detail']}`].toString(),
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setSecondPageFormData({
                  ...secondPageFormData,
                  [event.target.name]: event.target.value,
                });
              },
            })}
        />
      </div>
      <div className={`${sectionPrefix}-buttons-container flex justify-between items-center`}>
        <Button
          buttonText='Geri'
          className={`${sectionPrefix}-prev-button bg-primary text-text text-sm rounded-lg block p-2.5`}
          id={`${sectionPrefix}-prev-button`}
          type={`button`}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Button
          buttonText='Ileri'
          className={`${sectionPrefix}-next-button bg-primary text-text text-sm rounded-lg block p-2.5`}
          id={`${sectionPrefix}-next-button`}
          type={`submit`}
        />
      </div>
    </form >
  );
};

export default ServicePointModalFormSecondPage;
