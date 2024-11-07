import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { addChargePointPermission } from '../../../../app/api/servicePointDetails/addChargePointPermission';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { toggleServicePointPermissionsUpdated } from '../../../../app/redux/features/isServicePointPermissionsUpdated';
import { setAddPermission } from '../../../../app/redux/features/setVisibleModal';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import type { IServicePointPermissionsModalProps } from '../types';

const ServicePointPermissionsModal = ({ slug }: IServicePointPermissionsModalProps) => {
    const sectionPrefix = 'service-point-permission';
    const dispatch = useDispatch();
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [permissionProperties, setPermissionProperties] = useState({
        name: '',
        surname: '',
        phoneNumber: '',
    });
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleFormSubmit = async () => {
        setIsDisabled(true);

        const response = await addChargePointPermission(permissionProperties, slug);

        dispatch(
            showAlert({
                message: response.message,
                type: 'success',
            })
        );

        setTimeout(() => {
            dispatch(hideAlert());
        }, 5000);

        dispatch(toggleModalVisibility(false));
        dispatch(toggleServicePointPermissionsUpdated(true));
        dispatch(setAddPermission(false));
    };

    return (
        <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
            <form
                className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`}
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <div className={`${sectionPrefix}-container`}>
                    <div className={`${sectionPrefix}-name-lastname-container flex w-full flex-row justify-between`}>
                        <div className={`${sectionPrefix}-name-container w-1/2 mr-2`}>
                            <Label
                                className={`${sectionPrefix}-name-label block mb-2 text-heading font-semibold`}
                                htmlFor={``}
                                labelText={`Yetkili İsim`}
                            >
                                <span className="text-md text-error">*</span>
                            </Label>
                            <Input
                                className={`${sectionPrefix}-name-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                                id={`${sectionPrefix}-name`}
                                name={`${sectionPrefix}-name`}
                                register={
                                    register(`${sectionPrefix}-name`, {
                                        required: `İsim zorunludur.`,
                                        value: permissionProperties.name,
                                        onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                            setPermissionProperties({
                                                ...permissionProperties,
                                                name: event.target.value,
                                            });
                                        },
                                    })
                                }
                                type={`text`}
                            />
                            {errors[`${sectionPrefix}-name`]
                                && errors[`${sectionPrefix}-name`]?.message
                                && (
                                    <div className={`${sectionPrefix}-name-error-wrapper my-4 font-bold text-error`}>
                                        <p className={`${sectionPrefix}-name-error-message text-error`}>
                                            {errors[`${sectionPrefix}-name`]?.message?.toString()}
                                        </p>
                                    </div>
                                )}
                        </div>
                        <div className={`${sectionPrefix}-surname-container w-1/2 ml-2`}>
                            <Label
                                className={`${sectionPrefix}-surname-label block mb-2 text-heading font-semibold`}
                                htmlFor={``}
                                labelText={`Yetkili Soyisim`}
                            >
                                <span className="text-md text-error">*</span>
                            </Label>
                            <Input
                                className={`${sectionPrefix}-surname-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                                id={`${sectionPrefix}-surname`}
                                name={`${sectionPrefix}-surname`}
                                register={
                                    register(`${sectionPrefix}-surname`, {
                                        required: `Soyisim zorunludur.`,
                                        value: permissionProperties.surname,
                                        onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                            setPermissionProperties({
                                                ...permissionProperties,
                                                surname: event.target.value,
                                            });
                                        },
                                    })
                                }
                                type={`text`}
                            />
                            {errors[`${sectionPrefix}-surname`]
                                && errors[`${sectionPrefix}-surname`]?.message
                                && (
                                    <div className={`${sectionPrefix}-surname-error-wrapper my-4 font-bold text-error`}>
                                        <p className={`${sectionPrefix}-surname-error-message text-error`}>
                                            {errors[`${sectionPrefix}-surname`]?.message?.toString()}
                                        </p>
                                    </div>
                                )}
                        </div>
                    </div>
                    <div className={`${sectionPrefix}-phone-container`}>
                        <Label
                            className={`${sectionPrefix}-label block mb-2 text-heading font-semibold`}
                            htmlFor={``}
                            labelText={`Yetkili Telefon Numarasi`}
                        >
                            <span className="text-md text-error">*</span>
                        </Label>
                        <Input
                            className={`${sectionPrefix}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                            id={`${sectionPrefix}-phone-number`}
                            name={`${sectionPrefix}-phone-number`}
                            register={
                                register(`${sectionPrefix}-phone-number`, {
                                    min: {
                                        value: 10,
                                        message: `Telefon numarasi icin en az 10 karakter girmelisiniz.`,
                                    },
                                    required: `Telefon numarasi zorunludur.`,
                                    value: permissionProperties.phoneNumber,
                                    onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                        setPermissionProperties({
                                            ...permissionProperties,
                                            phoneNumber: event.target.value,
                                        });
                                    },
                                })
                            }
                            type={`number`}
                        />
                        {errors[`${sectionPrefix}-phone-number`]
                            && errors[`${sectionPrefix}-phone-number`]?.message
                            && (
                                <div className={`${sectionPrefix}-phone-number-error-wrapper my-4 font-bold text-error`}>
                                    <p className={`${sectionPrefix}-phone-number-error-message text-error`}>
                                        {errors[`${sectionPrefix}-phone-number`]?.message?.toString()}
                                    </p>
                                </div>
                            )}
                    </div>
                    <Button
                        buttonText='Kaydet'
                        className={`${sectionPrefix}-button bg-primary text-white w-full py-2.5 rounded-lg`}
                        disabled={isDisabled}
                        id='addPermissionPhoneNmber'
                        type='submit'
                    />
                </div>
            </form>
        </div>
    );
};

export default ServicePointPermissionsModal;
