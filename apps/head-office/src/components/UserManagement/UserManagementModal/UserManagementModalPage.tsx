import { CheckboxInDropdown } from '@projects/checkbox-in-dropdown';
import { isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetUserMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
} from '../../../../app/api/services/user/user.service';
import BaseInput from '../../Base/BaseInput';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import { IModalLayoutButtonProps } from '../../Modal/Layouts/ModalLayout.interface';
import { IUserRoleProps } from '../types';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from 'apps/head-office/src/constants/constants';

interface IUserManagementModalPageProps {
  onSuccess?: () => void;
  userId?: number;
}

const UserManagementModalPage: React.FC<IUserManagementModalPageProps> = ({ onSuccess, userId }) => {
  const [getUser, { data: userData }] = useGetUserMutation();

  const [registerUser] = useRegisterUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const form = useForm();
  const [roles, setRoles] = useState<IUserRoleProps[]>([
    {
      id: 1,
      name: 'Admin',
      isChecked: false,
      rid: null,
      stationFeatureType: 0,
      stationFeatureValue: 0,
    },
    {
      id: 2,
      name: 'User',
      isChecked: false,
      rid: null,
      stationFeatureType: 0,
      stationFeatureValue: 0,
    },
    {
      id: 3,
      name: 'Guest',
      isChecked: false,
      rid: null,
      stationFeatureType: 0,
      stationFeatureValue: 0,
    },
  ]);

  const handleFormSubmit = (data: Record<string, unknown>) => {
    if (!data.eMail || !data.name || !data.surname || !data.userName || !data.phoneNumber) {
      return;
    }

    if (isNil(userData)) {
      registerUser({
        body: {
          name: data.name as string,
          surname: data.surname as string,
          userName: data.userName as string,
          eMail: data.eMail as string,
          phoneNumber: data.phoneNumber as string,
          roles: roles.filter((role) => role.isChecked).map((role) => role.name),
          password: 'Admin123!',
          newPassword: 'Admin123!',
        },
      }).unwrap();
      onSuccess && onSuccess();
    } else {
      updateUser({
        body: {
          id: userData?.userId,
          name: data.name as string,
          surname: data.surname as string,
          userName: data.userName as string,
          eMail: data.eMail as string,
          phoneNumber: data.phoneNumber as string,
          roles: roles.filter((role) => role.isChecked).map((role) => role.name),
        },
      });
      onSuccess && onSuccess();
    }

  };

  const prepareUserSelectedRoles = (roles: IUserRoleProps[]): void => {
    userData?.roles?.forEach((role: string) => {
      const roleIndex = roles.findIndex((item: IUserRoleProps) => item.name === role);

      roles[roleIndex].isChecked = true;
    });
  };

  useEffect(() => {
    prepareUserSelectedRoles(roles);
  }, []);

  const modalButtons: IModalLayoutButtonProps[] = [
    {
      key: 'save',
      label: 'Kaydet',
      onClick: form.handleSubmit(handleFormSubmit),
      buttonClassName: 'bg-primary p-2 rounded-md',
      textClassName: 'text-white',
    },
  ];

  useEffect(() => {
    if (userId) {
      getUser({
        body: {
          userId,
        },
      });
    }
  }, [getUser, userId]);

  return (
    <ModalLayout name="userManagement" title="Kullanıcı Yönetimi" buttons={modalButtons}>
      <div className="flex flex-col w-full gap-4">
        <BaseInput
          id={`userName`}
          label="Kullanıcı Adı"
          name={`userName`}
          form={form}
          type="text"
          rules={{
            required: 'Kullanıcı adı zorunludur',
            minLength: {
              value: 3,
              message: 'Kullanıcı adı en az 3 karakter olmalıdır',
            },
          }}
        />
        <div className="flex flex-row gap-4 w-full">
          <BaseInput
            id={`name`}
            label="İsim"
            name={`name`}
            form={form}
            type="text"
            rules={{
              required: 'İsim zorunludur',
              minLength: {
                value: 2,
                message: 'İsim en az 2 karakter olmalıdır',
              },
            }}
          />
          <BaseInput
            id={`surname`}
            label="Soyisim"
            name={`surname`}
            form={form}
            type="text"
            rules={{
              required: 'Soyisim zorunludur',
              minLength: {
                value: 2,
                message: 'Soyisim en az 2 karakter olmalıdır',
              },
            }}
          />
        </div>
        <BaseInput
          id={`eMail`}
          label="E-Mail"
          name={`eMail`}
          form={form}
          type="email"
          rules={{
            required: 'E-posta adresi zorunludur',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Geçerli bir e-posta adresi giriniz',
            },
          }}
        />
        <BaseInput
          id={`phoneNumber`}
          label="Telefon"
          name={`phoneNumber`}
          form={form}
          type="tel"
          rules={{
            required: 'Telefon numarası zorunludur',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Geçerli bir telefon numarası giriniz (10 haneli)',
            },
          }}
        />
        <CheckboxInDropdown
          className="border text-text text-sm rounded-lg block w-full mb-4 focus:ring-primary focus:border-primary"
          id={`roles`}
          inputName={`roles`}
          items={roles}
          onChange={(role) => {
            const updatedRoles = role.map((item) => ({
              id: item.id || 0,
              name: item.name,
              isChecked: item.isChecked || false,
              rid: null,
              stationFeatureType: item.stationFeatureType,
              stationFeatureValue: item.stationFeatureValue,
            }));
            setRoles(updatedRoles);
          }}
        />
        <div className={`${BRAND_PREFIX}-user-management-modal-buttons-container flex flex-row gap-4`}>
          <Button
            className={`${BRAND_PREFIX}-user-management-modal-buttons-container-button bg-primary text-white text-sm rounded-lg block p-2.5`}
            id="addTariff"
            type="button"
            buttonText="Kullanıcı Ekle"
            onClick={() => form.handleSubmit(handleFormSubmit)()}
          />
        </div>
      </div>
    </ModalLayout>
  );
};

export default UserManagementModalPage;
