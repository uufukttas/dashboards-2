import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { addTariffRequest } from '../../../../app/api/tariffsManagement';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { toggleTariffListUpdated } from '../../../../app/redux/features/isTariffListUpdated';
import { RootState } from '../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { FaCircleInfo } from 'react-icons/fa6';

const TariffsModalComponent: React.FC = () => {
    const tariffData = useSelector((state: RootState) => state.tariffData);
    const hasTariffDataId: boolean = tariffData.id > 0;
    const formName: string[] =
        ['name', 'min-range', 'max-range', 'price', 'vat', 'service-revenue','energy-cost', 'is-date-selected', 'start-date', 'end-date'];
    const sectionPrefix: string = `${BRAND_PREFIX}-tariff-management`;
    const formProperties = {
        name: `${sectionPrefix}-${formName[0]}`,
        min: `${sectionPrefix}-${formName[1]}`,
        max: `${sectionPrefix}-${formName[2]}`,
        price: `${sectionPrefix}-${formName[3]}`,
        vat: `${sectionPrefix}-${formName[4]}`,
        serviceRevenue: `${sectionPrefix}-${formName[5]}`,
        energyCost: `${sectionPrefix}-${formName[6]}`,
        isDateSelected: `${sectionPrefix}-${formName[7]}`,
        startDate: `${sectionPrefix}-${formName[8]}`,
        endDate: `${sectionPrefix}-${formName[9]}`,
    };
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm();
    const [tariffFormData, setTariffFormData] = useState({
        [`${formProperties.name}`]: tariffData.name || '',
        [`${formProperties.min}`]: tariffData.MinEnergy || '',
        [`${formProperties.max}`]: tariffData.MaxEnergy || '',
        [`${formProperties.price}`]: tariffData.SaleUnitPrice || '',
        [`${formProperties.vat}`]: tariffData.vat || '20',
        [`${formProperties.serviceRevenue}`]: tariffData.serviceRevenue || false,
        [`${formProperties.energyCost}`]: tariffData.energyCost || true,
        [`${formProperties.isDateSelected}`]: tariffData.isDateSelected || false,
        [`${formProperties.startDate}`]: tariffData.startDate || '',
        [`${formProperties.endDate}`]: tariffData.endDate || '',
    });
    const [isVisibleDateArea, setIsVisibleDateArea] = useState(false);

    const handleFormSubmit = async (): Promise<void> => {
        const requestData = {
            tariff: {
                name: tariffFormData[`${formProperties.name}`],
                validityBeginDate: tariffFormData[`${formProperties.startDate}`],
                validityEndDate: tariffFormData[`${formProperties.endDate}`],
                minKW: tariffFormData[`${formProperties.min}`],
                maxKW: tariffFormData[`${formProperties.max}`],
                saleUnitPrice: tariffFormData[`${formProperties.price}`],
            },
            subfraction: [
                {
                    tariffSubFractionType: 11,
                    subFractionValue: tariffFormData[`${formProperties.serviceRevenue}`] ? 1 : 0
                },
                {
                    tariffSubFractionType: 8,
                    subFractionValue: tariffFormData[`${formProperties.vat}`]
                },
                {
                    tariffSubFractionType: 1,
                    subFractionValue: tariffFormData[`${formProperties.energyCost}`] ? 1 : 0
                }
            ],
        };

        const response = await addTariffRequest(requestData);

        dispatch(showAlert({
            message: response.success ? 'Tarife basariyla eklendi' : 'Tarife eklenirken bir hata olustu',
            type: response.success ? 'success' : 'error',
        }));

        setTimeout(() => {
            dispatch(hideAlert());
        }, 5000);

        dispatch(toggleModalVisibility(false));
        dispatch(toggleTariffListUpdated(true));
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
                        labelText={`Tarife Adı`}
                    />
                    <Input
                        className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary'
                        id={`${sectionPrefix}-name`}
                        name={`${sectionPrefix}-name`}
                        register={register(`${sectionPrefix}-name`, {
                            required: 'Tarife Adı zorunlu',
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
                <div className={`${sectionPrefix}-energy-range-container w-full flex`}>
                    <div className={`${sectionPrefix}-energy-min-range-container w-1/2`}>
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold'
                            htmlFor={`${sectionPrefix}-min-range`}
                            labelText={`Enerji Minimum Aralığı`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary mr-2'
                            id={`${sectionPrefix}-energy-min-range`}
                            name={`${sectionPrefix}-min-range`}
                            register={register(`${sectionPrefix}-min-range`, {
                                required: 'Minimum Aralik zorunlu',
                                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                    setTariffFormData({
                                        ...tariffFormData,
                                        [event.target.name]: event.target.value,
                                    });
                                },
                                value: tariffFormData[`${sectionPrefix}-min`]
                            })}
                            type="number"
                        />
                    </div>
                    <div className={`${sectionPrefix}-energy-max-range-container w-1/2`}>
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold'
                            htmlFor={`${sectionPrefix}-max-range`}
                            labelText={`Enerji Maximum Aralığı`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary ml-2'
                            id={`${sectionPrefix}-max-range`}
                            name={`${sectionPrefix}-max-range`}
                            register={register(`${sectionPrefix}-max-range`, {
                                required: 'Maximum Aralik zorunlu',
                                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                    setTariffFormData({
                                        ...tariffFormData,
                                        [event.target.name]: event.target.value,
                                    });
                                },
                                value: tariffFormData[`${sectionPrefix}-max`]
                            })}
                            type="number"
                        />
                    </div>

                </div>
                <div className={`${sectionPrefix}-cost-contianer w-full flex`}>
                    <div className={`${sectionPrefix}-price-container w-1/2`}>
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold'
                            htmlFor={`${sectionPrefix}-price`}
                            labelText={`Fiyat (KDV Dahil)`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary mr-2'
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
                            type="text"
                        />
                    </div>
                    <div className={`${sectionPrefix}-vat-container w-1/4`}>
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold'
                            htmlFor={`${sectionPrefix}-vat`}
                            labelText={`KDV`}
                        />
                        <div className={`${sectionPrefix}-vat-price-container flex justify-center items-center`}>
                            <Input
                                className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary ml-2'
                                id={`${sectionPrefix}-vat`}
                                name={`${sectionPrefix}-vat`}
                                placeholder='20'
                                register={register(`${sectionPrefix}-vat`, {
                                    required: 'KDV zorunlu',
                                    onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                        setTariffFormData({
                                            ...tariffFormData,
                                            [event.target.name]: event.target.checked,
                                        });
                                    },
                                    value: tariffFormData[`${sectionPrefix}-vat`] || '20'
                                })}
                                type="text"
                            />
                            <span className='text-text text-xl mb-4 mx-2'>%</span>
                        </div>
                    </div>
                </div>
                <div className={`${sectionPrefix}-status-container w-full`}>
                    <div className={`${sectionPrefix}-service-revenue-container w-full items-center flex`}>
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold w-1/2'
                            htmlFor={`${sectionPrefix}-eMail`}
                            labelText={`Hizmet Geliri raporlansın mı?`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block p-2.5 focus:ring-primary focus:border-primary mx-8'
                            id={`${sectionPrefix}-service-revenue`}
                            name={`${sectionPrefix}-service-revenue`}
                            register={register(`${sectionPrefix}-service-revenue`, {
                                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                    setTariffFormData({
                                        ...tariffFormData,
                                        [event.target.name]: event.target.checked,
                                    });
                                },
                                value: tariffFormData[`${sectionPrefix}-service-revenue`]
                            })}
                            type="checkbox"
                        />
                    </div>
                    <div className={`${sectionPrefix}-energy-cost-container w-full items-center flex flex-col`}>
                        <div className='w-full flex'>
                            <Label
                                className='block mb-2 text-heading mt-2 font-bold w-1/2'
                                htmlFor={`${sectionPrefix}-energy-cost`}
                                labelText={`Birim Enerji Maliyeti raporlansın mı?`}
                            />
                            <Input
                                className='border text-text text-sm rounded-lg block p-2.5 focus:ring-primary focus:border-primary mx-8'
                                id={`${sectionPrefix}-energy-cost`}
                                name={`${sectionPrefix}-energy-cost`}
                                register={register(`${sectionPrefix}-energy-cost`, {
                                    onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                                        setTariffFormData({
                                            ...tariffFormData,
                                            [event.target.name]: event.target.value,
                                        });
                                    },
                                    value: tariffFormData[`${sectionPrefix}-energy-cost`]
                                })}
                                type="checkbox"
                            />
                        </div>
                        <div>
                            {
                                <div className='error text-red flex items-center justify-between '>
                                    <FaCircleInfo className='w-1/12' />
                                    <p className='w-11/12'>İşaretlenmediği takdirde enerji maliyeti bilgisi raporlama ekranında gösterilmeyecektir</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={`${sectionPrefix}-time-container w-full items-center flex`}>
                        <Label
                            className='block mb-2 text-heading mt-2 font-bold w-1/2'
                            htmlFor={`${sectionPrefix}-time`}
                            labelText={`Tarih ayarı var mı?`}
                        />
                        <Input
                            className='border text-text text-sm rounded-lg block p-2.5 focus:ring-primary focus:border-primary mx-8'
                            id={`${sectionPrefix}-time-selection`}
                            name={`${sectionPrefix}-time-selection`}
                            register={register(`${sectionPrefix}-time-selection`, {
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
                                labelText={`Baslangıç Tarihi`}
                            />
                            <Input
                                className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary mr-2'
                                id={`${sectionPrefix}-start-date`}
                                name={`${sectionPrefix}-start-date`}
                                register={register(`${sectionPrefix}-start-date`, {
                                    required: 'Baslangıç Tarihi zorunlu',
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
                                labelText={`Bitiş Tarihi`}
                            />
                            <Input
                                className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary ml-2'
                                id={`${sectionPrefix}-end-date`}
                                name={`${sectionPrefix}-end-date`}
                                register={register(`${sectionPrefix}-end-date`, {
                                    required: 'Bitiş Tarihi zorunlu',
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
