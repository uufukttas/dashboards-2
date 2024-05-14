import React from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import type { IServicePointPermissionsModalProps } from '../types';

const ServicePointPermissionsModal = ({ slug }: IServicePointPermissionsModalProps) => {
    const sectionPrefix = 'service-point-permission';
    const dispatch = useDispatch();
    const [permissionPhoneNumber, setPermissionPhoneNumber] = React.useState<string>('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleFormSubmit = () => {
        axios
            .post(
                'https://sharztestapi.azurewebsites.net/Auth/ChargePointUserCreate',
                {
                    phoneNumber: permissionPhoneNumber,
                    stationId: Number(slug),
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                dispatch(
                    showAlert({
                        message: response.data.message,
                        type: 'success',
                    })
                );

                setTimeout(() => {
                    hideAlert();
                }, 5000);

                dispatch(toggleModalVisibility());
            });
    };

    return (
        <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
            <form
                className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`}
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <div className={`${sectionPrefix}-container`}>
                    <Label
                        className={`${sectionPrefix}-label block mb-2 text-heading font-semibold`}
                        htmlFor={``}
                        labelText={`Yetkili Telefon Numarasi`}
                    >
                        <span className="text-md text-error">*</span>
                    </Label>
                    <Input
                        className={`${sectionPrefix}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                        id={`${sectionPrefix}`}
                        name={`${sectionPrefix}`}
                        register={
                            register(`${sectionPrefix}`, {
                                min: {
                                    value: 10,
                                    message: `Telefon numarasi icin en az 10 karakter girmelisiniz.`,
                                },
                                required: `Telefon numarasi zorunludur.`,
                                value: permissionPhoneNumber,
                                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                    setPermissionPhoneNumber(parseFloat(event.target.value).toString());
                                },
                            })
                        }
                        type={`number`}
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
                    <Button
                        buttonText='Kaydet'
                        id='addPermissionPhoneNmber'
                        type='submit'
                        className={`${sectionPrefix}-button bg-primary text-white w-full py-2.5 rounded-lg`}
                    />
                </div>
            </form>
        </div>
    );
};

export default ServicePointPermissionsModal;
