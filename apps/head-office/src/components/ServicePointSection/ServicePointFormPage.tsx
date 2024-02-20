import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';
import { RootState } from '../../../app/redux/store';

interface ServicePointFormPageProps {
    modalPageInputs: {
        id: string,
        name: string,
        type: string,
        className?: string,
        placeholder?: string,
        pattern?: string,
        required: boolean,
        value?: string,
        wrapperClassName?: string,
        label: string,
        labelClassName?: string,
        inputClassName?: string,
        extra: string | { items: string[] },
        error?: string,
        onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
        onClick?: () => void,
    }[],
    modalPageIndex: number,
    activePage: number,
    cities: string[],
    districts: string[],
    formData: { [key: string]: string },
    setFormData: (formData: { [key: string]: string }) => void,
    setActivePage: (page: number) => void,
};

interface InputProps {
    id: string,
    name: string,
    type: string,
    className?: string | undefined,
    placeholder?: string,
    pattern?: string,
    required: boolean,
    value?: string,
    wrapperClassName?: string,
    label: string,
    labelClassName?: string,
    inputClassName?: string,
    extra: string | { items: string[] },
    error?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    onClick?: () => void,
};

const ServicePointFormPage = ({
    modalPageInputs,
    modalPageIndex,
    activePage,
    cities,
    districts,
    formData,
    setFormData,
    setActivePage,
}: ServicePointFormPageProps) => {
    const { register } = useForm();
    const updatedServicePoint = useSelector((state: RootState) => state.updatedServicePointReducer.updatedServicePoint);

    const getDropdownItems = (input: { id: string; extra: string | { items: string[]; } }, cities: string[], districts: string[]): string[] => {
        switch (input.id) {
            case 'service-point-city':
                return cities;
            case 'service-point-district':
                return districts;
            default:
                return typeof input.extra === 'string' ? [] : input.extra.items;
        }
    };

    const getClickHandler = (inputId: string, setActivePage: (page: number) => void, activePage: number) => {
        switch (true) {
            case inputId.indexOf('next') > -1:
                return () => setActivePage(activePage + 1);
            case inputId.indexOf('prev') > -1:
                return () => setActivePage(activePage - 1);
            case inputId.indexOf('submit') > -1:
                return () => { };
            default:
                return () => { }; // Varsayılan olarak boş bir fonksiyon döndür
        }
    };

    const getValueName = (inputName: string, updatedServicePoint: {
        name: string;
        title: string;
        phoneNumbers: string[];
        address: string;
        city: number;
        district: number;
        paymentMethods: string[];
        freePark: boolean;
        opportunities: string[];
        longitude: number;
        latitude: number;
    }) => {
        switch (inputName) {
            case 'service-point-name':
                return updatedServicePoint?.name;
            case 'service-point-property':
                return updatedServicePoint?.title;
            case 'service-point-number1':
                return updatedServicePoint?.phoneNumbers[0];
            case 'service-point-number2':
                return updatedServicePoint?.phoneNumbers[1];
            case 'service-point-address':
                return updatedServicePoint?.address;
            case 'service-point-city':
                return updatedServicePoint?.city;
            case 'service-point-district':
                return updatedServicePoint?.district;
            case 'service-point-payment-methods':
                return updatedServicePoint?.paymentMethods[0];
            case 'service-point-parking':
                return updatedServicePoint?.freePark;
            case 'service-point-opportunity':
                return updatedServicePoint?.opportunities;
            case 'service-point-x-coor':
                return updatedServicePoint?.longitude;
            case 'service-point-y-coor':
                return updatedServicePoint?.latitude;
            default:
                return '';
        }
    }

    return (
        <fieldset key={modalPageIndex} className={`sh-modal-page-${modalPageIndex} ${activePage === modalPageIndex ? 'block' : 'hidden'}`}>
            {
                modalPageInputs.map((input: InputProps, inputIndex: number) => {
                    switch (input.type) {
                        case 'text':
                        case 'radio':
                        case 'checkbox':
                            return (
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-wrapper`}>
                                    <Label htmlFor={input.name} labelText={input.label} className={input.labelClassName} />
                                    <Input
                                        ariaInvalid={input.required}
                                        id={input.id}
                                        name={input.name}
                                        className={input.inputClassName}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        register={register(input.name.toLowerCase(), {
                                            required: `${input} is required.`,
                                            onChange: (event) => { setFormData({ ...formData, [input.name]: event.target.value }) },
                                        })}
                                        value={String(getValueName(input.name, updatedServicePoint))}
                                    />
                                </div>
                            );
                        case 'dropdown': {
                            const dropdownItems: string[] = getDropdownItems(input, cities, districts);
                            return (
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-wrapper`}>
                                    <Label htmlFor={input.name} labelText={input.label}
                                        className={input.labelClassName}
                                    />
                                    <Dropdown
                                        id={input.label}
                                        name={input.name}
                                        className={input.inputClassName}
                                        items={dropdownItems}
                                        register={register(input.name.toLowerCase(), {
                                            required: `${input} is required.`,
                                            onChange: (event) => { setFormData({ ...formData, [input.name]: event.target.value }) },
                                        })}
                                    />
                                </div>
                            );
                        }
                        case 'number':
                            return (
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-wrapper`}>
                                    <Label htmlFor={input.name} labelText={input.label} className={input.labelClassName} />
                                    <Input
                                        id={input.label}
                                        name={input.name}
                                        className={input.inputClassName}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        register={register(input.name.toLowerCase(), {
                                            required: `${input} is required.`,
                                            onChange: (event) => { setFormData({ ...formData, [input.name]: event.target.value }) },
                                        })}
                                    />
                                </div>
                            );
                        case 'textarea':
                            return (
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-wrapper`}>
                                    <Label htmlFor={input.name} labelText={input.label}
                                        className={input.labelClassName}
                                    />
                                    <Textarea
                                        id={input.label}
                                        name={input.name}
                                        className={input.inputClassName}
                                        placeholder={input.placeholder}
                                        register={register(input.name.toLowerCase(), {
                                            required: `${input} is required.`,
                                            onChange: (event) => { setFormData({ ...formData, [input.name]: event.target.value }) },
                                        })}
                                    />
                                </div>
                            );
                        case 'submit':
                            return (
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-wrapper`}>
                                    <Button
                                        buttonText={input.label}
                                        className={input.inputClassName}
                                        type={input.type}
                                    />
                                </div>
                            );
                        case 'button':
                        case 'reset':
                            return (
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-wrapper`}>
                                    <Button
                                        buttonText={input.label}
                                        className={input.inputClassName}
                                        type={input.type}
                                        onClick={getClickHandler(input.id, setActivePage, activePage)}
                                    />
                                </div>
                            );
                        default:
                            break;
                    }
                })
            }
        </fieldset >
    );
}

export default ServicePointFormPage;
