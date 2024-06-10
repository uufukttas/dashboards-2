import React from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import type { IFormErrorProps } from '../types';

const FormError: React.FC<IFormErrorProps> = ({ loginFormInput, errors }: IFormErrorProps) => {
    const loginFormInputErrorPrefix: string = `${BRAND_PREFIX}-${loginFormInput}-error`;

    return (
        <div className={`${loginFormInputErrorPrefix}-wrapper my-4 font-bold text-error`}>
            <p className={`${loginFormInputErrorPrefix}-message text-error`}>
                {(errors[loginFormInput]?.message?.toString())}
            </p>
        </div>
    );
};

export default FormError;
