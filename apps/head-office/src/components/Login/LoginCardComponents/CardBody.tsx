import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from '../../../constants/constants';
import { useLoginMutation } from 'apps/head-office/app/api/services/auth/auth.service';
import { useRouter } from 'next/navigation';
import BaseInput from '../../Base/BaseInput';

const CardBody: React.FC = () => {
  const loginPrefix: string = `${BRAND_PREFIX}-login`;
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const router = useRouter();
  const [login] = useLoginMutation();

  const handleLoginSubmit = (data: Record<string, string>) => {
    login({
      body: {
        userName: data.username,
        password: data.password,
      },
    })
      .unwrap()
      .then(() => {
        router.push('/dashboards');
      })
      .catch(() => {
        form.reset({});
      });
  };

  return (
    <div className={`${loginPrefix}-form-container`}>
      <form className={`${loginPrefix}-form mb-4`} onSubmit={form.handleSubmit(handleLoginSubmit)}>
        <div className="flex  flex-col gap-4">
          <BaseInput
            id="username"
            type="text"
            form={form}
            name={'username'}
            label="Kullanıcı Adı"
            rules={{
              required: 'Kullanıcı adı zorunlu bir alandır.',
            }}
          />
          <BaseInput
            id="password"
            type="password"
            form={form}
            name={'password'}
            label="Şifre"
            rules={{
              required: 'Şifre Zorunludur.',
            }}
          />
        </div>
        <div className={`${loginPrefix}-submit-button-container mb-4 mt-4`}>
          <Button
            buttonText={'Giriş Yap'}
            className={`${loginPrefix}-submit-button w-full p-2 px-4 font-bold bg-primary text-white hover:bg-primary-lighter`}
            id={`${loginPrefix}-submit-button`}
            type={'submit'}
          />
        </div>
      </form>
    </div>
  );
};

export default CardBody;
