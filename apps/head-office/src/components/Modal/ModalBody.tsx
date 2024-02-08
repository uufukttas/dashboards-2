import { Input } from '@projects/input'
import { Label } from '@projects/label'
import { Dropdown } from '@projects/dropdown'
import React, { useState } from 'react'
import { Button } from '@projects/button'
import { Textarea } from '@projects/textarea'
import './Modal.css'


interface ModalBodyProps {
}

const ModalBody = (props: ModalBodyProps) => {
    const [activeModal, setActiveModal] = useState(1);
    const [isAddedSecondPhone, setIsAddedSecondPhone] = useState(false);
    return (
        <form action="#" id="create-service-point" className='relative'>
            <ul id="progressbar" className='text-center py-2.5'>
                <li className="active">Personal Details</li>
                <li className='active'>Social Profiles</li>
                <li className='active'>Account Setup</li>
            </ul>
            <div className='sh-fieldset-container flex w-full min-h-[450px] text-left justify-center mt-5'>
                <fieldset data-create-form-fieldset-id={1} className={`w-full flex ${activeModal === 1 ? 'active' : 'hidden'}`}>
                    <div className='row-wrapper w-full'>
                        <div className='row w-full flex'>
                            <div className='service-point-name-wrapper w-1/2 px-2'>
                                <Label htmlFor='name' labelText='Hizmet Noktasi Ismi' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                <Input id='name' name='name' type='text' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-4' required={true} />
                            </div>
                            <div className='service-point-title-wrapper w-1/2 px-2'>
                                <Label htmlFor='title' labelText='Hizmet Noktasi Ozelligi' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                <Dropdown id='title' name='title' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-4' required={true} items={['AVM', 'Sosyal Tesis']} />
                            </div>
                        </div>
                        <div className='row w-full'>
                            <div className='service-point-phone-wrapper px-2'>
                                <Label htmlFor='service-point-phone1' labelText='Hizmet Nokasi Sorumlu Telefon' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                <div className='flex items-baseline mb-4'>
                                    <div className='phone-numbers w-full'>
                                        <Input id='service-point-phone1' name='service-point-phone1' type='number' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5' placeholder={'(555) - 123 - 23 - 23'} required={true} />
                                        <Input id='service-point-phone1' name='service-point-phone1' type='number' className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 ${isAddedSecondPhone ? 'block' : 'hidden'}`} placeholder={'(555) - 123 - 23 - 23'} required={false} />
                                    </div>
                                    <Button type='button' className={`bg-blue-800 button font-bold font-medium hover:bg-gray-200 px-4 px-5 py-2 py-2.5 mx-2 rounded-lg text-black text-sm ${isAddedSecondPhone ? 'hidden' : ''}`} onClick={() => setIsAddedSecondPhone(true)}>+</Button>
                                </div>
                            </div>
                        </div>
                        <div className='row w-full'>
                            <div className='service-point-address-wrapper px-2'>
                                <Label htmlFor='address' labelText='Hizmet Noktasi Adresi' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                                <Textarea placeholder="Adresi giriniz..." className={'mb-4'} />
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
            </div>
            <div className='sh-fieldset-action-button-container flex justify-between w-full float-right mt-5 relative'>
                <Button type="button" className={`bg-blue-500 button font-bold font-medium hover:bg-blue-800 px-4 px-5 py-2 py-2.5 mx-2 rounded-lg text-black text-sm flex justify-start absolute -top-16 left-0 ${activeModal !== 1 ? 'flex' : 'hidden'}`} onClick={() => setActiveModal(activeModal - 1)}>Geri</Button>
                <Button type="button" className='bg-blue-500 button font-bold font-medium hover:bg-blue-800 px-4 px-5 py-2 py-2.5 mx-2 rounded-lg text-black text-sm flex justify-end absolute -top-16 right-0' onClick={() => setActiveModal(activeModal + 1)}>Sonraki</Button>
            </div>
        </form>
    )
}

export default ModalBody