import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';
import { toggleVisibility } from '../../../app/redux/features/ServicePointCreateModal';
import { RootState } from '../../../app/redux/store';
import { setSelectedCity } from '../../../app/redux/features/setSelectedCity';


const ServicePointFormPage = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector((state: RootState) => state.modalStatusReducer.isOpen);
    const updatedServicePoint = useSelector((state: RootState) => state.updatedServicePointReducer.updatedServicePoint);
    const [activePage, setActivePage] = useState(0);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const cityId = useSelector((state: RootState) => state.selectedCityReducer.city);
    const [formData, setFormData] = useState({
        'service-point-name': '',
        'service-point-property': '',
        'service-point-number1': '',
        'service-point-number2': '',
        'service-point-address': '',
        'service-point-city': '',
        'service-point-district': '',
        'service-point-payment-methods': '',
        'service-point-parking': '',
        'service-point-opportunity': '',
        'service-point-x-coor': '',
        'service-point-y-coor': ''
    });

    const getCities = async () => {
        try {
            const cityResponse = await axios.get('https://testapideneme.azurewebsites.net/Values/GetCities').then((response) => response.data);
            setCities(cityResponse.data);
            getDistricts();
        } catch (error) {
            console.log(error);
        }
    };

    const getDistricts = async () => {
        try {
            const districtResponse = await axios.post(`https://testapideneme.azurewebsites.net/Values/GetDistricts`, { 'plateNumber': Number(cityId) }).then((response) => response.data);
            setDistricts(districtResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (activePage === 1) {
            getCities();
            dispatch(setSelectedCity(1));
        }

        getDistricts();
    }, [activePage, cityId]);

    const createServicePoint = () => {
        console.log(formData, 'formData')
        const data = JSON.stringify({
            'id': 0,
            "name": formData['service-point-name'],
            "title": formData['service-point-property'],
            "phoneNumbers": [
                formData['service-point-number1'],
                formData['service-point-number2']
            ],
            "address": [
                formData['service-point-address']
            ],
            "city": formData['service-point-city'] || 1,
            "district": formData['service-point-district'] || 1,
            "paymentMethods": [
                formData['service-point-payment-methods']
            ],
            "freePark": formData['service-point-parking'] === 'true' ? true : false,
            "opportunities": [
                formData['service-point-opportunity']
            ],
            "longitude": Number(formData['service-point-x-coor']),
            "latitude": Number(formData['service-point-y-coor']),
        });
        axios.post('https://testapideneme.azurewebsites.net/ServicePoint/AddPoint', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });


        dispatch(toggleVisibility(isVisible));
    };

    console.log('updatedServicePoint', updatedServicePoint.name)
    const inputs = [
        [
            {
                id: 'service-point-name',
                inputClassName: 'bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4',
                name: 'service-point-name',
                label: 'Hizmet Noktasi Ismi',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'text',
                placeholder: '',
                pattern: '^[A-Za-z0-9]',
                extra: '',
                required: true,
                error: 'Hizmet Noktasi Ismi Bos Birakilamaz.',
                wrapperClassName: '',
                value: (updatedServicePoint ? updatedServicePoint.name : ''),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-name': e.target.value }) },
            }, {
                inputClassName: 'bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4',
                id: 'service-point-property',
                name: 'service-point-property',
                label: 'Hizmet Noktasi Ozelligi',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'dropdown',
                placeholder: '',
                pattern: '',
                extra: {
                    items: ['AVM', 'Sosyal Tesis']
                },
                required: false,
                error: 'Hizmet Noktasi Ozelligi Bos Birakilamaz.',
                wrapperClassName: '',
                value: (updatedServicePoint ? updatedServicePoint.title : ''),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-property': e.target.value }) }
            }, {
                inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
                id: 'service-point-number1',
                name: 'service-point-number1',
                label: 'Servis Noktasi Sorumlu Telefon',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'number',
                placeholder: '(555) 123 12 12',
                pattern: '[0-9]{10}',
                extra: '',
                required: true,
                error: 'Hizmet Noktasi Telefon Numarasi Bos Birakilamaz',
                wrapperClassName: '',
                value: (updatedServicePoint ? (updatedServicePoint.phoneNumbers && updatedServicePoint.phoneNumbers[0]) : 0),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-number1': e.target.value }) }
            }, {
                inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
                id: 'service-point-number2',
                name: 'service-point-number2',
                label: 'Servis Noktasi Sorumlu Telefon',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'number',
                placeholder: '(555) 123 12 12',
                pattern: '[0-9]{10}',
                extra: '',
                required: false,
                error: 'Hizmet Noktasi Telefon Numarasi Bos Birakilamaz',
                wrapperClassName: 'flex flex-col',
                value: (updatedServicePoint ? (updatedServicePoint.phoneNumbers && updatedServicePoint.phoneNumbers[1]) : 0),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-number2': e.target.value }) }
            }, {
                inputClassName: 'mb-4',
                id: 'service-point-address',
                name: 'service-point-address',
                label: 'Hizmet Noktasi Adresi',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'textarea',
                placeholder: 'Adresi giriniz...',
                pattern: '',
                extra: '',
                required: true,
                error: 'Hizmet Noktasi Adresi Bos Birakilamaz',
                wrapperClassName: 'flex flex-col',
                value: (updatedServicePoint ? updatedServicePoint.address : ''),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-address': e.target.value }) }
            }, {
                inputClassName: '',
                id: 'modal-next-button',
                name: 'modal-next-button',
                label: 'Ileri',
                labelClassName: '',
                type: 'button',
                placeholder: '',
                pattern: '',
                extra: '',
                required: false,
                error: '',
                onClick: (() => { setActivePage(activePage + 1) }),
                wrapperClassName: 'flex flex-col',
            }
        ], [
            {
                inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
                id: 'service-point-x-coor',
                name: 'service-point-x-coor',
                label: 'Hizmet Noktasi X Koordinati',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'text',
                placeholder: '',
                pattern: '[0-9]',
                extra: '',
                required: true,
                error: 'Hizmet Noktasi X Koordinati Bos Birakilamaz.',
                wrapperClassName: 'flex flex-col',
                value: (updatedServicePoint ? updatedServicePoint.longitude : ''),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-x-coor': e.target.value }) }
            }, {
                inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
                id: 'service-point-y-coor',
                name: 'service-point-y-coor',
                label: 'Hizmet Noktasi Y Koordinati',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'text',
                placeholder: '',
                pattern: '[0-9]',
                extra: '',
                required: true,
                error: 'Hizmet Noktasi Y Koordinati Bos Birakilamaz.',
                wrapperClassName: 'flex flex-col',
                value: (updatedServicePoint ? updatedServicePoint.latitude : ''),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-y-coor': e.target.value }) }
            }, {
                inputClassName: '',
                id: 'modal-prev-button',
                name: 'modal-prev-button',
                label: 'Geri',
                labelClassName: '',
                type: 'button',
                placeholder: '',
                pattern: '',
                extra: '',
                required: false,
                error: '',
                onClick: (() => { setActivePage(activePage - 1) }),
                wrapperClassName: 'inline-flex w-1/3 justify-start',
            }, {
                inputClassName: '',
                id: 'modal-next-button',
                name: 'modal-next-button',
                label: 'Ileri',
                labelClassName: '',
                type: 'button',
                placeholder: '',
                pattern: '',
                extra: '',
                required: false,
                error: '',
                onClick: (() => { setActivePage(activePage + 1) }),
                wrapperClassName: 'inline-flex w-1/3 justify-end',
            }
        ], [
            {
                inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
                id: 'service-point-city',
                name: 'service-point-city',
                label: 'Hizmet Noktasi Il',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'dropdown',
                placeholder: '',
                pattern: '',
                extra: {
                    items: cities,
                },
                required: true,
                error: 'Hizmet Noktasi Sehri Bos Birakilamaz.',
                wrapperClassName: 'flex flex-col',
                value: (updatedServicePoint ? updatedServicePoint.city : ''),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-city': e.target.value }); dispatch(setSelectedCity(Number(e.target.value))) }
            }, {
                inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
                id: 'service-point-district',
                name: 'service-point-district',
                label: 'Hizmet Noktasi Ilce',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'dropdown',
                placeholder: '',
                pattern: '',
                extra: {
                    items: districts,
                },
                required: true,
                error: 'Hizmet Noktasi Ilce Bos Birakilamaz.',
                wrapperClassName: 'flex flex-col',
                value: (updatedServicePoint ? updatedServicePoint.district : ''),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-district': e.target.value }) }
            }, {
                inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
                id: 'service-point-payment-methods',
                name: 'service-point-payment-methods',
                label: 'Servis Noktasi Odeme Yontemleri',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'dropdown',
                placeholder: '',
                pattern: '',
                extra: {
                    items: ['Nakit', 'Kredi Karti', 'Banka Karti']
                },
                required: true,
                error: 'Hizmet Noktasi Odeme Yontemi Bos Birakilamaz',
                wrapperClassName: 'flex flex-col',
                value: (updatedServicePoint ? (updatedServicePoint.paymentMethods && updatedServicePoint.paymentMethods[0]) : 0),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-payment-methods': e.target.value }) }
            }, {
                inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
                id: 'service-point-parking',
                name: 'service-point-parking',
                label: 'Servis Noktasi Ucretsiz Park',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'radio',
                placeholder: '',
                pattern: '',
                extra: '',
                required: false,
                error: '',
                wrapperClassName: 'flex flex-col',
                value: (updatedServicePoint ? updatedServicePoint.freePark : ''),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-parking': e.target.value }) }
            }, {
                inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
                id: 'service-point-opportunity',
                name: 'service-point-opportunity',
                label: 'Hizmet Noktasi Olanaklari',
                labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                type: 'checkbox',
                placeholder: '',
                pattern: '',
                extra: '',
                required: false,
                error: '',
                wrapperClassName: 'flex flex-col',
                value: (updatedServicePoint ? updatedServicePoint.opportunities : ''),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, 'service-point-opportunity': e.target.value }) }
            }, {
                inputClassName: '',
                id: 'modal-prev-button',
                name: 'modal-prev-button',
                label: 'Geri',
                labelClassName: '',
                type: 'button',
                placeholder: '',
                pattern: '',
                extra: '',
                required: false,
                error: '',
                onClick: (() => { setActivePage(activePage - 1) }),
                wrapperClassName: 'flex flex-col',

            }, {
                inputClassName: '',
                id: 'modal-submit-button',
                name: 'modal-submit-button',
                label: 'Kaydet',
                labelClassName: '',
                type: 'submit',
                placeholder: '',
                pattern: '',
                extra: '',
                required: false,
                error: '',
                onClick: (() => { createServicePoint() }),
                wrapperClassName: 'flex flex-col',

            }
        ]
    ];

    return (
        <div className="relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5 max-h-[650px]">
            {inputs.map((pageInputs, pageIndex) => (
                <fieldset key={pageIndex} className={`sh-modal-page-${pageIndex} ${activePage === pageIndex ? 'block' : 'hidden'}`}>
                    {pageInputs.map((input, inputIndex) => {
                        switch (input.type) {
                            case 'text':
                            case 'radio':
                            case 'checkbox':
                                return (
                                    <div key={`${pageIndex}-${inputIndex}`} className={`mb-4 ${input.wrapperClassName}`}>
                                        <Label htmlFor={input.name} labelText={input.label} className={input.labelClassName} />
                                        <Input
                                            ariaInvalid={input.required}
                                            id={input.id}
                                            name={input.name}
                                            className={input.inputClassName}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            pattern={input.pattern}
                                            required={input.required}
                                            onChange={input.onChange}
                                            value={input.value}
                                        />
                                    </div>
                                );
                            case 'dropdown': {
                                const dropdownItems: string[] =
                                    typeof input.extra === 'string' ? [] : input.extra.items;
                                return (
                                    <div key={`${pageIndex}-${inputIndex}`} className={`mb-4 ${input.wrapperClassName}`}>
                                        <Label htmlFor={input.name} labelText={input.label}
                                            className={input.labelClassName}
                                        />
                                        <Dropdown
                                            id={input.label}
                                            name={input.name}
                                            className={input.inputClassName}
                                            items={dropdownItems}
                                            required={input.required}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => input.onChange && input.onChange(event as React.ChangeEvent<HTMLInputElement>)}
                                        />
                                    </div>
                                );
                            }
                            case 'number':
                                return (
                                    <div key={`${pageIndex}-${inputIndex}`} className="mb-4">
                                        <Label htmlFor={input.name} labelText={input.label} className={input.labelClassName} />
                                        <Input
                                            id={input.label}
                                            name={input.name}
                                            className={input.inputClassName}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            pattern={input.pattern}
                                            required={input.required}
                                            onChange={input.onChange}
                                            value={input.value}
                                        />
                                    </div>
                                );
                            case 'textarea':
                                return (
                                    <div key={`${pageIndex}-${inputIndex}`} className="mb-4">
                                        <Label htmlFor={input.name} labelText={input.label}
                                            className={input.labelClassName}
                                        />
                                        <Textarea
                                            id={input.label}
                                            name={input.name}
                                            className={input.inputClassName}
                                            placeholder={input.placeholder}
                                            required={input.required}
                                            onChange={input.onChange as (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void}
                                            value={updatedServicePoint ? updatedServicePoint['address'] : ''}
                                        />
                                    </div>
                                );
                            case 'button':
                            case 'submit':
                            case 'reset':
                                return (
                                    <div key={`${pageIndex}-${inputIndex}`} className={`mb-4 ${input.wrapperClassName}`}>
                                        <Button
                                            buttonText={input.label}
                                            className={input.inputClassName}
                                            type={input.type}
                                            onClick={input.onClick ? input.onClick : () => { }}
                                        />
                                    </div>
                                );
                            default:
                                return (
                                    <div key={`${pageIndex}-${inputIndex}`} className="mb-4">
                                        <Label htmlFor={input.name} labelText={input.label}
                                            className={input.labelClassName}
                                        />
                                        <Input
                                            id={input.label}
                                            name={input.name}
                                            type={input.type}
                                            className={input.inputClassName}
                                            placeholder={input.placeholder}
                                            pattern={input.pattern}
                                            required={input.required}
                                        />
                                    </div>
                                );
                        }
                    })}
                </fieldset>
            ))}
        </div>
    )
}

export default ServicePointFormPage;
