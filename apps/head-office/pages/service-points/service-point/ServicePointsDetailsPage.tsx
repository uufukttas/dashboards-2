import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from '../../../src/components/Accordion/Accordion';
import Card from '../../../src/components/Card/Card';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../../src/constants/constants';
import { Button } from '@projects/button';
import Modal from '../../../src/components/Modal/Modal';
import { Dropdown } from '@projects/dropdown';
import { Radio } from '@projects/radio';
import { Input } from '@projects/input';
import { Label } from '@projects/label';

interface IServicePointsDetailsPageProps {
    slug: string;
}

interface IServicePointsDetailsProps {
    name: string;
    id: string;
    resellerId: string;
    companyId: string;
    resellerName: string;
    companyName: string;
    isActive: boolean;
    isDeleted: boolean;
};

interface IServicePointsDetailsInfoProps {
    id: number;
    stationId: number;
    address: string;
    phone1: string;
    phone2: string;
    lat: number;
    lon: number;
    cityId: number;
    districtId: number;
};

interface IChargeUnitsProps {
    chargePointId: number;
    connectorNumber: number;
    count: number;
    deviceCode: string;
    externalAddress: string;
    internalAddress: string;
    investor: string;
    isFreePoint: boolean;
    lastHeartBeat: string;
    limitedUsage: boolean;
    model: string;
    ocppVersion: number;
    sendRoaming: boolean;
    stationId: number;
    status: string;
};

const initialServicePointsDetailsStateValue = {
    name: '',
    id: '',
    resellerId: '',
    companyId: '',
    resellerName: '',
    companyName: '',
    isActive: true,
    isDeleted: false,
};

const initialServicePointsDetailsInfoStateValue = {
    id: 0,
    stationId: 0,
    address: '',
    phone1: '',
    phone2: '',
    lat: 0,
    lon: 0,
    cityId: 0,
    districtId: 0
};

const initialChargeUnitsStateValue = {
    chargePointId: 2026,
    connectorNumber: 1,
    count: 1,
    deviceCode: "9081000201",
    externalAddress: '',
    internalAddress: '',
    investor: "Operatör",
    isFreePoint: false,
    lastHeartBeat: '',
    limitedUsage: false,
    model: "Gersan",
    ocppVersion: 1500,
    sendRoaming: true,
    stationId: 2022,
    status: "Kullanılabilir",
};

const ServicePointsDetailsPage = ({ slug }: IServicePointsDetailsPageProps) => {
    const [servicePointDetails, setServicePointDetails] = useState<IServicePointsDetailsProps>(initialServicePointsDetailsStateValue);
    const [servicePointDetailsInfo, setServicePointDetailsInfo] = useState<IServicePointsDetailsInfoProps>(initialServicePointsDetailsInfoStateValue);
    const [chargeUnits, setChargeUnits] = useState<IChargeUnitsProps[]>([initialChargeUnitsStateValue]);

    const getChargeUnits = () => {
        axios.post(
            'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationSettings',
            JSON.stringify({ stationId: Number(slug), PageNumber: 1, PageSize: 5 }),
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(response => response.data.data)
            .then(data => setChargeUnits(data))
            .catch(error => console.log(error));
    };

    const getServicePointsDetails = async (slug: string) => {
        axios.post(
            'https://sharztestapi.azurewebsites.net/ServicePoint/GetStationById',
            { id: slug },
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(response => response.data)
            .then(data => setServicePointDetails(data.data[0]))
            .catch(error => console.log(error));
    };

    const getServicePointsDetailsInfo = async (slug: string) => {
        axios.post(
            'https://sharztestapi.azurewebsites.net/StationInfo/GetByStationId',
            JSON.stringify({ stationId: Number(slug) }),
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(response => response.data)
            .then(data => setServicePointDetailsInfo(data.data[0]))
            .catch(error => console.log(error));
    };

    const getSelectedCity = (cityId: number) => {
        return CITIES[cityId?.toString()];
    };

    const getSelectedDistrict = (districtId: number) => {
        return DISTRICTS[districtId?.toString()];
    };

    const chargeUnitsContent = (
        <div className="charge-units-content py-8">
            <div className="charge-units-header flex justify-end">
                <Button buttonText={`Ekle`} className="charge-units-add-button bg-primary bg-primary text-white rounded-md px-4 py-2 mx-2" type="button">
                </Button>
            </div>
            <div className="charge-units-list">
                {
                    chargeUnits.map((chargeUnit, index) => (
                        <div key={index} className="charge-unit flex justify-between items-center border-b-2 border-gray-200 py-4">
                            <div className="charge-unit-info">
                                <h3 className="charge-unit-name text-lg font-bold">{chargeUnit.deviceCode}</h3>
                                <p className="charge-unit-status text-sm">{chargeUnit.status}</p>
                            </div>
                            <div className="charge-unit-actions mx-2">
                                <Button buttonText={`Düzenle`} className="charge-unit-edit-button bg-primary text-white rounded-md px-4 py-2 mx-2" type={'button'} />
                                <Button buttonText={'Sil'} className="charge-unit-delete-button bg-secondary text-white rounded-md px-4 py-2" type={'button'} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );

    const servicePointDetailsContent = (
        <div className="service-point-details-content py-8">
            <div className="service-point-details-info">
                <div className="service-point-details-info-item flex justify-start items-center">
                    <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Adres:</p>
                    <p className="service-point-details-info-item-value text-lg font-normal">{decodeURI(servicePointDetailsInfo.address)}</p>
                </div>
                <div className="service-point-details-info-item flex justify-start items-center">
                    <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Telefon:</p>
                    <p className="service-point-details-info-item-value text-lg font-normal">{servicePointDetailsInfo.phone1}</p>
                </div>
                {
                    servicePointDetailsInfo.phone2 && (
                        <div className="service-point-details-info-item flex justify-start items-center">
                            <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Telefon 2:</p>
                            <p className="service-point-details-info-item-value text-lg">{servicePointDetailsInfo.phone2}</p>
                        </div>
                    )
                }
                <div className="service-point-details-info-item flex justify-start items-center">
                    <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Il:</p>
                    <p className="service-point-details-info-item-value text-lg font-normal">{getSelectedCity(servicePointDetailsInfo.cityId)}</p>
                </div>
                <div className="service-point-details-info-item flex justify-start items-center">
                    <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Ilce:</p>
                    <p className="service-point-details-info-item-value text-lg font-normal">{getSelectedDistrict(servicePointDetailsInfo.districtId)}</p>
                </div>
                <div className="service-point-details-info-item flex justify-start items-center">
                    <p className="service-point-details-info-item-label text-lg font-bold w-1/12">Konum:</p>
                    <p className="service-point-details-info-item-value text-lg font-normal">{servicePointDetailsInfo.lat} - {servicePointDetailsInfo.lon} </p>
                </div>
            </div>
        </div>
    );

    const servicePointHeader = (
        <>
            <div className="sh-service-point-details-page-header w-full flex items-center justify-between">
                <div className="sh-service-point-details-page-header-left flex">
                    <h1 className="sh-service-point-details-page-header-title text-2xl font-bold">{decodeURI(servicePointDetails.name)}</h1>
                </div>
                <div className="sh-service-point-details-page-header-right flex">
                    {
                        servicePointDetails.isActive
                            ? <div className='bg-green-500 rounded-full h-4 w-4 mx-2'></div>
                            : <div className='bg-secondary rounded-full h-4 w-4 mx-2'></div>
                    }
                </div>
            </div>
        </>
    );

    const workingHoursContent = (
        <div className="working-hours-content py-8">
            Bu servis istasyonunun calisma saatleri 08:00 - 18:00 arasindadir.
        </div>
    );

    useEffect(() => {
        getChargeUnits();
        getServicePointsDetails(slug);
        getServicePointsDetailsInfo(slug);
    }, [slug])

    return (
        servicePointDetailsInfo?.cityId !== 0 && servicePointDetailsInfo?.districtId !== 0 &&
        <>
            <div className='w-full'>
                <Card cardBodyChildren={servicePointHeader} className='my-5' />
            </div>
            <Accordion
                accordionTitle='Servis Istasyonu Bilgileri'
                accordionContent={servicePointDetailsContent}
                className="font-bold"
            />
            <Accordion
                accordionTitle={'Sarj Üniteleri'}
                accordionContent={chargeUnitsContent}
                className={`font-bold`}
            />
            <Accordion
                accordionTitle={'Calisma Saatleri'}
                accordionContent={workingHoursContent}
                className={`font-bold`}
            />
            {
                true &&
                <Modal
                    className="charge-units-modal"
                    modalHeaderTitle={`Şarj Ünitesi Ekle`}
                    modalId={`${BRAND_PREFIX}-service-point-modal`}
                >
                    <div className='charge-units-modal-form-container relative p-6 bg-white rounded-lg '>
                        <form
                            className={`${BRAND_PREFIX}-modal-form`}
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <div className={`charge-units-container`}>
                                <Label
                                    className="charge-units-brand-label block mb-2 text-heading font-semibold"
                                    htmlFor={'charge-units-label'}
                                    labelText={'Şarj Ünitesi Markasi'}
                                />
                                <Dropdown
                                    className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
                                    id={'charge-units-brand'}
                                    items={[]}
                                    name="charge-units-brand"
                                />
                            </div>
                            <div className='charge-units-ocpp-version-container'>
                                <Label
                                    className="charge-units-ocpp-version-label block mb-2 text-heading font-semibold"
                                    htmlFor={'charge-units-ocpp-version'}
                                    labelText={'OCPP Versiyon'}
                                />
                                <Dropdown
                                    className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
                                    id={'charge-units-ocpp-version'}
                                    items={[]}
                                    name="charge-units-ocpp-version"
                                />
                            </div>
                            <div className={`charge-units-free-usage-container`}>
                                <h3 className="charge-units-free-usage-label block mb-2 text-heading font-semibold" id={'charge-units-free-usage'}>
                                    Ücretsiz Kullanım
                                </h3>
                                <div className='charge-units-free-usage-inputs-container flex'>
                                    <div className='charge-units-free-usage-option-container flex w-1/2 items-center mb-4'>
                                        <Label
                                            className="charge-units-is-free-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                                            htmlFor={'charge-units-is-free'}
                                            labelText={'Var'}
                                        />
                                        <Radio
                                            className="charge-units-is-free text-blue-500 text-sm block"
                                            id={'charge-units-is-free'}
                                            name={'charge-units-is-free'}
                                        />
                                    </div>
                                    <div className='charge-units-free-usage-option-container flex w-1/2 items-center mb-4'>
                                        <Label
                                            className="charge-units-is-free-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                                            htmlFor={'charge-units-is-free'}
                                            labelText={'Yok'}
                                        />
                                        <Radio
                                            className="charge-units-is-free text-blue-500 text-sm block"
                                            id={'charge-units-is-free'}
                                            name={'charge-units-is-free'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='charge-units-limited-usage-container'>
                                <h3 className="charge-units-limited-usage-label block mb-2 text-heading font-semibold" id={'charge-units-limited-usage'}>
                                    Sınırlı Kullanım
                                </h3>
                                <div className='charge-units-limited-usage-inputs-container flex'>
                                    <div className='charge-units-limited-usage-option-container flex w-1/2 items-center mb-4'>
                                        <Label
                                            className="charge-units-is-limited-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                                            htmlFor={'charge-units-is-limited'}
                                            labelText={'Var'}
                                        />
                                        <Radio
                                            className="charge-units-is-limited text-blue-500 text-sm block"
                                            id={'charge-units-is-limited'}
                                            name={'charge-units-is-limited'}
                                        />
                                    </div>
                                    <div className='charge-units-limited-usage-option-container flex w-1/2 items-center mb-4'>
                                        <Label
                                            className="charge-units-is-limited-label block mb-2 text-heading font-semibold block mb-0 pr-4"
                                            htmlFor={'charge-units-is-limited'}
                                            labelText={'Yok'}
                                        />
                                        <Radio
                                            className="charge-units-is-limited text-blue-500 text-sm block"
                                            id={'charge-units-is-limited'}
                                            name={'charge-units-is-limited'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='charge-units-investor-container'>
                                <Label
                                    className="charge-units-investor-label block mb-2 text-heading font-semibold"
                                    htmlFor={'charge-units-investor'}
                                    labelText={'Yatırımcı'}
                                />
                                <Dropdown
                                    className="border text-text text-sm rounded-lg block w-full p-2.5 mb-4"
                                    id={'charge-units-investor '}
                                    items={[]}
                                    name="charge-units-investor"
                                />
                            </div>
                            <div className='charge-units-status-container'>
                                <Label
                                    className="charge-units-status-label block mb-2 text-heading font-semibold"
                                    htmlFor={'charge-units-status'}
                                    labelText={'Durum'}
                                />
                                <Dropdown
                                    className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4'
                                    id={'charge-units-status'}
                                    items={[]}
                                    name="charge-units-status"
                                />
                            </div>
                            <div className='charge-units-access-type-container'>
                                <Label
                                    className="charge-units-access-type-label block mb-2 text-heading font-semibold"
                                    htmlFor={'charge-units-access-type'}
                                    labelText={'Erisim Tipi'}
                                />
                                <Dropdown
                                    className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4'
                                    id={'charge-units-access-type'}
                                    items={[]}
                                    name="charge-units-access-type"
                                />
                            </div>
                            <div className='charge-units-location-container'>
                                <Label
                                    className="charge-units-location-label block mb-2 text-heading font-semibold"
                                    htmlFor={'charge-units-location'}
                                    labelText={'Konum'}
                                />
                                <Input
                                    className='border text-text text-sm rounded-lg block w-full p-2.5 mb-4'
                                    id={'charge-units-location'}
                                    name={'charge-units-location'}
                                    type="text"
                                />
                            </div>
                            <div className='charge-units-button-container flex justify-end'>
                                <Button
                                    buttonText={'Kaydet'}
                                    className='bg-primary text-white rounded-md px-4 py-2'
                                    type={'submit'}
                                />
                            </div>
                        </form>
                    </div>
                </Modal>
            }
        </>
    )
}

export default ServicePointsDetailsPage;
