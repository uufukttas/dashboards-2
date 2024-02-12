import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';
import './Modal.css';

interface CitiesProps {
    CountryID?: number;
    IsDeleted?: string;
    Name?: string;
    PlateCode?: string;
    RID?: number;
}

interface IFormInput {
    name: string;
    title: string;
    servicePointPhone1: string;
    servicePointPhone2: string;
    address: string;
    xCoordinate: string;
    yCoordinate: string;
    city: string;
    district: string;
    payment: string[];
    parking: boolean;
    opportunity: string[];
}
const ModalBody = () => {
    const { register, handleSubmit, formState: { errors },
    } = useForm<IFormInput>()
    const [activeModal, setActiveModal] = useState(1);
    const [cities, setCities] = useState<CitiesProps[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [districts, setDistricts] = useState<string[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');

    useEffect(() => {
        getCities();
    }, []);

    const getCities = async () => {
        try {
            const cityResponse = await axios.get('https://testapideneme.azurewebsites.net/Values/GetCities').then((response) => response.data);
            setCities(cityResponse.data);
            getDistricts();
        } catch (error) {
            console.log(error);
        }
    };

    const getDistricts = async () => {
        try {
            const districtResponse = await axios.post(`https://testapideneme.azurewebsites.net/Values/GetDistricts`, { 'plateNumber': Number(selectedCity) }).then((response) => response.data);
            setDistricts(districtResponse.data);
        } catch (error) {
            console.log(error);
        }
    }
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)


    const [isAddedSecondPhone, setIsAddedSecondPhone] = useState(false);
    const paymentMethods = ['Kredi Karti', 'Sharz Ugyulamasi'];
    return (
        <form action="#" id="create-service-point" className='relative' onSubmit={handleSubmit(onSubmit)}>
            <ul id="progressbar" className='text-center py-2.5'>
                <li className="active"></li>
                <li className='active'></li>
                <li className='active'></li>
            </ul>
            <div className='sh-fieldset-container flex w-full min-h-[550px] text-left justify-center my-2'>
                <fieldset data-create-form-fieldset-id={1} className={`w-full flex ${activeModal === 1 ? 'active' : 'hidden'}`}>
                    <div className='row-wrapper w-full'>
                        <div className='row w-full flex mb-4'>
                            <div className='service-point-name-wrapper w-1/2 px-2'>
                                <Label htmlFor='name' labelText='Hizmet Noktasi Ismi' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                <Input id='name' type='text' className='bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4' {...register('name', { required: 'Name is required' })} ariaInvalid={errors.name ? true : false}/>
                            </div>
                            <div className='service-point-title-wrapper w-1/2 px-2'>
                                <Label htmlFor='title' labelText='Hizmet Noktasi Ozelligi' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                <Dropdown id='title' className='bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4' {...register('title', { required: 'Title is required'})} required={true} items={['AVM', 'Sosyal Tesis']} />
                            </div>
                        </div>
                        <div className='row w-full'>
                            <div className='service-point-phone-wrapper px-2'>
                                <Label htmlFor='service-point-phone1' labelText='Hizmet Nokasi Sorumlu Telefon' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                <div className='flex items-baseline mb-4'>
                                    <div className='phone-numbers w-full'>
                                        <Input id='service-point-phone1' name='service-point-phone1' type='number' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5' placeholder={'(555) - 123 - 23 - 23'} required={true} />
                                        <Input id='service-point-phone1' name='service-point-phone1' type='number' className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 ${isAddedSecondPhone ? 'block' : 'hidden'}`} placeholder={'(555) - 123 - 23 - 23'} required={false} />
                                        <span className='hidden input-error border p-1 rounded-md text-[red] text-sm'>Telefon Numarasi bos olamaz...</span>
                                    </div>
                                    <Button type='button' className={`bg-blue-800 button font-bold font-medium hover:bg-gray-200 px-4 px-5 py-2 py-2.5 mx-2 rounded-lg text-black text-sm ${isAddedSecondPhone ? 'hidden' : ''}`} onClick={() => setIsAddedSecondPhone(true)}>+</Button>
                                </div>
                            </div>
                        </div>
                        <div className='row w-full'>
                            <div className='service-point-address-wrapper px-2'>
                                <Label htmlFor='address' labelText='Hizmet Noktasi Adresi' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                <Textarea placeholder="Adresi giriniz..." className={'mb-4'} />
                                <span className='hidden input-error border p-1 rounded-md text-[red] text-sm'>Hizmet Noktasi Adresi bos olamaz...</span>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset data-create-form-fieldset-id={2} className={`w-full flex ${activeModal === 2 ? 'active' : 'hidden'}`}>
                    <div className='row-wrapper w-full'>
                        <div className='row w-full flex'>
                            <div className='service-point-coordinate-wrapper w-1/2 px-2'>
                                <Label htmlFor='x-coordinate' labelText='Hizmet Noktasi X Koordinati' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                <Input id='x-coordinate' name='x-coordinate' type='text' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-4' required={true} />
                            </div>
                            <div className='service-point-coordinate-wrapper w-1/2 px-2'>
                                <Label htmlFor='y-coordinate' labelText='Hizmet Noktasi Y Koordinati' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                <Input id='x-coordinate' name='x-coordinate' type='text' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-4' required={true} />
                            </div>
                        </div>

                        <div className='row w-full flex'>
                            <div className='service-point-maps-wrapper w-full h-[300px] px-2'>
                                <>
                                    Harita gelecek
                                </>
                            </div>
                        </div>
                    </div>
                </fieldset>
                {
                    cities &&
                    <fieldset data-create-form-fieldset-id={3} className={`w-full flex ${activeModal === 3 ? 'active' : 'hidden'}`}>
                        <div className='row-wrapper w-full'>
                            <div className='row w-full flex'>
                                <div className='service-point-city-wrapper w-1/2 px-2'>
                                    <Label htmlFor='city' labelText='Hizmet Noktasi İl' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                    <Dropdown id='city' name='city' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-4' required={true} items={cities} onChange={(event) => setSelectedCity(event?.target.value)} value={selectedCity} />
                                </div>
                                <div className='service-point-district-wrapper w-1/2 px-2'>
                                    <Label htmlFor='district' labelText='Hizmet Noktasi İlçe' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                    <Dropdown id='district' name='district' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-4' required={true} items={districts} onChange={(event) => setSelectedDistrict(event?.target.value)} value={selectedDistrict} />
                                </div>
                            </div>

                            <div className='row w-full flex'>
                                <div className='service-point-payment-wrapper w-1/2 px-2'>
                                    <Label htmlFor='payment' labelText='Odeme Yontemleri' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                    <Dropdown id='payment' name='payment' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-4' required={true} items={paymentMethods} />
                                </div>
                                <div className='service-point-parking-wrapper w-1/2 px-2'>
                                    <Label htmlFor='parking' labelText='Ucretsiz Park' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                    <div className='flex items-center justify-center py-2.5'>
                                        <Label htmlFor='parking' labelText='Var' className='block text-sm font-medium text-gray-900 mb-0' />
                                        <Input id='free' name='parking' type='radio' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500' required={true} />
                                        <Label htmlFor='parking' labelText='Yok' className='block text-sm font-medium text-gray-900 mb-0' />
                                        <Input id='paid' name='parking' type='radio' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500' required={true} />
                                    </div>
                                </div>
                            </div>

                            <div className='row w-full flex'>
                                <div className='service-point-opportunity-wrapper'>
                                    <Label htmlFor='opportunity' labelText='Hizmet Noktasi Olanaklari' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                    <div className='flex items-center flex-start py-2.5  flex-wrap'>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='Otopark' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='park' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='Wifi' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='wifi' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='Oyun Alanı' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='game-center' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='Cocuk Oyun Alanı' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='child' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='Sinema' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='cinema' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='Restorant' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='restaurant' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='AVM' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='avm' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='Alisveris' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='avm' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='Konaklama' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='avm' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='WC' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='avm' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='Vale' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='avm' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>
                                        <div className='input-wrapper flex justify-between items-center py-2'>
                                            <Label htmlFor='opportunity' labelText='Otel' className='block text-sm font-medium text-gray-900 mb-0 no-wrap px-4' />
                                            <Input id='avm' name='opportunity' type='checkbox' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block' required={true} />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                }
            </div>
            <div className='sh-fieldset-action-button-container flex justify-between w-full float-right mt-5 relative'>
                <Button type="button" className={`bg-blue-500 button font-bold font-medium hover:bg-blue-800 px-4 px-5 py-2 py-2.5 mx-2 rounded-lg text-black text-sm flex justify-start absolute -top-16 left-0 ${activeModal !== 1 ? 'flex' : 'hidden'}`} onClick={() => setActiveModal(activeModal - 1)}>Geri</Button>
                <Button type={activeModal === 3 ? 'submit' : 'button'} className='bg-blue-500 button font-bold font-medium hover:bg-blue-800 px-4 px-5 py-2 py-2.5 mx-2 rounded-lg text-black text-sm flex justify-end absolute -top-16 right-0' onClick={() => setActiveModal(activeModal + 1)}>{activeModal === 3 ? 'Kaydet' : 'Sonraki'}</Button>
            </div>
        </form>
    )
}

export default ModalBody