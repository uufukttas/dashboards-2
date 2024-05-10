import React from 'react';
import type { IFormErrorProps } from '../types';

const FormError = ({ loginFormInput, errors }: IFormErrorProps) => {
    return (
        <div className={`${loginFormInput}-error-wrapper my-4 font-bold text-error`}>
            <p className={`${loginFormInput}-error-message text-error`}>
                {(errors[loginFormInput]?.message?.toString())}
            </p>
        </div>
    );
};

export default FormError;
