import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Radio } from '@projects/radio';

const ServicePointDetailsModal = () => {
    return (
        <div className='charge-units-modal-form-container relative p-6 bg-white rounded-lg '>
            <form
                className={`${BRAND_PREFIX}-modal-form`}
                onSubmit={(event) => event.preventDefault()}
            >
                <div className={`charge-units-container`}>
                    <Label
                        className="charge-units-brand-label block mb-2 text-heading font-semibold"
                        htmlFor={'charge-units-label'}
                        labelText={'Şarj Ünitesi Markasi'}
                    />
                    <Dropdown
                        className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
                        id={'charge-units-brand'}
                        items={[]}
                        name="charge-units-brand"
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
                        items={[]}
                        name="charge-units-ocpp-version"
                    />
                </div>
                <div className={`charge-units-free-usage-container`}>
                    <h3 className="charge-units-free-usage-label block mb-2 text-heading font-semibold" id={'charge-units-free-usage'}>
                        Ücretsiz Kullanım
                    </h3>
                    <div className='charge-units-free-usage-inputs-container flex'>
                        <div className='charge-units-free-usage-option-container flex w-1/2 items-center mb-4'>
                            <Label
                                className="charge-units-is-free-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                                htmlFor={'charge-units-is-free'}
                                labelText={'Var'}
                            />
                            <Radio
                                className="charge-units-is-free text-blue-500 text-sm block"
                                id={'charge-units-is-free'}
                                name={'charge-units-is-free'}
                            />
                        </div>
                        <div className='charge-units-free-usage-option-container flex w-1/2 items-center mb-4'>
                            <Label
                                className="charge-units-is-free-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                                htmlFor={'charge-units-is-free'}
                                labelText={'Yok'}
                            />
                            <Radio
                                className="charge-units-is-free text-blue-500 text-sm block"
                                id={'charge-units-is-free'}
                                name={'charge-units-is-free'}
                            />
                        </div>
                    </div>
                </div>
                <div className='charge-units-limited-usage-container'>
                    <h3 className="charge-units-limited-usage-label block mb-2 text-heading font-semibold" id={'charge-units-limited-usage'}>
                        Sınırlı Kullanım
                    </h3>
                    <div className='charge-units-limited-usage-inputs-container flex'>
                        <div className='charge-units-limited-usage-option-container flex w-1/2 items-center mb-4'>
                            <Label
                                className="charge-units-is-limited-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                                htmlFor={'charge-units-is-limited'}
                                labelText={'Var'}
                            />
                            <Radio
                                className="charge-units-is-limited text-blue-500 text-sm block"
                                id={'charge-units-is-limited'}
                                name={'charge-units-is-limited'}
                            />
                        </div>
                        <div className='charge-units-limited-usage-option-container flex w-1/2 items-center mb-4'>
                            <Label
                                className="charge-units-is-limited-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                                htmlFor={'charge-units-is-limited'}
                                labelText={'Yok'}
                            />
                            <Radio
                                className="charge-units-is-limited text-blue-500 text-sm block"
                                id={'charge-units-is-limited'}
                                name={'charge-units-is-limited'}
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
                        items={[]}
                        name="charge-units-investor"
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
                        items={[]}
                        name="charge-units-status"
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
                        items={[]}
                        name="charge-units-access-type"
                    />
                </div>
                <div className='charge-units-location-container'>
                    <Label
                        className="charge-units-location-label block mb-2 text-heading font-semibold"
                        htmlFor={'charge-units-location'}
                        labelText={'Konum'}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4'
                        id={'charge-units-location'}
                        name={'charge-units-location'}
                        type="text"
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

export default ServicePointDetailsModal;
