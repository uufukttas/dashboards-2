import { CheckboxInDropdown } from '@projects/checkbox-in-dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IUserDataProps } from '../types';

const UserManagementModalPage = () => {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const [roles, setRoles] = useState([
        {
            id: 1,
            name: 'Admin',
            isChecked: false,
            rid: null,
            stationFeatureType: 0,
            stationFeatureValue: 0
        }, {
            id: 2,
            name: 'User',
            isChecked: false,
            rid: null,
            stationFeatureType: 0,
            stationFeatureValue: 0
        }, {
            id: 3,
            name: 'Guest',
            isChecked: false,
            rid: null,
            stationFeatureType: 0,
            stationFeatureValue: 0
        }]
    );
    const [userData, setUserData] = useState<{ name: string; lastName: string; email: string; phone: string; roleNames: string[]; id: number; }>({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        roleNames: [],
        id: 0
    });

    const handleFormSubmit = () => {
        console.log(userData);
    };

    return (
        <form
            className="user-management-modal-form"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <div className="user-management-modal-form-input-container">
                <div className='user-management-name-input-container flex w-full'>
                    <div className='user-management-name-container w-1/2'>
                        <Label
                            className='block mb-2 text-heading mx-2 mt-2'
                            htmlFor="user-management-name"
                            labelText={`Isim`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block w-2/3 p-2.5 mb-4 focus:ring-primary focus:border-primary mx-2'
                            id="user-management-name"
                            name="user-management-name"
                            register={register('user-management-name', {
                                required: 'Name is required',
                            })}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                                setUserData({
                                    ...userData,
                                    [event.target.name]: event.target.value,
                                });
                            }} type="text"
                        />

                    </div>
                    <div className='user-management-lastName-input-container w-1/2'>
                        <Label
                            className='block mb-2 text-heading mx-2 mt-2'
                            htmlFor="user-management-lastname"
                            labelText={`Soy isim`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block w-2/3 p-2.5 mb-4 focus:ring-primary focus:border-primary mx-2'
                            id="user-management-lastname"
                            name="user-management-lasntame"
                            register={register('user-management-lastname', {
                                required: 'Last Name is required',
                            })}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                                setUserData({
                                    ...userData,
                                    [event.target.name]: event.target.value,
                                });
                            }}
                            type="text"
                        />
                    </div>
                </div>
                <div className='user-management-username-input-container w-1/2'>
                    <Label
                        className='block mb-2 text-heading mx-2 mt-2'
                        htmlFor="user-management-username"
                        labelText={`Kullanici Adi`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-2/3 p-2.5 mb-4 focus:ring-primary focus:border-primary mx-2'
                        id="user-management-username"
                        name="user-management-username"
                        register={register('user-management-username', {
                            required: 'Kullanici Adi zorunlu',
                        })}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                            setUserData({
                                ...userData,
                                [event.target.name]: event.target.value,
                            });
                        }}
                        type="text"
                    />
                </div>
                <div className='user-management-email-input-container'>
                    <Label
                        className='block mb-2 text-heading mx-2 mt-2'
                        htmlFor="user-management-email"
                        labelText={`Email`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-5/6 p-2.5 mb-4 focus:ring-primary focus:border-primary mx-2'
                        id="user-management-email"
                        name="user-management-email"
                        register={register('user-management-email', {
                            required: 'Email is required',
                        })}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                            setUserData({
                                ...userData,
                                [event.target.name]: event.target.value,
                            });
                        }}
                        type="email"
                    />
                </div>
                <div className='user-management-phone-input-container'>
                    <Label
                        className='block mb-2 text-heading mx-2 mt-2'
                        htmlFor="user-management-phone"
                        labelText={`Telefon`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-5/6 p-2.5 mb-4 focus:ring-primary focus:border-primary mx-2'
                        id="user-management-phone"
                        name="user-management-phone"
                        register={register('user-management-phone', {
                            required: 'Phone is required',
                        })}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                            setUserData({
                                ...userData,
                                [event.target.name]: event.target.value,
                            });
                        }}
                        type="tel"
                    />
                </div>
                <div className='user-management-role-input-container'>
                    <Label
                        className='block mb-2 text-heading mx-2 mt-2'
                        htmlFor="user-management-role"
                        labelText={`Role`}
                    />
                    <CheckboxInDropdown
                        className='border text-text text-sm rounded-lg block w-5/6 p-2.5 mb-4 focus:ring-primary focus:border-primary mx-2'
                        id="user-management-role"
                        inputName='user-management-role'
                        items={roles}
                        onChange={(role) => {
                            console.log('role', role)
                        }}
                    />
                </div>
            </div>
        </form>
    )
}

export default UserManagementModalPage