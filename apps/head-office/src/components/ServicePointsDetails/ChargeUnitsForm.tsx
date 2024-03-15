import React, { useState } from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import { Button } from '@projects/button';
import { Checkbox } from '@projects/checkbox';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';

interface IChargeUnitsFormProps {
    brand: string;
    ocppVersion: string;
    isFree: boolean;
    isLimited: boolean;
    investor: string;
    status: string;
    accessType: string;
    location: string;
};

const initialChargeUnitsFormDataState = {
    brand: '',
    ocppVersion: '',
    isFree: false,
    isLimited: false,
    investor: '',
    status: '',
    accessType: '',
    location: '',
};

const ChargeUnitsForm = () => {
    const [chargeUnitsFormData, setChargeUnitsFormData] =
        useState<IChargeUnitsFormProps>(initialChargeUnitsFormDataState);
    const brand = [
        {
            rid: null,
            id: 1,
            name: "ABB"
        },
        {
            rid: null,
            id: 2,
            name: "Aspower"
        },
        {
            rid: null,
            id: 3,
            name: "Autel"
        },
        {
            rid: null,
            id: 4,
            name: "Chaevi"
        },
        {
            rid: null,
            id: 5,
            name: "Circontrol"
        },
        {
            rid: null,
            id: 6,
            name: "Eaton"
        },
        {
            rid: null,
            id: 7,
            name: "Gersan"
        },
        {
            rid: null,
            id: 8,
            name: "OPT1"
        },
        {
            rid: null,
            id: 9,
            name: "OPT2"
        },
        {
            rid: null,
            id: 10,
            name: "Porsche"
        },
        {
            rid: null,
            id: 11,
            name: "Roaming"
        },
        {
            rid: null,
            id: 12,
            name: "Schneider"
        },
        {
            rid: null,
            id: 13,
            name: "Setec"
        },
        {
            rid: null,
            id: 14,
            name: "Siemens"
        },
        {
            rid: null,
            id: 15,
            name: "Sinexcel"
        },
        {
            rid: null,
            id: 16,
            name: "StarCharge"
        },
        {
            rid: null,
            id: 17,
            name: "Vestel"
        },
        {
            rid: null,
            id: 18,
            name: "Voltrun"
        },
        {
            rid: null,
            id: 19,
            name: "Wallbox"
        },
        {
            rid: null,
            id: 20,
            name: "XCharge"
        }
    ];

    const handleSubmit = () => {

    };

    return (
        <div className='charge-units-modal-form-container relative p-6 bg-white rounded-lg '>
            <form
                className={`${BRAND_PREFIX}-modal-form`}
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }
                }
            >
                <div className={`charge-units-container`}>
                    <Label
                        className="charge-units-brand-label block mb-2 text-heading font-semibold"
                        htmlFor={'charge-units-brand'}
                        labelText={'Şarj Ünitesi Markasi'}
                    />
                    <Dropdown
                        className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
                        id={'charge-units-brand'}
                        items={brand}
                        name="charge-units-brand"
                        onChange={(event) => {
                            setChargeUnitsFormData({ ...chargeUnitsFormData, brand: event.target.value })
                        }}
                    />
                </div>
                <div className='charge-units-ocpp-version-container'>
                    <Label
                        className="charge-units-ocpp-version-label block mb-2 text-heading font-semibold"
                        htmlFor={'charge-units-ocpp-version'}
                        labelText={'OCPP Versiyon'}
                    />
                    <Dropdown
                        className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
                        id={'charge-units-ocpp-version'}
                        items={[{ id: 1, name: 'v1.6', rid: null }, { id: 2, name: 'v2.1', rid: null }]}
                        name="charge-units-ocpp-version"
                        onChange={(event) => {
                            setChargeUnitsFormData({ ...chargeUnitsFormData, ocppVersion: event.target.value })
                        }}
                    />
                </div>
                <div className={`charge-units-free-usage-container inline-flex flex-col w-1/2`}>
                    <h3 className="charge-units-free-usage-label block mb-2 text-heading font-semibold" id={'charge-units-free-usage'}>
                        Ücretsiz Kullanım
                    </h3>
                    <div className='charge-units-free-usage-inputs-container flex'>
                        <div className='charge-units-free-usage-option-container flex w-1/2 items-center mb-4'>
                            <Label
                                className="charge-units-is-free-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                                htmlFor={'charge-units-is-free-yes'}
                                labelText={'Var'}
                            />
                            <Checkbox
                                className="charge-units-is-free text-blue-500 text-sm block"
                                id={'charge-units-is-free-yes'}
                                name={'charge-units-is-free'}
                                onChange={(event) => {
                                    setChargeUnitsFormData({
                                        ...chargeUnitsFormData, isFree: event.target.checked
                                    })
                                }}
                            />
                        </div>

                    </div>
                </div>
                <div className='charge-units-limited-usage-container inline-flex flex-col w-1/2'>
                    <h3 className="charge-units-limited-usage-label block mb-2 text-heading font-semibold" id={'charge-units-limited-usage'}>
                        Sınırlı Kullanım
                    </h3>
                    <div className='charge-units-limited-usage-inputs-container flex'>
                        <div className='charge-units-limited-usage-option-container flex w-1/2 items-center mb-4'>
                            <Label
                                className="charge-units-is-limited-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                                htmlFor={'charge-units-is-limited-yes'}
                                labelText={'Var'}
                            />
                            <Checkbox
                                className="charge-units-is-limited text-blue-500 text-sm block"
                                id={'charge-units-is-limited-yes'}
                                name={'charge-units-is-limited'}
                                onChange={(event) => {
                                    setChargeUnitsFormData({
                                        ...chargeUnitsFormData, isLimited: event.target.checked
                                    })

                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='charge-units-investor-container'>
                    <Label
                        className="charge-units-investor-label block mb-2 text-heading font-semibold"
                        htmlFor={'charge-units-investor'}
                        labelText={'Yatırımcı'}
                    />
                    <Dropdown
                        className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
                        id={'charge-units-investor '}
                        items={[{ id: 1, name: 'Operator', rid: null }, { id: 2, name: 'Reseller', rid: null }, { id: 3, name: 'Hizmet Noktasi', rid: null }]}
                        name="charge-units-investor"
                        onChange={(event) => {
                            setChargeUnitsFormData({ ...chargeUnitsFormData, investor: event.target.value })

                        }}
                    />
                </div>
                <div className='charge-units-status-container'>
                    <Label
                        className="charge-units-status-label block mb-2 text-heading font-semibold"
                        htmlFor={'charge-units-status'}
                        labelText={'Durum'}
                    />
                    <Dropdown
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4'
                        id={'charge-units-status'}
                        items={[
                            {
                                id: 1,
                                name: 'Arizali',
                                rid: null
                            }, {
                                id: 2,
                                name: 'Bakimda',
                                rid: null
                            }, {
                                id: 3,
                                name: 'Bilgilendirme',
                                rid: null
                            }, {
                                id: 4,
                                name: 'Kullanilabilir',
                                rid: null
                            }, {
                                id: 5,
                                name: 'Mesgul',
                                rid: null
                            }, {
                                id: 6,
                                name: 'Planlanmis',
                                rid: null
                            }, {
                                id: 7,
                                name: 'Standalone',
                                rid: null
                            }
                        ]}
                        name="charge-units-status"
                        onChange={(event) => {
                            setChargeUnitsFormData({ ...chargeUnitsFormData, status: event.target.value })
                        }}
                    />
                </div>
                <div className='charge-units-access-type-container'>
                    <Label
                        className="charge-units-access-type-label block mb-2 text-heading font-semibold"
                        htmlFor={'charge-units-access-type'}
                        labelText={'Erisim Tipi'}
                    />
                    <Dropdown
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4'
                        id={'charge-units-access-type'}
                        items={[
                            {
                                id: 1,
                                name: 'Herkese Acik',
                                rid: null
                            }, {
                                id: 2,
                                name: 'Tesise Ozel',
                                rid: null
                            }, {
                                id: 3,
                                name: 'Ozel Kullanim',
                                rid: null
                            }, {
                                id: 4,
                                name: 'Test Cihazi',
                                rid: null
                            
                            }
                        ]}
                        name="charge-units-access-type"
                        onChange={(event) => {
                            setChargeUnitsFormData({ ...chargeUnitsFormData, accessType: event.target.value })
                        }}
                    />
                </div>
                <div className='charge-units-location-container'>
                    <Label
                        className="charge-units-location-label block mb-2 text-heading font-semibold"
                        htmlFor={'charge-units-location'}
                        labelText={'Konum Tarifi'}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4'
                        id={'charge-units-location'}
                        name={'charge-units-location'}
                        type="text"
                        value={chargeUnitsFormData.location}
                        onChange={(event) => {
                            setChargeUnitsFormData({ ...chargeUnitsFormData, location: event.target.value })
                        }}
                    />
                </div>
                <div className='charge-units-button-container flex justify-end'>
                    <Button
                        buttonText={'Kaydet'}
                        className='bg-primary text-white rounded-md px-4 py-2'
                        type={'submit'}
                    />
                </div>
            </form>
        </div>
    );
};

export default ChargeUnitsForm;
