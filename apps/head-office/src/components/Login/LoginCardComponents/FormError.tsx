import React from 'react';
import type { IFormErrorProps } from '../types';

const FormError = ({ loginFormInput, errors }: IFormErrorProps) => {
    const loginFormInputErrorPrefix = `${loginFormInput}-error`;

    return (
        <div className={`${loginFormInputErrorPrefix}-wrapper my-4 font-bold text-error`}>
            <p className={`${loginFormInputErrorPrefix}-message text-error`}>
                {(errors[loginFormInput]?.message?.toString())}
            </p>
        </div>
    );
};

export default FormError;
