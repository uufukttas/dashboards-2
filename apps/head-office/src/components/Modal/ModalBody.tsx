import React, { useState } from 'react'
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';
import './Modal.css';
import { Button } from '@projects/button';

interface ModalBodyProps {
    inputs: {
        inputClassName?: string;
        id: string;
        name: string;
        label: string;
        labelClassName?: string;
        type: string;
        placeholder: string;
        pattern: string;
        extra: { items: string[] } | string;
        required: boolean;
        error: string;
        onClick?: () => void;
        onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    }[][];
}

const ModalBody = ({ inputs }: ModalBodyProps) => {
    const [activePage, setActivePage] = useState(0);

    return (
        <div className="relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5 max-h-[650px]">
            {inputs.map((pageInputs, pageIndex) => (
                <div key={pageIndex} className={`sh-modal-page-${pageIndex} ${pageIndex === activePage ? 'block' : 'hidden'}`}>
                    {pageInputs.map((input, inputIndex) => {
                        switch (input.type) {
                            case 'text':
                            case 'radio':
                            case 'checkbox':
                                return (
                                    <div key={`${pageIndex}-${inputIndex}`} className="mb-4">
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
                                        />
                                    </div>
                                );
                            case 'dropdown': {
                                const dropdownItems: string[] =
                                    typeof input.extra === 'string' ? [] : input.extra.items;
                                return (
                                    <div key={inputIndex} className="mb-4">
                                        <Label htmlFor={input.name} labelText={input.label}
                                            className={input.labelClassName}
                                        />
                                        <Dropdown
                                            id={input.label}
                                            name={input.name}
                                            className={input.inputClassName}
                                            items={dropdownItems}
                                            required={input.required}
                                            onChange={input.onChange}
                                        />
                                    </div>
                                );
                            }
                            case 'number':
                                return (
                                    <div key={inputIndex} className="mb-4">
                                        <Label htmlFor={input.name} labelText={input.label} className={input.labelClassName} />
                                        <Input
                                            id={input.label}
                                            name={input.name}
                                            className={input.inputClassName}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            pattern={input.pattern}
                                            required={input.required}
                                        />
                                    </div>
                                );
                            case 'textarea':
                                return (
                                    <div key={inputIndex} className="mb-4">
                                        <Label htmlFor={input.name} labelText={input.label}
                                            className={input.labelClassName}
                                        />
                                        <Textarea
                                            id={input.label}
                                            name={input.name}
                                            className={input.inputClassName}
                                            placeholder={input.placeholder}
                                            required={input.required}
                                        />
                                    </div>
                                );
                            case 'button':
                            case 'submit':
                            case 'reset':
                                return (
                                    <div className="mb-4">
                                        <Button
                                            buttonText={input.label}
                                            className={input.inputClassName}
                                            type={input.type}
                                            onClick={input.label === 'Ileri' ? () => setActivePage(activePage + 1) : () => setActivePage(activePage - 1)}
                                        />
                                    </div>
                                );
                            default:
                                return (
                                    <div key={inputIndex} className="mb-4">
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
                </div>
            ))}
        </div>
    );
};

export default ModalBody;
