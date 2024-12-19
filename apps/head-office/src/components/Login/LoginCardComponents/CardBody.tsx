import { Button } from '@projects/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../../../app/api/services/auth/auth.service';
import { BRAND_PREFIX } from '../../../constants/constants';
import BaseInput from '../../Base/BaseInput';

const CardBody: React.FC = () => {
  const loginPrefix: string = `${BRAND_PREFIX}-login`;
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const [login] = useLoginMutation();
  const router = useRouter();

  const handleLoginSubmit = (data: Record<string, string>) => {
    login({
      body: {
        userName: data.username,
        password: data.password,
      },
    })
      .unwrap()
      .then(() => {
        router.replace('/dashboards');
      })
      .catch(() => {
        form.reset({});
      });
  };

  return (
    <div className={`${loginPrefix}-form-container`}>
      <form className={`${loginPrefix}-form mb-4`} onSubmit={form.handleSubmit(handleLoginSubmit)}>
        <div className="flex flex-col gap-4">
          <div className={`${loginPrefix}-form-username-container text-center text-2xl font-bold`}>
            <BaseInput
              containerClassName="flex flex-col items-start font-normal"
              id="username"
              type="text"
              form={form}
              name={'username'}
              label="Kullanıcı Adı"
              labelClassName="flex"
              prefix={`${loginPrefix}-form-username`}
              rules={{
                required: 'Kullanıcı adı zorunlu bir alandır.',
              }}
            />
          </div>
          <div className={`${loginPrefix}-form-password-container text-center text-2xl font-bold`}>
            <BaseInput
              containerClassName="flex flex-col items-start font-normal"
              id="password"
              type="password"
              form={form}
              name={'password'}
              label="Şifre"
              labelClassName="flex"
              prefix={`${loginPrefix}-form-password`}
              rules={{
                required: 'Şifre Zorunludur.',
              }}
            />
          </div>
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
