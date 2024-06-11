import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { CheckboxInDropdown } from '@projects/checkbox-in-dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { registerUserRequest, updateUserRequest } from '../../../../app/api/userManagements';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { toggleUserListUpdate } from '../../../../app/redux/features/isUserListUpdated';
import { RootState } from '../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { IUserRoleProps } from '../types';

const UserManagementModalPage: React.FC = () => {
    const userData = useSelector((state: RootState) => state.userData);
    const hasUserDataId: boolean = userData.userId > 0;
    const sectionPrefix: string = 'user-management';
    const formName: string[] = ['userName', 'name', 'surname', 'eMail', 'phoneNumber', 'roles'];
    const formProperties = {
        userName: `${sectionPrefix}-${formName[0]}`,
        name: `${sectionPrefix}-${formName[1]}`,
        surname: `${sectionPrefix}-${formName[2]}`,
        eMail: `${sectionPrefix}-${formName[3]}`,
        phoneNumber: `${sectionPrefix}-${formName[4]}`,
        roles: `${sectionPrefix}-${formName[5]}`,
    };
    const dispatch = useDispatch();
    const {handleSubmit, register } = useForm();
    const [roles, setRoles] = useState<IUserRoleProps[]>([
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
    const [userFormData, setUserFormData] = useState({
        [`${formProperties.userName}`]: userData.userName || '',
        [`${formProperties.eMail}`]: userData.eMail || '',
        [`${formProperties.phoneNumber}`]: userData.phoneNumber || '',
        [`${formProperties.roles}`]: userData.roles || [],
        [`${formProperties.name}`]: userData.name || '',
        [`${formProperties.surname}`]: userData.surname || '',
    });

    const handleFormSubmit = async (): Promise<void> => {
        let response;

        if (!hasUserDataId) {
            response = await registerUserRequest({
                userName: userFormData[`${sectionPrefix}-userName`],
                password: userData[`${sectionPrefix}-phoneNumber`],
                newPassword: userData[`${sectionPrefix}-phoneNumber`],
                eMail: userFormData[`${sectionPrefix}-eMail`],
                phoneNumber: userFormData[`${sectionPrefix}-phoneNumber`],
                roles: userFormData[`${sectionPrefix}-roles`].map((role: {
                    id: number;
                    name: string;
                    isChecked: boolean;
                    rid: number | null;
                    stationFeatureType: number;
                    stationFeatureValue: number;
                }) => role.name),
                name: userFormData[`${sectionPrefix}-name`],
                surname: userFormData[`${sectionPrefix}-surname`],
            });
        } else {
            response = await updateUserRequest({
                id: userData.userId,
                name: userFormData[`${sectionPrefix}-name`],
                surname: userFormData[`${sectionPrefix}-surname`],
                eMail: userFormData[`${sectionPrefix}-eMail`],
                phoneNumber: userFormData[`${sectionPrefix}-phoneNumber`],
                roles: userFormData[`${sectionPrefix}-roles`].map((role: {
                    id: number;
                    name: string;
                    isChecked: boolean;
                    rid: number | null;
                    stationFeatureType: number;
                    stationFeatureValue: number;
                }) => role.name)
            });
        };

        dispatch(
            showAlert({
                message: response.message,
                type: response.isSuccess ? 'success' : 'error'
            })
        );

        setTimeout(() => {
            dispatch(hideAlert());
        }, 5000);

        dispatch(toggleModalVisibility(false));
        dispatch(toggleUserListUpdate(true));
    };
    const prepareUserSelectedRoles = (roles: IUserRoleProps[]): void => {
        userData.roles.forEach((role: string) => {
            const roleIndex = roles.findIndex((item: IUserRoleProps) => item.name === role);

            roles[roleIndex].isChecked = true;
        });

        setRoles(roles);
    };

    useEffect(() => {
        prepareUserSelectedRoles(roles);
    }, []);

    return (
        <div className={`${BRAND_PREFIX}-user-create-modal-form-container relative p-6 bg-white rounded-lg max-h-[650px]`}>
            <form
                className={`${sectionPrefix}-modal-form block`}
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <div className="sh-username-contianer">
                    <Label
                        className='block mb-2 text-heading mt-2 font-bold'
                        htmlFor={`${sectionPrefix}-username`}
                        labelText={`Kullanici Adi`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary'
                        id={`${sectionPrefix}-userName`}
                        name={`${sectionPrefix}-userName`}
                        disabled={hasUserDataId}
                        register={register(`${sectionPrefix}-userName`, {
                            required: 'Kullanici Adi zorunlu',
                            onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                setUserFormData({
                                    ...userFormData,
                                    [event.target.name]: event.target.value,
                                })
                            },
                            value: userFormData[`${sectionPrefix}-userName`]
                        })}
                        type="text"
                    />
                </div>
                <div className='sh-name-surname-container flex'>
                    <div className="sh-name-container w-1/2">
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold'
                            htmlFor={`${sectionPrefix}-name`}
                            labelText={`Isim`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary mr-2'
                            id={`${sectionPrefix}-name`}
                            name={`${sectionPrefix}-name`}
                            register={register(`${sectionPrefix}-name`, {
                                required: 'Name is required',
                                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                    setUserFormData({
                                        ...userFormData,
                                        [event.target.name]: event.target.value,
                                    });
                                },
                                value: userFormData[`${sectionPrefix}-name`]
                            })}
                            type="text"
                        />
                    </div>
                    <div className="sh-surname-container w-1/2">
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold'
                            htmlFor={`${sectionPrefix}-surname`}
                            labelText={`Soy isim`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary ml-2'
                            id={`${sectionPrefix}-surname`}
                            name={`${sectionPrefix}-lasntame`}
                            register={register(`${sectionPrefix}-surname`, {
                                required: 'Last Name is required',
                                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                    setUserFormData({
                                        ...userFormData,
                                        [event.target.name]: event.target.value,
                                    });
                                },
                                value: userFormData[`${sectionPrefix}-surname`]
                            })}
                            type="text"
                        />
                    </div>
                </div>
                <div className="sh-eMail-container">
                    <Label
                        className='block mb-2 text-heading mt-2 font-bold'
                        htmlFor={`${sectionPrefix}-eMail`}
                        labelText={`eMail`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary'
                        id={`${sectionPrefix}-eMail`}
                        name={`${sectionPrefix}-eMail`}
                        register={register(`${sectionPrefix}-eMail`, {
                            required: 'eMail is required',
                            onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                setUserFormData({
                                    ...userFormData,
                                    [event.target.name]: event.target.value,
                                });
                            },
                            value: userFormData[`${sectionPrefix}-eMail`]
                        })}
                        type="eMail"
                    />
                </div>
                <div className='sh-phone-container'>
                    <Label
                        className='block mb-2 text-heading mt-2 font-bold'
                        htmlFor={`${sectionPrefix}-phoneNumber`}
                        labelText={`Telefon`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary'
                        id={`${sectionPrefix}-phoneNumber`}
                        name={`${sectionPrefix}-phoneNumber`}
                        register={register(`${sectionPrefix}-phoneNumber`, {
                            required: 'Phone is required',
                            onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                setUserFormData({
                                    ...userFormData,
                                    [event.target.name]: event.target.value,
                                });
                            },
                            value: userFormData[`${sectionPrefix}-phoneNumber`]
                        })}
                        type="tel"
                    />
                </div>
                <div className='sh-role-container'>
                    <Label
                        className='block mb-2 text-heading mt-2 font-bold'
                        htmlFor={`${sectionPrefix}-roles`}
                        labelText={`Role`}
                    />
                    <CheckboxInDropdown
                        className='border text-text text-sm rounded-lg block w-full mb-4 focus:ring-primary focus:border-primary'
                        id={`${sectionPrefix}-roles`}
                        inputName={`${sectionPrefix}-roles`}
                        items={roles}
                        onChange={(role) => {
                            const updatedRoles = role.map((item) => ({
                                id: item.id || 0,
                                name: item.name,
                                isChecked: item.isChecked || false,
                                rid: null,
                                stationFeatureType: item.stationFeatureType,
                                stationFeatureValue: item.stationFeatureValue,
                            }));
                            setRoles(updatedRoles);
                            setUserFormData({
                                ...userFormData,
                                [`${sectionPrefix}-roles`]: updatedRoles.filter((role) => role.isChecked) as [],
                            });
                        }}
                    />
                </div>
                <div className='sh-button-container flex justify-end'>
                    <Button
                        id={`${sectionPrefix}-save-button`}
                        className='bg-primary text-white rounded-lg py-2.5 px-6 mt-4'
                        type='submit'
                    >
                        Kaydet
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UserManagementModalPage;
