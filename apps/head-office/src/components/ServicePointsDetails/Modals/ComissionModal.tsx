import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { Dropdown } from '@projects/dropdown';
import { Radio } from '@projects/radio';

const ComissionModal = () => {
    const sectionPrefix = 'comission-details';
    const [comissionFeatures, setComissionFeatures] = useState<{
        servicePoint: string; reseller: string; chargeUnitReseller: string; breakpoint: string; percent: string
    }>({
        servicePoint: '',
        reseller: '',
        chargeUnitReseller: '',
        breakpoint: '',
        percent: ''
    });
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleFormSubmit = () => {
        console.log('first')
    };

    return (
        <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`} >
            <form
                className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`}
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <div className={`${sectionPrefix}-container`}>
                    <Label
                        className={`${sectionPrefix}-label block mb-2 text-heading font-semibold`}
                        htmlFor={``}
                        labelText={`Enerji Fiyati (kwh/Birim fiyat)`}
                    >
                        <span className="text-md text-error">*</span>
                    </Label>
                    <Dropdown
                        id='comission-details-service-point'
                        name='comission-details-service-point'
                        items={[{ id: 1, name: 'Hizmet Noktasi', rid: null }, { id: 2, name: 'Reseller', rid: null }]}
                    />
                    {errors[`${sectionPrefix}`]
                        && errors[`${sectionPrefix}`]?.message
                        && (
                            <div className={`${sectionPrefix}-error-wrapper my-4 font-bold text-error`}>
                                <p className={`${sectionPrefix}-error-message text-error`}>
                                    {errors[`${sectionPrefix}`]?.message?.toString()}
                                </p>
                            </div>
                        )}

                    <Label
                        className={`${sectionPrefix}-label block mb-2 text-heading font-semibold`}
                        htmlFor={``}
                        labelText={`Cihaz Yatirimcisi Hizmet Noktasi Sahibi mi?`}
                    >
                        <span className="text-md text-error">*</span>
                    </Label>
                    <Radio
                        id='comission-details-charge-unit-reseller'
                        name='comission-details-charge-unit-reseller'
                        className='comission-details-charge-unit-reseller'
                    />
                    <Label
                        className={`${sectionPrefix}-label block mb-2 text-heading font-semibold`}
                        htmlFor={``}
                        labelText={`Alt Kirilmlari seciniz`}
                    />
                    <Dropdown
                        id='comission-details-service-point'
                        name='comission-details-service-point'
                        items={[{ id: 1, name: 'Enerji Bedeli', rid: null }, { id: 2, name: 'KDV', rid: null }, { id: 3, name: 'Hizmet Geliri', rid: null }]}
                    />
                    <Label
                        className={`${sectionPrefix}-label block mb-2 text-heading font-semibold`}
                        htmlFor={``}
                        labelText={`Yuzde`}
                    />
                    <Input
                        className={`${sectionPrefix}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                        id={`${sectionPrefix}-datetime`}
                        name={`${sectionPrefix}-datetime`}
                        type='number'
                    />
                    <Button
                        buttonText='Kaydet'
                        id='addConnectorButton'
                        type='submit'
                        className={`-button bg-primary text-white w-full py-2.5 rounded-lg`}
                    />
                </div>
            </form>
        </div >
    )
}

export default ComissionModal;
