import { Button } from '@projects/button';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAddDeviceConnectorMutation,
  useEditDeviceConnectorMutation,
  useGetBrandByIdQuery,
  useGetConnectorByIdQuery,
  useGetConnectorTypesQuery,
  useGetDeviceModelByIdQuery,
} from '../../../../app/api/services/devices/devices.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import useModalManager from '../../../../src/hooks/useModalManager';
import BaseInput from '../../Base/BaseInput';
import BaseSelect from '../../Base/BaseSelect';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import { IConnectorRequestBody } from '../types';

const AddConnectorModal = ({
  brandId,
  connectorId,
  connectorTypeId,
  isAc,
  modelId,
}: {
  brandId: number;
  connectorId: number;
  connectorTypeId: number;
  isAc: boolean;
  modelId: number;
}) => {
  const sectionPrefix = `${BRAND_PREFIX}-new-connector-modal`;
  const formNames = ['brand-name', 'model-name', 'connector-type', 'connector-kw', 'device-type'];
  const labels = ['Marka', 'Model', 'Konnektör Tipi', 'Konnektör KW', 'AC'];
  const form = useForm();
  const { closeModal } = useModalManager();
  const { data: deviceBrandInfo } = useGetBrandByIdQuery(brandId, { skip: brandId === 0 });
  const { data: deviceConnectorInfo } = useGetConnectorByIdQuery(connectorId, { skip: connectorId === 0 });
  const { data: deviceModelInfo } = useGetDeviceModelByIdQuery(modelId, { skip: modelId === 0 });
  const { data: deviceConnectorTypes } = useGetConnectorTypesQuery(null);
  const [addDeviceConnector] = useAddDeviceConnectorMutation();
  const [editDeviceConnector] = useEditDeviceConnectorMutation();

  const handleFormSubmit = (data: Record<string, unknown>) => {
    const requestBody: IConnectorRequestBody = {
      // @ts-ignore
      ac: data['device-type'] || false,
      // @ts-ignore
      id: deviceConnectorInfo && deviceConnectorInfo.id,
      kwh: Number(form.getValues('connector-kw')),
      stationChargePointModelID: modelId,
      stationChargePointConnectorTypeID: Number(data['connector-type']),
    };

    if (deviceConnectorInfo) {
      // @ts-ignore
      editDeviceConnector({ body: requestBody })
        .unwrap()
        .then(() => {
          closeModal('deviceConnectorModal');
        });
    } else {
      // @ts-ignore
      addDeviceConnector({ body: requestBody })
        .unwrap()
        .then(() => {
          closeModal('deviceConnectorModal');
        });
    }
  };

  useEffect(() => {
    if (deviceBrandInfo) {
      form.setValue('brand-name', deviceBrandInfo?.name);
    }

    if (deviceModelInfo) {
      // @ts-ignore
      form.setValue('model-name', deviceModelInfo.name);
    }

    if (deviceConnectorInfo) {
      // @ts-ignore
      form.setValue('connector-type', deviceConnectorInfo.stationChargePointConnectorTypeID);
      // @ts-ignore
      form.setValue('connector-kw', deviceConnectorInfo.kwh);
      // @ts-ignore
      form.setValue('device-type', deviceConnectorInfo.ac);
    }
  }, [deviceBrandInfo, deviceModelInfo, deviceConnectorInfo]);

  return (
    <ModalLayout
      className="md:min-h-[400px]"
      footerVisible={false}
      name="deviceConnectorModal"
      title={`Konnektör ${deviceConnectorInfo ? 'Düzenle' : 'Ekle'}`}
    >
      <div className={`${sectionPrefix}-form-container`}>
        <form className={`${sectionPrefix}-form w-full`} onSubmit={form.handleSubmit(handleFormSubmit)}>
          {formNames.map((formName, index) => {
            return formName === 'connector-type' ? (
              <BaseSelect
                containerClassName="mb-4"
                form={form}
                key={index}
                label={labels[index]}
                name={formName}
                prefix={sectionPrefix}
                items={deviceConnectorTypes || []}
                rules={{ required: `${labels[index]} zorunlu bir alandır.` }}
              />
            ) : (
              <BaseInput
                containerClassName={`mb-4`}
                disabled={formName === formNames[0] || formName === formNames[1]}
                form={form}
                id={`${sectionPrefix}-${formName}`}
                inputClassName={`${
                  formName === 'device-type'
                    ? ''
                    : `w-full ${formName === formNames[0] || formName === formNames[1] ? 'bg-gray-300' : ''}`
                }`}
                key={index}
                label={labels[index]}
                name={formName}
                prefix={sectionPrefix}
                rules={{ required: formName === 'device-type' ? '' : `${labels[index]} zorunlu bir alandır.` }}
                type={formName === 'device-type' ? 'checkbox' : 'text'}
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

export default AddConnectorModal;
