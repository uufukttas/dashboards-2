import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from '../../../src/components/Accordion/Accordion';
import Card from '../../../src/components/Card/Card';
import { CITIES, DISTRICTS } from '../../../src/constants/constants';
import { Button } from '@projects/button';

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
            { id: slug[0] },
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(response => response.data)
            .then(data => setServicePointDetails(data.data[0]))
            .catch(error => console.log(error));
    };

    const getServicePointsDetailsInfo = async (slug: string) => {
        axios.post(
            'https://sharztestapi.azurewebsites.net/StationInfo/GetByStationId',
            JSON.stringify({ stationId: Number(slug[0]) }),
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
                {/* <h3 className="charge-units-title text-xl font-bold">Sarj Üniteleri</h3> */}
                <Button className="charge-units-add-button bg-primary text-white rounded px-4 py-2 text-2xl tex-center item-center" type="button">
                    <span>+</span>
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
                                <button className="charge-unit-edit-button bg-primary text-white rounded-md px-4 py-2 mx-2">Düzenle</button>
                                <button className="charge-unit-delete-button bg-secondary text-white rounded-md px-4 py-2 mx-2">Sil</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );

    const workingHoursContent = (
        <div className="working-hours-content py-8">
            Bu servis istasyonunun calisma saatleri 08:00 - 18:00 arasindadir.
        </div>
    );

    const cardBody = (
        <>
            <div className='w-full flex itemse-center justify-between'>
                <div className='left-side flex items-end justify-between flex-col'>
                    <div className='flex justify-center items-baseline'>
                        <p className='px-2'>Servis Noktasinin Ismi: </p>
                        <h1 className='text-2xl'>{servicePointDetails.name}</h1>
                    </div>
                    <div className='flex justify-center items-baseline'>
                        <p className='px-2'>Servis Noktasinin Sirketi: </p>
                        <h1 className='text-2xl'>{servicePointDetails.companyName}</h1>
                    </div>
                    <div className='flex justify-center items-baseline'>
                        <p className='px-2'>Servis Noktasinin Bayisi: </p>
                        <h1 className='text-2xl'>{servicePointDetails.resellerName}</h1>
                    </div>
                </div>
                <div className='right-side flex items-end justify-between flex-col'>
                    <div className='flex items-center '>
                        <h3 className='px-2'>Durum</h3>
                        {
                            servicePointDetails.isActive
                                ? <div className='bg-green-500 rounded-full h-4 w-4 mx-2'></div>
                                : <div className='bg-secondary rounded-full h-4 w-4 mx-2'></div>
                        }
                    </div>
                    <div className='flex justify-end items-baseline'>
                        <p className='px-2'>Sehir </p>
                        <h1 className='text-2xl'>{getSelectedCity(servicePointDetailsInfo?.cityId)}</h1>
                    </div>
                    <div className='flex justify-end items-baseline'>
                        <p className='px-2'>Ilce </p>
                        <h1 className='text-2xl'>{getSelectedDistrict(servicePointDetailsInfo?.districtId)}</h1>
                    </div>
                    <div className='flex justify-end items-baseline'>
                        <p className='px-2'>Adres </p>
                        <h1 className='text-2xl flex-wrap'>{servicePointDetailsInfo?.address}</h1>
                    </div>
                </div>
            </div>
        </>
    );

    useEffect(() => {
        getChargeUnits();
        getServicePointsDetails(slug[0]);
        getServicePointsDetailsInfo(slug[0]);
    }, [slug])

    return (
        servicePointDetailsInfo?.cityId !== 0 && servicePointDetailsInfo?.districtId !== 0 &&
        <>
            <div className='w-full'>
                <Card cardBodyChildren={cardBody} className='my-5' />
            </div>
            <Accordion
                accordionTitle={'Sarj Üniteleri'}
                accordionContent={chargeUnitsContent}
                className={`mx-8 my-8 rounded-lg`}
            />
            <Accordion
                accordionTitle={'Calisma Saatleri'}
                accordionContent={workingHoursContent}
                className={`mx-8 my-8 rounded-lg`}
            />
        </>

    )
}

export default ServicePointsDetailsPage;
