import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { CheckboxInDropdown } from '@projects/checkbox-in-dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { registerUserRequest } from '../../../../app/api/userManagements';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';

const UserManagementModalPage = () => {
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm();
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
    const [userData, setUserData] = useState<{
        'user-management-username': string;
        'user-management-name': string;
        'user-management-lastname': string;
        'user-management-phone': string;
        'user-management-role': [];
        'user-management-email': string;
        id?: number;
    }>({
        'user-management-username': '',
        'user-management-name': '',
        "user-management-lastname": '',
        'user-management-email': '',
        "user-management-phone": '',
        'user-management-role': [],
    });

    const handleFormSubmit = async () => {
        const response = await registerUserRequest({
            userName: userData['user-management-username'],
            password: 'Welcome123!',
            newPassword: 'Welcome123!',
            eMail: userData['user-management-email'],
            phoneNumber: userData['user-management-phone'],
            roles: userData['user-management-role'].map((role: any) => role.name),
        });

        dispatch(showAlert({
            message: response.message,
            type: response.success ? 'success' : 'error'
        }))

        setTimeout(() => {
            dispatch(hideAlert());
        }, 5000);

        dispatch(toggleModalVisibility(false));
    };

    return (
        <div className="sh-user-create-modal-form-container relative p-6 bg-white rounded-lg max-h-[650px]">
            <form
                className="user-management-modal-form block"
                onSubmit={handleSubmit(handleFormSubmit)}
            >

                <div className="sh-username-contianer">
                    <Label
                        className='block mb-2 text-heading mt-2 font-bold'
                        htmlFor="user-management-username"
                        labelText={`Kullanici Adi`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary'
                        id="user-management-username"
                        name="user-management-username"
                        register={register('user-management-username', {
                            required: 'Kullanici Adi zorunlu',
                            onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                console.log('event.target.name', event.target.name)
                                setUserData({
                                    ...userData,
                                    [event.target.name]: event.target.value,
                                })
                            }
                        })}
                        type="text"
                    />
                </div>
                <div className='sh-name-lastname-container flex'>
                    <div className="sh-name-container w-1/2">
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold'
                            htmlFor="user-management-name"
                            labelText={`Isim`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary mr-2'
                            id="user-management-name"
                            name="user-management-name"
                            register={register('user-management-name', {
                                required: 'Name is required',
                                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                    setUserData({
                                        ...userData,
                                        [event.target.name]: event.target.value,
                                    });
                                }
                            })}
                            type="text"
                        />
                    </div>
                    <div className="sh-lastname-container w-1/2">
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold'
                            htmlFor="user-management-lastname"
                            labelText={`Soy isim`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary ml-2'
                            id="user-management-lastname"
                            name="user-management-lasntame"
                            register={register('user-management-lastname', {
                                required: 'Last Name is required',
                                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                    setUserData({
                                        ...userData,
                                        [event.target.name]: event.target.value,
                                    });
                                }
                            })}
                            type="text"
                        />
                    </div>
                </div>
                <div className="sh-email-container">
                    <Label
                        className='block mb-2 text-heading mt-2 font-bold'
                        htmlFor="user-management-email"
                        labelText={`Email`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary'
                        id="user-management-email"
                        name="user-management-email"
                        register={register('user-management-email', {
                            required: 'Email is required',
                            onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                setUserData({
                                    ...userData,
                                    [event.target.name]: event.target.value,
                                });
                            }
                        })}
                        type="email"
                    />
                </div>
                <div className='sh-phone-container'>
                    <Label
                        className='block mb-2 text-heading mt-2 font-bold'
                        htmlFor="user-management-phone"
                        labelText={`Telefon`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary'
                        id="user-management-phone"
                        name="user-management-phone"
                        register={register('user-management-phone', {
                            required: 'Phone is required',
                            onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                setUserData({
                                    ...userData,
                                    [event.target.name]: event.target.value,
                                });
                            }
                        })}
                        type="tel"
                    />
                </div>
                <div className='sh-role-container'>
                    <Label
                        className='block mb-2 text-heading mt-2 font-bold'
                        htmlFor="user-management-role"
                        labelText={`Role`}
                    />
                    <CheckboxInDropdown
                        className='border text-text text-sm rounded-lg block w-full mb-4 focus:ring-primary focus:border-primary'
                        id="user-management-role"
                        inputName='user-management-role'
                        items={roles}
                        onChange={(role) => {
                            setRoles(role);
                            setUserData({
                                ...userData,
                                'user-management-role': role.filter((role) => role.isChecked),
                            });
                        }}
                    />
                </div>
                <div className='sh-button-container flex justify-end'>
                    <Button
                        id="user-management-save-button"
                        className='bg-primary text-white rounded-lg py-2.5 px-6 mt-4'
                        type='submit'
                    >
                        Kaydet
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UserManagementModalPage