import React from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { Button } from '@projects/button';
import { Image } from '@projects/image';
import { Input } from '@projects/input';
import { Label } from '@projects/label';

const BackgroundSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
    const backgroundImagePrefix: string = `${profilePagePrefix}-background-image`;

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('event', event)
    };

    return (
        <div className={`${backgroundImagePrefix}-container flex justify-between items-center`}>
            <form className={`${backgroundImagePrefix}-form flexflex-col justify-between w-full`} onSubmit={handleFormSubmit}>
                <div className={`${backgroundImagePrefix}-input-container`}>
                    <Label
                        className={`${backgroundImagePrefix}-label block mb-2 text-heading font-semibold px-2`}
                        htmlFor={`${backgroundImagePrefix}-input`}
                        labelText='Arka Plan Resmi'
                    />
                    <Image
                        alt='Background Image'
                        className='w-full h-full'
                        height={400}
                        src={'https://placehold.co/600x400'}
                        width={600}
                    />
                    <Input
                        className={`${backgroundImagePrefix}-input text-text text-sm rounded-lg block w-full p-2.5`}
                        id={`${backgroundImagePrefix}-input`}
                        name={`${backgroundImagePrefix}-input`}
                        type='file'
                    />
                </div>
                <div className={`${backgroundImagePrefix}-submit-button-container w-1/3`}>
                    <Button
                        className={`${backgroundImagePrefix}-submit-button w-full p-2 bg-primary text-white rounded-lg my-2`}
                        id={`${backgroundImagePrefix}-submit-button`}
                        type='submit'
                    >
                        Arka Plani Degistir
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BackgroundSection;
