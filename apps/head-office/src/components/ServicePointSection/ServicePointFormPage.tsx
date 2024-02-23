import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';
import { RootState } from '../../../app/redux/store';

interface IInputProps {
    className?: string,
    error?: string,
    extra: { items: string[] },
    id: string,
    inputClassName?: string,
    label: string,
    labelClassName?: string,
    name: string,
    pattern?: string,
    placeholder?: string,
    required: boolean,
    type: string,
    value?: string,
    wrapperClassName?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    onClick?: () => void,
};

interface IServicePointFormPageProps {
    activePage: number,
    cities: string[],
    districts: string[],
    formData: { [key: string]: string },
    modalPageIndex: number,
    modalPageInputs: IInputProps[],
    setActivePage: (page: number) => void,
    setFormData: (formData: { [key: string]: string }) => void,
};

const ServicePointFormPage = ({
    activePage,
    cities,
    districts,
    formData,
    modalPageIndex,
    modalPageInputs,
    setFormData,
    setActivePage,
}: IServicePointFormPageProps) => {
    const updatedServicePoint = useSelector((state: RootState) => state.updatedServicePointReducer.updatedServicePoint);
    const { register } = useForm();

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

    const getDropdownItems = (input: { id: string; extra: { items: string[]; } }, cities: string[], districts: string[]): string[] => {
        switch (input.id) {
            case 'service-point-city':
                return cities;
            case 'service-point-district':
                return districts;
            default:
                return input.extra.items;
        };
    };

    useEffect(() => {
        setFormData({
            ...formData,
            'service-point-name': updatedServicePoint.name,
            'service-point-property': updatedServicePoint.title,
            'service-point-number1': JSON.parse(updatedServicePoint.phoneNumbers || '[]')[0],
            'service-point-number2': JSON.parse(updatedServicePoint.phoneNumbers || '[]')[1],
            'service-point-address': updatedServicePoint.address,
            'service-point-city': updatedServicePoint.city,
            'service-point-district': updatedServicePoint.district,
            'service-point-payment-methods': JSON.parse(updatedServicePoint.paymentMethods || '[]')[0],
            'service-point-parking': updatedServicePoint.freePark,
            'service-point-opportunity': updatedServicePoint.opportunities,
            'service-point-x-coor': updatedServicePoint.longitude,
            'service-point-y-coor': updatedServicePoint.latitude,
        });
    }, [updatedServicePoint]);

    return (
        <fieldset key={modalPageIndex} className={`sh-modal-page-${modalPageIndex} ${activePage === modalPageIndex ? 'block' : 'hidden'}`}>
            {
                modalPageInputs.map((input: IInputProps, inputIndex: number) => {
                    switch (input.type) {
                        case 'text':
                        case 'radio':
                        case 'checkbox':
                            return (
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-container`}>
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
                                        value={formData[input.name]}
                                    />
                                </div>
                            );
                        case 'dropdown': {
                            const dropdownItems: string[] = getDropdownItems(input, cities, districts);
                            return (
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-container`}>
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
                                            value: formData[input.name]
                                        })}
                                    />
                                </div>
                            );
                        }
                        case 'number':
                            return (
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-container`}>
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
                                            value: formData[input.name]
                                        })}
                                    />
                                </div>
                            );
                        case 'textarea':
                            return (
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-container`}>
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
                                            value: formData[input.name]
                                        })}
                                    />
                                </div>
                            );
                        case 'submit':
                            return (
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-container`}>
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
                                <div key={`${modalPageIndex}-${inputIndex}`} className={`${input.name}-container`}>
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
};

export default ServicePointFormPage;
