import React, { useState } from 'react';
import axios from 'axios';
import { BiRefresh } from "react-icons/bi";
import { FaExchangeAlt, FaTelegramPlane } from 'react-icons/fa';
import { FaLockOpen, FaPlay, FaStop } from "react-icons/fa6";
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../constants/constants';

const StationManagementModal: React.FC<{ unitCode: string; connectorNumber: number }> = ({ unitCode, connectorNumber }: { unitCode: string; connectorNumber: number }) => {
    const sectionPrefix = 'station-management';
    const stateManagementFormData = {
        refresh: '',
        statusId: '',
        notificationId: '',
        phoneNumber: '',
    };
    const [formData, setFormData] = useState(stateManagementFormData);

    return (
        <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
            <form
                className={`${BRAND_PREFIX}-${sectionPrefix}-form w-full`}
                onSubmit={() => { }}
            >
                <div className={`${BRAND_PREFIX}-${sectionPrefix}-station-info flex justify-between items-center`}>
                    <div className={`${BRAND_PREFIX}-${sectionPrefix}-station-info-left`}>
                        <Label
                            className={`${BRAND_PREFIX}-${sectionPrefix}-station-name-label block mb-2 text-heading font-semibold`}
                            htmlFor={`${BRAND_PREFIX}-${sectionPrefix}-station-name`}
                            labelText='Unite Kodu'
                        />
                        <Input
                            className={`${BRAND_PREFIX}-${sectionPrefix}-station-id border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary bg-[#DDDDDD]`}
                            disabled={true}
                            id={`${BRAND_PREFIX}-${sectionPrefix}-station-id`}
                            name={`${BRAND_PREFIX}-${sectionPrefix}-station-id`}
                            type='text'
                            value={unitCode}
                        />
                    </div>
                    <div className={`${BRAND_PREFIX}-${sectionPrefix}-station-info-right`}>
                        <Label
                            className={`${BRAND_PREFIX}-${sectionPrefix}-connector-number-label block mb-2 text-heading font-semibold`}
                            htmlFor={`${BRAND_PREFIX}-${sectionPrefix}-connector-number`}
                            labelText='Konnektor Numarasi'
                        />
                        <Input
                            className={`${BRAND_PREFIX}-${sectionPrefix}-connector-number border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary bg-[#DDDDDD]`}
                            disabled={true}
                            id={`${BRAND_PREFIX}-${sectionPrefix}-connector-number`}
                            name={`${BRAND_PREFIX}-${sectionPrefix}-connector-number`}
                            type='text'
                            value={connectorNumber.toString()}
                        />
                    </div>
                </div>
                <hr className={`${sectionPrefix}-header-line w-full my-4`} />
                <div className={`${BRAND_PREFIX}-${sectionPrefix}-station-actions-contaier flex justify-between items-center flex-col`}>
                    <div className={`${BRAND_PREFIX}-${sectionPrefix}-station-actions-container flex justify-between items-center w-full`}>
                        <div className={`${BRAND_PREFIX}-${sectionPrefix}-station-refresh-actions-container`}>
                            <Label
                                className={`${BRAND_PREFIX}-${sectionPrefix}-station-refresh-label block mb-2 text-heading font-semibold`}
                                htmlFor={`${BRAND_PREFIX}-${sectionPrefix}-station-refresh`}
                                labelText='Yeniden Baslat'
                            />
                            <div className={`${BRAND_PREFIX}-${sectionPrefix}-station-refresh-input-container flex justify-between items-center`}>
                                <Dropdown
                                    className={`${BRAND_PREFIX}-${sectionPrefix}-station-refresh border text-text text-sm rounded-lg block w-full p-2.5 focus:ring-primary focus:border-primary`}
                                    id={`${BRAND_PREFIX}-${sectionPrefix}-station-refresh`}
                                    name={`${BRAND_PREFIX}-${sectionPrefix}-station-refresh`}
                                    items={[
                                        {
                                            id: null,
                                            name: 'Secim Yapiniz...',
                                            rid: 'Secim Yapiniz...',
                                            // disabled: true,
                                            selected: true
                                        },
                                        {
                                            id: null,
                                            name: 'Hard',
                                            rid: 'Hard'
                                        }, {
                                            id: null,
                                            name: 'Soft',
                                            rid: 'Soft'
                                        }]
                                    }
                                    onChange={(e) => {
                                        setFormData({ ...formData, refresh: e.target.value });
                                    }}
                                />
                                <Button
                                    className={`${BRAND_PREFIX}-${sectionPrefix}-station-refresh-button bg-primary text-white text-xl font-semibold rounded-lg p-2.5 mx-4`}
                                    id={`${BRAND_PREFIX}-${sectionPrefix}-station-refresh-button`}
                                    type='button'
                                    onClick={() => {
                                        const response = axios.post(
                                            'http://192.168.3.75:91/DeviceOperation/ResetDevice',
                                            {
                                                "chargePointId": unitCode,
                                                "reset": (formData.refresh === 'Secim Yapiniz' || formData.refresh === '') ? 'Hard' : formData.refresh,
                                                "companyId": 2
                                            },
                                            { headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" } }
                                        )

                                        console.log(response);
                                    }}
                                >
                                    <BiRefresh />
                                </Button>
                            </div>
                        </div>
                        <div className={`${BRAND_PREFIX}-${sectionPrefix}-connector-lock-action-container flex justify-between items-center flex-col`}>
                            <Label
                                className={`${BRAND_PREFIX}-${sectionPrefix}-connector-lock-label block mb-2 text-heading font-semibold`}
                                htmlFor={`${BRAND_PREFIX}-${sectionPrefix}-connector-lock`}
                                labelText='Konnektor Kilit'
                            />
                            <div className={`${BRAND_PREFIX}-${sectionPrefix}-connector-lock-input-container flex justify-between items-center`}>
                                <Button
                                    className={`${BRAND_PREFIX}-${sectionPrefix}-connector-lock-button bg-primary text-white text-xl font-semibold rounded-lg py-2 px-4 mx-2`}
                                    id={`${BRAND_PREFIX}-${sectionPrefix}-connector-lock-button`}
                                    type='button'
                                    onClick={() => {
                                        const response = axios.post(
                                            'http://192.168.3.75:91/DeviceOperation/UnlockConnector',
                                            { "chargePointId": unitCode, "companyId": 2 },
                                            { headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" } }
                                        )

                                        console.log('response', response)
                                    }}
                                >
                                    <FaLockOpen />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={`${BRAND_PREFIX}-${sectionPrefix}-station-actions-container flex justify-between items-center w-full my-4`}>
                        <div className={`${BRAND_PREFIX}-${sectionPrefix}-connector-status-container`}>
                            <div className={`${BRAND_PREFIX}-${sectionPrefix}-connector-status`}>
                                <Label
                                    className={`${BRAND_PREFIX}-${sectionPrefix}-connector-status-label block mb-2 text-heading font-semibold`}
                                    htmlFor={`${BRAND_PREFIX}-${sectionPrefix}-connector-status`}
                                    labelText='Konnektor Durumu'
                                />
                                <div className={`${BRAND_PREFIX}-${sectionPrefix}-connector-status-input-container flex justify-between items-center`}>
                                    <Dropdown
                                        className={`${BRAND_PREFIX}-${sectionPrefix}-connector-status border text-text text-sm rounded-lg block w-full p-2.5 focus:ring-primary focus:border-primary`}
                                        id={`${BRAND_PREFIX}-${sectionPrefix}-connector-status`}
                                        name={`${BRAND_PREFIX}-${sectionPrefix}-connector-status`}
                                        items={[
                                            {
                                                id: null,
                                                name: 'Inoperative',
                                                rid: 'Inoperative',
                                            }, {
                                                id: null,
                                                name: 'Operative',
                                                rid: 'Operative',
                                            }]
                                        }
                                        onChange={(e) => {
                                            setFormData({ ...formData, statusId: e.target.value });
                                        }}
                                    />
                                    <Button
                                        className={`${BRAND_PREFIX}-${sectionPrefix}-connector-status-button bg-primary text-white text-xl font-semibold rounded-lg p-2.5 mx-4`}
                                        id={`${BRAND_PREFIX}-${sectionPrefix}-connector-status-button`}
                                        type='button'
                                        onClick={() => {
                                            const response = axios.post(
                                                'http://192.168.3.75:91/DeviceOperation/ChangeAvailability',
                                                { "chargePointId": unitCode, "companyId": 2, availability: formData.statusId },
                                                { headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" } }
                                            );

                                            console.log('response', response);
                                        }}
                                    >
                                        <FaExchangeAlt />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={`${BRAND_PREFIX}-${sectionPrefix}-connector-charge-notification-container flex justify-between items-end flex-col`}>
                            <Label
                                className={`${BRAND_PREFIX}-${sectionPrefix}-connector-charge-notification-label block mb-2 text-heading font-semibold`}
                                htmlFor={`${BRAND_PREFIX}-${sectionPrefix}-connector-charge-notification`}
                                labelText='Bildirim Gonder'
                            />
                            <div className={`${BRAND_PREFIX}-${sectionPrefix}-connector-charge-notification-input-container flex justify-between items-center`}>
                                <Dropdown
                                    className={`${BRAND_PREFIX}-${sectionPrefix}-connector-charge-notification border text-text text-sm rounded-lg block w-full p-2.5 focus:ring-primary focus:border-primary`}
                                    id={`${BRAND_PREFIX}-${sectionPrefix}-connector-charge-notification`}
                                    name={`${BRAND_PREFIX}-${sectionPrefix}-connector-charge-notification`}
                                    items={[
                                        {
                                            id: null,
                                            name: 'Status Notification',
                                            rid: 'Status Notification',
                                        }, {
                                            id: null,
                                            name: 'Boot Notification',
                                            rid: 'Boot Notification'
                                        }, {
                                            id: null,
                                            name: 'Diagnostics Status Notification',
                                            rid: 'Diagnostics Status Notification'
                                        }, {
                                            id: null,
                                            name: 'Firmware Status Notification',
                                            rid: 'Firmware Status Notification'
                                        }, {
                                            id: null,
                                            name: 'Heartbeat',
                                            rid: 'Heartbeat'
                                        }, {
                                            id: null,
                                            name: 'Meter Values',
                                            rid: 'Meter Values'
                                        }
                                    ]}
                                    onChange={(e) => {
                                        setFormData({ ...formData, notificationId: e.target.value });
                                    }}
                                />
                                <Button
                                    className={`${BRAND_PREFIX}-${sectionPrefix}-connector-charge-notification-button bg-primary text-white text-xl font-semibold rounded-lg p-2.5 mx-4`}
                                    id={`${BRAND_PREFIX}-${sectionPrefix}-connector-charge-notification-button`}
                                    type='button'
                                    onClick={() => {
                                        const response = axios.post(
                                            'http://192.168.3.75:91/DeviceOperation/TriggerMessage',
                                            { "chargePointId": unitCode, "companyId": 2, "trigger": formData.notificationId },
                                            { headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" } }
                                        );
                                        console.log('response', response)
                                    }}
                                >
                                    <IoMdNotificationsOutline />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className={`${sectionPrefix}-header-line w-full my-4`} />
                <div className={`${BRAND_PREFIX}-${sectionPrefix}-station-user-actions-container flex justify-between items-start flex-col w-full`}>
                    <Label
                        className={`${BRAND_PREFIX}-${sectionPrefix}-station-user-label block mb-2 text-heading font-semibold`}
                        htmlFor={`${BRAND_PREFIX}-${sectionPrefix}-station-user`}
                        labelText='Kullanıcı Telefon Numarasi'
                    />
                    <div className={`${BRAND_PREFIX}-${sectionPrefix}-station-user-phone-number-input-container flex justify-between items-center w-full`}>
                        <Input
                            className={`${BRAND_PREFIX}-${sectionPrefix}-station-user-phone-number border text-text text-sm rounded-lg block w-full p-2.5 focus:ring-primary focus:border-primary`}
                            id={`${BRAND_PREFIX}-${sectionPrefix}-station-user-phone-number`}
                            name={`${BRAND_PREFIX}-${sectionPrefix}-station-user-phone-number`}
                            type='number'
                            value={formData.phoneNumber}
                            onChange={(e) => {
                                setFormData({ ...formData, phoneNumber: e.target.value });
                            }}
                        />
                        <Button
                            className={`${BRAND_PREFIX}-${sectionPrefix}-station-user-phone-number-button bg-primary text-white text-xl font-semibold rounded-lg p-2.5 mx-4`}
                            id={`${BRAND_PREFIX}-${sectionPrefix}-station-user-phone-number-button`}
                            type='button'
                            onClick={() => {
                                console.log('formData.phoneNumber', formData.phoneNumber)
                             }}
                        >
                            <FaTelegramPlane />
                        </Button>
                    </div>
                    <div className={`${BRAND_PREFIX}-${sectionPrefix}-station-user-actions-container flex justify-start items-center w-full my-4`}>
                        <Button
                            className={`${BRAND_PREFIX}-${sectionPrefix}-station-user-play-button bg-primary text-white text-xl font-semibold rounded-lg p-2.5`}
                            id={`${BRAND_PREFIX}-${sectionPrefix}-station-user-play-button`}
                            type='button'
                            onClick={() => { }}
                        >
                            <FaPlay />
                        </Button>
                        <Button
                            className={`${BRAND_PREFIX}-${sectionPrefix}-station-user-stop-button bg-primary text-white text-xl font-semibold rounded-lg p-2.5 mx-4`}
                            id={`${BRAND_PREFIX}-${sectionPrefix}-station-user-stop-button`}
                            type='button'
                            onClick={() => { }}
                        >
                            <FaStop />
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default StationManagementModal;
