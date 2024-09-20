import React from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { Button } from '@projects/button';
import { Image } from '@projects/image';
import { Input } from '@projects/input';
import { Label } from '@projects/label';

const LogoSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
    const companyLogoPrefix: string = `${profilePagePrefix}-company-logo`;

    return (
        <div className={`${companyLogoPrefix}-container flex justify-between items-center`}>
            <form className={`${companyLogoPrefix}-form flex flex-col justify-between w-full`}>
                <div className={`${companyLogoPrefix}-input-container`}>
                    <Label
                        className={`${companyLogoPrefix}-label block mb-2 text-heading font-semibold px-2`}
                        htmlFor={`${companyLogoPrefix}-input`}
                        labelText='Logo'
                    />
                    <Image
                        alt='Company Logo'
                        className='w-full h-full'
                        height={200}
                        src={'/logo.svg'}
                        width={300}
                    />
                    <Input
                        className={`${companyLogoPrefix}-input text-text text-sm rounded-lg block w-full p-2.5 flex flex-col`}
                        id={`${companyLogoPrefix}-input`}
                        name={`${companyLogoPrefix}-input`}
                        type='file'
                    />
                </div>
                <div className={`${companyLogoPrefix}-submit-button-container`}>
                    <Button
                        className={`${companyLogoPrefix}-submit-button w-full p-2 bg-primary text-white rounded-lg my-2`}
                        id={`${companyLogoPrefix}-submit-button`}
                        type='submit'
                    >
                        Logoyu Degistir
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LogoSection;
