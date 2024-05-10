import React from 'react';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import FormError from './FormError';
import { BRAND_PREFIX } from '../../../constants/constants';
import type { IFormElementProps } from '../types';

const FormElement = ({
    errors,
    loginFormData,
    loginFormInput,
    index,
    register,
    setLoginFormData,
}: IFormElementProps) => {
    const loginFormInputs: string[] = ['username', 'password'];

    const getDisplayName = (type: string): string => type === loginFormInputs[0] ? 'Kullanıcı Adı' : 'Şifre';

    return (
        <div className={`${BRAND_PREFIX}-${loginFormInput}-input-container mb-4`} key={index} >
            <Label
                className={`${BRAND_PREFIX}-${loginFormInput}-label block text-sm font-medium text-gray-600`}
                htmlFor={loginFormInput}
                labelText={getDisplayName(loginFormInput)}
            />
            <Input
                className={`${BRAND_PREFIX}-${loginFormInput}-input mt-1 p-2 w-full border focus:ring-primary focus:border-primary rounded-lg text-text text-sm ${BRAND_PREFIX}-login-input`}
                id={loginFormInput}
                name={loginFormInput}
                register={
                    register(
                        loginFormInput, {
                            pattern: {
                                message: `Geçersiz ${getDisplayName(loginFormInput)}.`,
                                // TODO: Add pattern for username email if it need // /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                                value: loginFormInput === loginFormInputs[0]
                                    ? /^.*$/
                                    : /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$.*])/,
                            },
                            required: `${getDisplayName(loginFormInput)} zorunlu bir alandır.`,
                            validate: loginFormInput === loginFormInputs[1]
                                ? {
                                    checkLength: (value: string) => value.length >= 8,
                                    matchPattern: (value: string) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&.*-]).{8,}$/.test(value),
                                }
                                : {},
                            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                setLoginFormData({
                                    ...loginFormData,
                                    [loginFormInput.toLowerCase()]: event.target.value,
                                });
                            },
                        }
                    )
                }
                type={loginFormInput === loginFormInputs[1] ? loginFormInputs[1] : 'text'}
            />
            <FormError errors={errors} loginFormInput={loginFormInput} />
        </div>
    );
};

export default FormElement;
