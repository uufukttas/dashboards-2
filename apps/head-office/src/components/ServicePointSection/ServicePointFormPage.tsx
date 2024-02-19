import React from 'react'
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';

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
    submitFNC: () => void,
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
    submitFNC,
    setFormData,
    setActivePage,
}: ServicePointFormPageProps) => {
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
                return () => submitFNC();
            default:
                return () => { }; // Varsayılan olarak boş bir fonksiyon döndür
        }
    };

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
                                        pattern={input.pattern}
                                        required={input.required}
                                        onChange={(event) => { setFormData({ ...formData, [input.name]: event.target.value }) }}
                                        value={input.value}
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
                                        required={input.required}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => { setFormData({ ...formData, [input.name]: event.target.value }) }}
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
                                        pattern={input.pattern}
                                        required={input.required}
                                        onChange={(event) => { setFormData({ ...formData, [input.name]: event.target.value }) }}
                                        value={input.value}
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
                                        required={input.required}
                                        onChange={(event) => { setFormData({ ...formData, [input.name]: event.target.value }) }}
                                    />
                                </div>
                            );
                        case 'button':
                        case 'submit':
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
    )
}

export default ServicePointFormPage;
