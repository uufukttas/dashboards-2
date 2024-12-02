import { Button } from '@projects/button';
// import FormData from 'form-data';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAddDeviceBrandMutation,
  useEditDeviceBrandMutation,
  useGetBrandByIdQuery,
} from '../../../../app/api/services/devices/devices.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import useModalManager from '../../../../src/hooks/useModalManager';
import BaseInput from '../../Base/BaseInput';
import ModalLayout from '../../Modal/Layouts/ModalLayout';


const AddBrandModal: React.FC<{ brandId: number }> = ({ brandId }) => {
  const formNames: string[] = ['brand-name', 'brand-logo'];
  const labels: string[] = ['Marka Adı', 'Marka Logosu'];
  const sectionPrefix = `${BRAND_PREFIX}-brand-modal`;
  const form = useForm();
  const { closeModal } = useModalManager();
  const [brandLogo, setBrandLogo] = useState<File | null>(null);
  const [brandName, setBrandName] = useState<string>('');
  const [addDeviceBrand] = useAddDeviceBrandMutation();
  const [updateDeviceBrand] = useEditDeviceBrandMutation();
  const { data: deviceBrandInfo } = useGetBrandByIdQuery(brandId, { skip: brandId === 0 });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files ? event.target.files[0] : null;

    setBrandLogo(file);
  };
  const handleFormSubmit = async (): Promise<void> => {
    const formData = new FormData();

    formData.append('BrandName', brandName);

    if (brandLogo) {
      formData.append('BrandImageFile', brandLogo);
    }

    if (deviceBrandInfo) {
      formData.append('Id', deviceBrandInfo.id.toString());

      updateDeviceBrand({ body: formData })
        .unwrap()
        .then(() => {
          closeModal('deviceBrandModal');
        });
    } else {
      addDeviceBrand({ body: formData })
        .unwrap()
        .then(() => {
          closeModal('deviceBrandModal');
        });
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('brand-name', event.target.value);

    setBrandName(event.target.value);
  };

  useEffect(() => {
    if (deviceBrandInfo) {
      setBrandName(deviceBrandInfo.name || '');

      form.setValue('brand-name', deviceBrandInfo.name);
    }
  }, [deviceBrandInfo]);

  return (
    <ModalLayout
      className={`md:min-h-[350px]`}
      footerVisible={false}
      name="deviceBrandModal"
      title={`Şarj Ünite Markası ${deviceBrandInfo ? 'Düzenle' : 'Ekle'}`}
    >
      <div className={`${sectionPrefix}-form-container`}>
        <form className={`${sectionPrefix}-form w-full`} onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className={`${sectionPrefix}-form-content`}>
            {formNames.map((formName, index) => {
              return (
                <BaseInput
                  containerClassName="mb-4"
                  form={form}
                  id={`${sectionPrefix}-${formName}`}
                  inputClassName="w-full"
                  key={index}
                  label={labels[index]}
                  name={formNames[index]}
                  prefix={sectionPrefix}
                  rules={{ required: `${labels[index]} zorunlu bir alandır.` }}
                  type={formName === formNames[0] ? 'text' : 'file'}
                  onChange={formName === formNames[0] ? handleInputChange : handleFileChange}
                />
              );
            })}
            <div className={`${sectionPrefix}-form-action-container`}>
              <Button
                className={`${sectionPrefix}-form-action-button w-full p-2 px-4 font-bold bg-primary text-white hover:bg-primary-lighter`}
                id={`${sectionPrefix}-form-action-button`}
                type="submit"
              >
                Kaydet
              </Button>
            </div>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default AddBrandModal;
