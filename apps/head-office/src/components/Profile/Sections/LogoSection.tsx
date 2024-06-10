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
            <form className={`${companyLogoPrefix}-form flex items-end justify-between w-full`}>
                <div className={`${companyLogoPrefix}-input-container w-1/3`}>
                    <Label
                        className={`${companyLogoPrefix}-label block mb-2 text-heading font-semibold px-2`}
                        htmlFor={`${companyLogoPrefix}-input`}
                        labelText='Logo'
                    />
                    <Image
                        alt='Company Logo'
                        className='w-full h-full'
                        height={400}
                        src={'https://placehold.co/600x400'}
                        width={600}
                    />
                    <Input
                        className={`${companyLogoPrefix}-input text-text text-sm rounded-lg block w-full p-2.5`}
                        id={`${companyLogoPrefix}-input`}
                        name={`${companyLogoPrefix}-input`}
                        type='file'
                    />
                </div>
                <div className={`${companyLogoPrefix}-submit-button-container w-1/3`}>
                    <Button
                        className={`${companyLogoPrefix}-submit-button w-full p-2 bg-primary text-white rounded-lg`}
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
