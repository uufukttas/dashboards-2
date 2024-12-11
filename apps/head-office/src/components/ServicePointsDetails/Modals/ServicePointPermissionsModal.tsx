import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@projects/button';
import BaseInput from '../../Base/BaseInput';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import { useAddChargePointUserPermissionMutation } from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import useModalManager from '../../../../src/hooks/useModalManager';
import type { IStationIdProps } from '../types';

const ServicePointPermissionsModal: React.FC<IStationIdProps> = ({ stationId }: IStationIdProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-permission-modal`;
  const { closeModal } = useModalManager();
  const [addChargePointPermission] = useAddChargePointUserPermissionMutation();
  const form = useForm();
  const [permissionProperties, setPermissionProperties] = useState({
    name: '',
    surname: '',
    phoneNumber: '',
  });

  const handleFormSubmit = async () => {
    await addChargePointPermission({
      body: {
        name: permissionProperties.name,
        surname: permissionProperties.surname,
        phoneNumber: permissionProperties.phoneNumber,
        stationId,
      },
    });

    closeModal('addServicePointPermissionModal');
  };

  return (
    <ModalLayout className={`${sectionPrefix}-modal`} name="addServicePointPermissionModal" title={`Yeni Yetkili Ekle`}>
      <div className={`${sectionPrefix}-form-container w-full relative p-6 bg-white rounded-lg`}>
        <form className={`${sectionPrefix}-form w-full`} onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className={`${sectionPrefix}-container`}>
            <div className={`${sectionPrefix}-name-lastname-container flex w-full flex-row justify-between`}>
              <div className={`${sectionPrefix}-name-container w-1/2 mr-2`}>
                <BaseInput
                  containerClassName={`${sectionPrefix}-name-label block mb-2 text-heading font-semibold`}
                  form={form}
                  id={`${sectionPrefix}-name`}
                  inputClassName={`${sectionPrefix}-name-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                  label={`Yetkili İsim`}
                  name={`${sectionPrefix}-name`}
                  rules={{ required: `İsim zorunludur.` }}
                  type={`text`}
                  onChange={(event) => setPermissionProperties({ ...permissionProperties, name: event.target.value })}
                />
              </div>
              <div className={`${sectionPrefix}-surname-container w-1/2 ml-2`}>
                <BaseInput
                  containerClassName={`${sectionPrefix}-surname-label block mb-2 text-heading font-semibold`}
                  form={form}
                  id={`${sectionPrefix}-surname`}
                  inputClassName={`${sectionPrefix}-surname-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                  label={`Yetkili Soyisim`}
                  name={`${sectionPrefix}-surname`}
                  rules={{ required: `Soyisim zorunludur.` }}
                  type={`text`}
                  onChange={(event) =>
                    setPermissionProperties({ ...permissionProperties, surname: event.target.value })
                  }
                />
              </div>
            </div>
            <div className={`${sectionPrefix}-phone-container`}>
              <BaseInput
                containerClassName={`${sectionPrefix}-phone-label block mb-2 text-heading font-semibold`}
                form={form}
                id={`${sectionPrefix}-phone-number`}
                inputClassName={`${sectionPrefix}-phone-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                label={`Yetkili Telefon Numarasi`}
                name={`${sectionPrefix}-phone-number`}
                rules={{
                  min: {
                    value: 10,
                    message: `Telefon numarasi icin en az 10 karakter girmelisiniz.`,
                  },
                  required: `Telefon numarasi zorunludur.`,
                }}
                type={`number`}
                onChange={(event) =>
                  setPermissionProperties({ ...permissionProperties, phoneNumber: event.target.value })
                }
              />
            </div>
            <div className={`${sectionPrefix}-action-button-container flex items-center gap-2`}>
              <Button
                buttonText="Kaydet"
                className={`${sectionPrefix}-button bg-primary text-white w-full py-2.5 rounded-lg`}
                id="addPermissionPhoneNmber"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default ServicePointPermissionsModal;
