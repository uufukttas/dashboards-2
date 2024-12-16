import React from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@projects/card';
import CardBody from './LoginCardComponents/CardBody';
import CardFooter from './LoginCardComponents/CardFooter';
import CardHeader from './LoginCardComponents/CardHeader';
import BaseSelect from '../Base/BaseSelect';
import { BRAND_PREFIX } from '../../constants/constants';
import { useGetLanaugeListQuery } from '../../../app/api/services/static/static.service';
import './Login.css';

const Login: React.FC = () => {
  const loginPrefix: string = `${BRAND_PREFIX}-login`;
  const { data: languages } = useGetLanaugeListQuery({});
  const form = useForm();

  return (
    languages && (
      <div className={`${loginPrefix}-side-container flex flex-col justify-between w-full px-8 py-4 h-screen`}>
        <div className={`${loginPrefix}-language-option-container flex justify-end`}>
          <BaseSelect
            className={`${loginPrefix}-language-dropdown block w-1/2 p-2.5 border rounded-lg text-text text-sm focus:ring-primary focus:border-primary`}
            defaultValue={languages[0].id}
            form={form}
            id={`${loginPrefix}-language-dropdown`}
            items={languages}
            name={`${loginPrefix}-language-dropdown`}
          />
        </div>
        <div className={`${loginPrefix}-card-form-container flex justify-center`}>
          <Card BRAND_PREFIX={BRAND_PREFIX} containerClassName={`w-full md:w-1/2 lg:w-full p-8 bg-white`}>
            <CardHeader />
            <CardBody />
            <CardFooter />
          </Card>
        </div>
        <div className={`${loginPrefix}-footer-container`}>
          <p className={`${loginPrefix}-footer`}></p>
        </div>
      </div>
    )
  );
};

export default Login;
