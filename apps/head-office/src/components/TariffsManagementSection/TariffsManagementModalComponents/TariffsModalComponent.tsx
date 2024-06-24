import React, { useState } from 'react';
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
import { FaCircleInfo } from 'react-icons/fa6';

const TariffsModalComponent: React.FC = () => {
    const tariffData = useSelector((state: RootState) => state.tariffData);
    const hasTariffDataId: boolean = tariffData.id > 0;
    const formName: string[] = ['name', 'price', 'isActive', 'isDateSelected', 'startDate', 'endDate'];
    const sectionPrefix: string = `${BRAND_PREFIX}-tariff-management`;
    const formProperties = {
        name: `${sectionPrefix}-${formName[0]}`,
        price: `${sectionPrefix}-${formName[1]}`,
        isActive: `${sectionPrefix}-${formName[2]}`,
        isDateSelected: `${sectionPrefix}-${formName[3]}`,
        startDate: `${sectionPrefix}-${formName[4]}`,
        endDate: `${sectionPrefix}-${formName[5]}`,
    };
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm();
    const [tariffFormData, setTariffFormData] = useState({
        [`${formProperties.name}`]: tariffData.name || '',
        [`${formProperties.price}`]: tariffData.SaleUnitPrice || '',
        [`${formProperties.isActive}`]: tariffData.isActive || '',
        [`${formProperties.isDateSelected}`]: tariffData.isDateSelected || [],
        [`${formProperties.startDate}`]: tariffData.startDate || '',
        [`${formProperties.endDate}`]: tariffData.endDate || '',
    });
    const [isVisibleDateArea, setIsVisibleDateArea] = useState(false);
    const handleFormSubmit = async (): Promise<void> => {
        let response;

        setTimeout(() => {
            dispatch(hideAlert());
        }, 5000);

        dispatch(toggleModalVisibility(false));
        dispatch(toggleUserListUpdate(true));
    };

    return (
        <div className={`${BRAND_PREFIX}-tariff-${hasTariffDataId ? 'update' : 'create'}-modal-form-container relative p-6 bg-white rounded-lg max-h-[650px] flex flex-col`}>
            <form
                className={`${sectionPrefix}-modal-form block`}
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <div className={`${sectionPrefix}-name-contianer`}>
                    <Label
                        className='block mb-2 text-heading mt-2 font-bold'
                        htmlFor={`${sectionPrefix}-username`}
                        labelText={`Tarife Adi`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary'
                        id={`${sectionPrefix}-name`}
                        name={`${sectionPrefix}-name`}
                        register={register(`${sectionPrefix}-name`, {
                            required: 'Tarife Adi zorunlu',
                            onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                setTariffFormData({
                                    ...tariffFormData,
                                    [event.target.name]: event.target.value,
                                })
                            },
                            value: tariffFormData[`${sectionPrefix}-tariff-name`]
                        })}
                        type="text"
                    />
                </div>
                <div className={`${sectionPrefix}-price-contianer`}>
                    <Label
                        className='block mb-2 text-heading mt-2 font-bold'
                        htmlFor={`${sectionPrefix}-price`}
                        labelText={`Fiyat`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary'
                        id={`${sectionPrefix}-price`}
                        name={`${sectionPrefix}-price`}
                        register={register(`${sectionPrefix}-price`, {
                            required: 'Fiyat zorunlu',
                            onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                setTariffFormData({
                                    ...tariffFormData,
                                    [event.target.name]: event.target.value,
                                });
                            },
                            value: tariffFormData[`${sectionPrefix}-price`]
                        })}
                        type="number"
                    />
                </div>
                <div className={`${sectionPrefix}-status-container w-full`}>
                    <div className={`${sectionPrefix}-service-revenue-container w-full items-center flex`}>
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold w-1/2'
                            htmlFor={`${sectionPrefix}-eMail`}
                            labelText={`Hizmet Geliri raporlansin mi?`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block p-2.5 focus:ring-primary focus:border-primary mx-8'
                            id={`${sectionPrefix}-status`}
                            name={`${sectionPrefix}-status`}
                            register={register(`${sectionPrefix}-status`, {
                                required: 'Status is required',
                                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                    setTariffFormData({
                                        ...tariffFormData,
                                        [event.target.name]: event.target.value,
                                    });
                                },
                                value: tariffFormData[`${sectionPrefix}-status`]
                            })}
                            type="checkbox"
                        />
                    </div>
                    <div className={`${sectionPrefix}-energy-cost-container w-full items-center flex flex-col`}>
                        <div className='w-full flex'>
                            <Label
                                className='block mb-2 text-heading mt-2 font-bold w-1/2'
                                htmlFor={`${sectionPrefix}-eMail`}
                                labelText={`Birim Enerji Maliyeti raporlansin mi?`}
                            />
                            <Input
                                className='border text-text text-sm rounded-lg block p-2.5 focus:ring-primary focus:border-primary mx-8'
                                id={`${sectionPrefix}-status`}
                                name={`${sectionPrefix}-status`}
                                register={register(`${sectionPrefix}-status`, {
                                    required: 'Status is required',
                                    onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                        setTariffFormData({
                                            ...tariffFormData,
                                            [event.target.name]: event.target.value,
                                        });
                                    },
                                    value: tariffFormData[`${sectionPrefix}-status`]
                                })}
                                type="checkbox"
                            />
                        </div>
                        <div>
                            {
                                <div className='error text-red flex items-center justify-between '>
                                    <FaCircleInfo className='w-1/12'/>
                                    <p className='w-11/12'>Isaretlenmedigi takdirde enerji maliyeti bilgisi raporlama ekraninda gosterilmeyecektir</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={`${sectionPrefix}-time-container w-full items-center flex`}>
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold w-1/2'
                            htmlFor={`${sectionPrefix}-time`}
                            labelText={`Tarih ayari var mi?`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block p-2.5 focus:ring-primary focus:border-primary mx-8'
                            id={`${sectionPrefix}-time-selection`}
                            name={`${sectionPrefix}-time-selection`}
                            register={register(`${sectionPrefix}-time-selection`, {
                                required: 'Tarih girisi zorunlu',
                                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                    setIsVisibleDateArea(event.target.checked);
                                    setTariffFormData({
                                        ...tariffFormData,
                                        [event.target.name]: event.target.value,
                                    });
                                },
                                value: tariffFormData[`${sectionPrefix}-time-selection`]
                            })}
                            type="checkbox"
                        />
                    </div>
                </div>
                {
                    isVisibleDateArea &&
                    <div className={`${sectionPrefix}-date-container flex`}>
                        <div className={`${sectionPrefix}-start-date-container w-1/2`}>
                            <Label
                                className='block mb-2 text-heading mt-2 font-bold'
                                htmlFor={`${sectionPrefix}-name`}
                                labelText={`Baslangic Tarihi`}
                            />
                            <Input
                                className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary mr-2'
                                id={`${sectionPrefix}-start-date`}
                                name={`${sectionPrefix}-start-date`}
                                register={register(`${sectionPrefix}-start-date`, {
                                    required: 'Baslangic Tarihi zorunlu',
                                    onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                        setTariffFormData({
                                            ...tariffFormData,
                                            [event.target.name]: event.target.value,
                                        });
                                    },
                                    value: tariffFormData[`${sectionPrefix}-start-date`]
                                })}
                                type="date"
                            />
                        </div>
                        <div className={`${sectionPrefix}-end-date-container w-1/2`}>
                            <Label
                                className='block mb-2 text-heading mt-2 font-bold'
                                htmlFor={`${sectionPrefix}-surname`}
                                labelText={`Bitis Tarihi`}
                            />
                            <Input
                                className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary ml-2'
                                id={`${sectionPrefix}-end-date`}
                                name={`${sectionPrefix}-end-date`}
                                register={register(`${sectionPrefix}-end-date`, {
                                    required: 'Bitis Tarihi zorunlu',
                                    onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                        setTariffFormData({
                                            ...tariffFormData,
                                            [event.target.name]: event.target.value,
                                        });
                                    },
                                    value: tariffFormData[`${sectionPrefix}-end-date`]
                                })}
                                type="date"
                            />
                        </div>
                    </div>
                }
                <div className={`${sectionPrefix}-submit-button-container flex justify-end`}>
                    <Button
                        className='bg-primary text-white rounded-md px-4 py-2 mt-4'
                        id={`${sectionPrefix}-submit-button`}
                        type='submit'
                    >
                        Kaydet
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TariffsModalComponent;
