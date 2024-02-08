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
            {/* <div className="flex w-full min-h-[500px] text-left">
                <fieldset data-create-form-fieldset-id={1} className={`${activeModal === 1 ? 'active' : 'hidden'}`}>
                    <Label htmlFor='name' labelText='Hizmet Noktasi Ismi' />
                    <Input id='name' name='name' type='text' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-4' required={true} />

                    <Label htmlFor='title' labelText='Title' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' />
                    <Dropdown id='title' name='title' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-4' required={true} items={['AVM', 'Sosyal Tesis']} />

                    <Label htmlFor='service-point-phone1' labelText='Hizmet Nokasi Sorumlu Telefon' />
                    <div className='flex items-baseline mb-4'>
                        <div className='phone-numbers w-full'>
                            <Input id='service-point-phone1' name='service-point-phone1' type='number' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5' placeholder={'(555) - 123 - 23 - 23'} required={true} />
                            <Input id='service-point-phone1' name='service-point-phone1' type='number' className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 ${isAddedSecondPhone ? 'block' : 'hidden'}`} placeholder={'(555) - 123 - 23 - 23'} required={false} />
                        </div>
                        <Button type='button' className={`bg-blue-800 button font-bold font-medium hover:bg-gray-200 px-4 px-5 py-2 py-2.5 mx-2 rounded-lg text-black text-sm ${isAddedSecondPhone ? 'hidden' : ''}`} onClick={() => setIsAddedSecondPhone(true)}>+</Button>
                    </div>
                    <Button type='button' className='bg-gray-100 button font-bold font-medium hover:bg-gray-200 px-4 px-5 py-2 py-2.5 rounded-lg text-black text-sm rounded-lg' onClick={() => setActiveModal(2)}>+</Button>
                </fieldset>
                <fieldset data-create-form-fieldset-id={2} className={`${activeModal === 2 ? 'active' : ''}`}>
                    <Label htmlFor='description' labelText='Adres' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white ' />
                    <Textarea placeholder="Adresi giriniz..." className={'mb-4'} />
                    <Button type='button' className='bg-gray-100 button font-bold font-medium hover:bg-gray-200 px-4 px-5 py-2 py-2.5 rounded-lg text-black text-sm rounded-lg' onClick={() => setActiveModal(4)}>+</Button>
                </fieldset>


                <fieldset data-create-form-fieldset-id={4} className={`${activeModal === 4 ? 'active' : ''}`}>
                    <Button type='button' className='bg-gray-100 button font-bold font-medium hover:bg-gray-200 px-4 px-5 py-2 py-2.5 rounded-lg text-black text-sm rounded-lg' onClick={() => { }}>+</Button>
                </fieldset>

            </div> */}
        </form>
    )
}

export default ModalBody