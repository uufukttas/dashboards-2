import React from 'react';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const PasswordSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
    const passwordPrefix: string = `${profilePagePrefix}-password`;

    return (
        <div className={`${passwordPrefix}-form-container flex justify-between items-center`}>
            <form className={`${passwordPrefix}-form flex items-end justify-between w-full`}>
                <div className={`${passwordPrefix}-input-container w-1/3`}>
                    <Label
                        className={`${passwordPrefix}-label block mb-2 text-heading font-semibold px-2`}
                        htmlFor={`${passwordPrefix}-input`}
                        labelText='Yeni Şifre'
                    />
                    <Input
                        className={`${passwordPrefix}-input border text-text text-sm rounded-lg block w-full p-2.5 focus:ring-primary focus:border-primary`}
                        id={`${passwordPrefix}-input`}
                        name={`${passwordPrefix}-input`}
                        type='password'
                    />
                </div>
                <div className={`${passwordPrefix}-submit-button-container w-1/3`}>
                    <Button
                        className={`${passwordPrefix}-submit-button w-full p-2 bg-primary text-white rounded-lg`}
                        id={`${passwordPrefix}-submit-button`}
                        type='submit'
                    >
                        Şifreyi Değiştir
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PasswordSection;
