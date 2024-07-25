import React from 'react'
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const LanguageSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
    const languagePrefix: string = `${profilePagePrefix}-language`;

    return (
        <div>
            <form className={`${languagePrefix}-form flex items-end justify-between w-full`}>
                <div className={`${languagePrefix}-input-container w-1/3`}>
                    <Label
                        className={`${languagePrefix}-label block mb-2 text-heading font-semibold px-2`}
                        htmlFor={`${languagePrefix}-input`}
                        labelText='Ceviri Icerigi'
                    />
                    <Input
                        className={`${languagePrefix}-input border text-text text-sm rounded-lg block w-full p-2.5 focus:ring-primary focus:border-primary`}
                        id={`${languagePrefix}-input`}
                        name={`${languagePrefix}-input`}
                        type='text'
                    />
                </div>
                <div className={`${languagePrefix}-submit-button-container w-1/3`}>
                    <Button
                        className={`${languagePrefix}-submit-button w-full p-2 bg-primary text-white rounded-lg`}
                        id={`${languagePrefix}-submit-button`}
                        type='submit'
                    >
                        Dil Icerigi Ekle
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LanguageSection;
