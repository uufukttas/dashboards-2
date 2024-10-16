import { Button } from '@projects/button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BRAND_PREFIX } from '../../constants/constants';
import { Label } from '@projects/label';
import { Input } from '@projects/input';

const NotificationCreate = ({ className }: { className: string }) => {
    const initialNotificationFormData = { description: '', image: '', title: '' };
    const notificationPrefix: string = `${BRAND_PREFIX}-notification-form`;
    const notificationCreateFormInputs: string[] = ['title', 'description', 'image'];
    const { formState: { errors }, handleSubmit, register } = useForm();
    const [notificationFormData, setNotificationFormData] = useState(initialNotificationFormData);

    return (
        <div className={className}>
            <div className='flex flex-col border border-gray-300 p-2 m-2 rounded-md'>
                <div className='font-bold'>Create a Notification</div>
                <div>
                    <form className='flex flex-col'>
                        {
                            notificationCreateFormInputs.map((notificationInput: string, index: number) => {
                                return (
                                    <div className={`${notificationPrefix}-input-container mb-4`} key={index}>
                                        <Label
                                            className={`${notificationPrefix}-label block text-sm font-medium text-gray-600`}
                                            htmlFor={notificationInput}
                                            labelText={notificationInput}
                                        />
                                        <Input
                                            className={`${notificationPrefix}-input w-full mt-1 p-2 border rounded-lg text-text text-sm focus:ring-primary focus:border-primary`}
                                            id={notificationInput}
                                            name={notificationInput}
                                            register={register(
                                                notificationInput,
                                                {
                                                    required: `${(notificationInput)} zorunlu bir alandır.`,
                                                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        setNotificationFormData({
                                                            ...notificationFormData,
                                                            [notificationInput.toLowerCase()]: event.target.value,
                                                        });
                                                    },
                                                }
                                            )}
                                            type={notificationInput !== notificationCreateFormInputs[2] ? 'text' : 'file'}
                                        />
                                        <div className={`${notificationPrefix}-error-wrapper w-full my-4 font-bold`}>
                                            <p className={`${notificationPrefix}-error-message text-error`}>
                                                {(errors[notificationInput]?.message?.toString())}
                                            </p>
                                        </div>

                                    </div>
                                )
                            })
                        }

                        <div className={`${notificationPrefix}-submit-button-container mb-4`}>
                            <Button
                                buttonText={'Giriş Yap'}
                                className={`${notificationPrefix}-submit-button w-full p-2 px-4 text-text font-bold bg-primary hover:bg-primary-lighter`}
                                id={`${notificationPrefix}-submit-button`}
                                type={'submit'}
                            />
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default NotificationCreate