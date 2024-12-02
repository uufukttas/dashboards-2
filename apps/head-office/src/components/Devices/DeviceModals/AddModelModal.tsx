import { Button } from '@projects/button';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAddDeviceModelMutation,
  useEditDeviceModelMutation,
  useGetBrandByIdQuery,
  useGetDeviceModelByIdQuery,
} from '../../../../app/api/services/devices/devices.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import useModalManager from '../../../../src/hooks/useModalManager';
import BaseInput from '../../Base/BaseInput';
import ModalLayout from '../../Modal/Layouts/ModalLayout';

const AddModelModal = ({ brandId, modelId }: { brandId: number; modelId: number }) => {
  const formNames = ['brand-name', 'model-name', 'unit-image'];
  const labels = ['Marka Adı', 'Model Adı', 'Model Logosu'];
  const sectionPrefix = `${BRAND_PREFIX}-new-model-modal`;
  const form = useForm();
  const { closeModal } = useModalManager();
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [modelName, setModelName] = useState<string>('');
  const { data: deviceBrandInfo } = useGetBrandByIdQuery(brandId, { skip: brandId === 0 });
  const { data: deviceModelInfo } = useGetDeviceModelByIdQuery(modelId, { skip: modelId === 0 });
  const [addDeviceModel] = useAddDeviceModelMutation();
  const [editDeviceModel] = useEditDeviceModelMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
  
    setModelImage(file);
  };
  const handleFormSubmit = () => {
    const formData = new FormData();

    formData.append('ModelName', modelName);
    // @ts-ignore
    formData.append('BrandId', brandId);

    if (modelImage) {
      formData.append('ModelImageFile', modelImage);
    }

    if (deviceModelInfo) {
      // @ts-ignore
      formData.append('Id', deviceModelInfo.id);

      editDeviceModel({ body: formData })
        .unwrap()
        .then(() => {
          closeModal('deviceModelModal');
        });
    } else {
      addDeviceModel({ body: formData })
        .unwrap()
        .then(() => {
          closeModal('deviceModelModal');
        });
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('model-name', e.target.value);

    setModelName(e.target.value);
  };

  useEffect(() => {
    if (deviceBrandInfo) {
      form.setValue('brand-name', deviceBrandInfo?.name);
    }

    if (deviceModelInfo) {
      // @ts-ignore
      form.setValue('model-name', deviceModelInfo?.name);
    }
  }, [deviceBrandInfo, deviceModelInfo]);

  return (
    <ModalLayout
      className="md:min-h-[400px]"
      footerVisible={false}
      name="deviceModelModal"
      title={`Şarj Cihazı Modeli ${deviceModelInfo ? 'Düzenle' : 'Ekle'}`}
    >
      <div className={`${sectionPrefix}-form-container`}>
        <form className={`${sectionPrefix}-form w-full`} onSubmit={form.handleSubmit(handleFormSubmit)}>
          {formNames.map((formName, index) => {
            return (
              <BaseInput
                containerClassName={`mb-4`}
                disabled={formName === formNames[0]}
                form={form}
                id={`${sectionPrefix}-${formName}`}
                inputClassName={`w-full ${formName === formNames[0] ? 'bg-gray-300' : ''}`}
                key={index}
                label={ labels[index] }
                name={formName}
                prefix={sectionPrefix}
                rules={{ required: `${labels[index]} alanı zorunludur.`}}
                type={formName === formNames[0] || formName === formNames[1] ? 'text' : 'file'}
                onChange={formName === formNames[1] ? handleInputChange : handleFileChange}
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
        </form>
      </div>
    </ModalLayout>
  );
};

export default AddModelModal;
